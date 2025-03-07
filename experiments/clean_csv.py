import csv
from glob import glob
import sqlite3
import os
import re

recipients = {}  # Store recipient information: key is external_id, value is db id
programs = {}  # Store program information: key is name, value is db id
payments = {}  # Store payment tracking: key is (program_id, recipient_id, amount, desc), value is db id

try:
    os.remove("transfer_payments.sqlite")
except OSError:
    pass

# Connect to the database
db = sqlite3.connect("transfer_payments.sqlite")
db.execute("PRAGMA foreign_keys = ON")

c = db.cursor()

# Check if tables exist
c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='government_entities'")

def load_schema():
    tables_exist = c.fetchone() is not None

    # If tables don't exist, load schema
    if not tables_exist:
        with open("schema.sql") as f:
            c.executescript(f.read())

load_schema()

def extract_fiscal_year(filename):
    """Extract the fiscal year from the filename."""
    match = re.search(r'pt-tp-(\d{4})', os.path.basename(filename))
    year = match.group(1)
    return year

def get_or_create_payer(row):
    """Get or create payer record and return id."""
    external_id = row.get('DepartmentNumber-Numéro-de-Ministère')

    # Skip if empty
    if not external_id:
        normalized_id = None
    else:
        # Normalize as can-minc-{id}
        normalized_id = f"can-minc-{external_id}"

    c.execute('SELECT id, external_id, name FROM government_entities WHERE name = ?', (
        row.get('DEPT_EN_DESC', ''),
    ))

    record = c.fetchone()

    if record:
        if not record[1] and normalized_id:
            c.execute(
                'UPDATE government_entities SET external_id = ? WHERE id = ?', (normalized_id, record[0],)
            )
        return record[0]
    else:
        c.execute('''
            INSERT INTO government_entities 
            (external_id, name) 
            VALUES (?, ?)
        ''', (
            normalized_id,
            row.get('DEPT_EN_DESC', '')
        ))
    
    government_entity_id = c.lastrowid
    return government_entity_id

def get_or_create_recipient(row):
    """Get or create recipient record and return id."""
    recipient_name = row.get('RCPNT_NML_EN_DESC', '')
    recipient_class = row.get('RCPNT_CLS_EN_DESC', '')
    city = row.get('CTY_EN_NM', '')
    province = row.get('PROVTER_EN', '')
    country = row.get('CNTRY_EN_NM', '')
    
    # Skip if empty
    if not recipient_name:
        raise "Missing recipient name"
    
    # Create a unique external_id from the recipient name
    # Use a simplified version for the key to handle slight variations
    normalized_name = recipient_name.lower().strip()
    key = f"{normalized_name}_{province}_{country}"
    
    if key in recipients:
        return recipients[key]
    
    # Insert recipient if not exists
    c.execute('''
        INSERT INTO recipients 
        (external_id, name, description, city, province, country) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        key,
        recipient_name, 
        f"Recipient class: {recipient_class}",
        city,
        province,
        country
    ))
    
    recipient_id = c.lastrowid
    recipients[key] = recipient_id
    return recipient_id

def get_program(program_name, entity_id):
    key = f"{entity_id}_{program_name}"
    if key in programs:
        return programs[key]

    raise RuntimeError(f"No such program: {program_name}")

def get_or_create_program(row, fiscal_year, government_entity_id):
    """Get or create program record and return id."""
    # Program is identified by a combination of ministry, program definition
    # A row with TOT_CY_XPND_AMT is a program definition
    
    if not row.get('TOT_CY_XPND_AMT') or not government_entity_id:
        raise "Could not create program for row {}".format(row)
    
    # Create a program name based on recipient class
    program_name = row.get('RCPNT_CLS_EN_DESC')
    
    # Skip if empty
    if not program_name:
        raise "No name - Could not create program for row {}".format(row)

    key = f"{government_entity_id}_{program_name}"
    
    if key in programs:
        # Add fiscal year to existing program if not already there
        program_id = programs[key]
        c.execute('''
            SELECT fiscal_years FROM programs WHERE id = ?
        ''', (program_id,))
        result = c.fetchone()
        if result and result[0]:
            years = eval(result[0])  # Parse the stored array
            if fiscal_year not in years:
                years.append(fiscal_year)
                c.execute('''
                    UPDATE programs SET fiscal_years = ? WHERE id = ?
                ''', (str(years), program_id))
        else:
            c.execute('''
                UPDATE programs SET fiscal_years = ? WHERE id = ?
            ''', (str([fiscal_year]), program_id))
        return program_id
    
    # Insert program if not exists
    c.execute('''
        INSERT INTO programs 
        (government_entity_id, name, fiscal_years) 
        VALUES (?, ?, ?)
    ''', (
        government_entity_id,
        program_name, 
        str([fiscal_year])
    ))
    
    program_id = c.lastrowid
    programs[key] = program_id
    return program_id

def create_payment(row, program_id, recipient_id):
    """Create payment record."""
    if not program_id:
        raise ValueError("program_id must be present")

    if not recipient_id:
        raise ValueError("recipient_id must be present")

    amount = row.get('AGRG_PYMT_AMT', '')
    
    # Skip if empty or not a number
    if not amount:
        raise "No payment amount found"
    
    try:
        amount = int(float(amount))
    except (ValueError, TypeError):
        return None
    
    # Skip zero amounts
    if amount == 0:
        return None
    
    description = f"Payment to {row.get('RCPNT_NML_EN_DESC', '')} for {row.get('RCPNT_CLS_EN_DESC', '')}"
    fiscal_year = row.get('FSCL_YR', '')

    # Create a payment record
    c.execute('''
        INSERT INTO payments 
        (program_id, recipient_id, amount, currency, description, fiscal_year) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        program_id,
        recipient_id, 
        amount,
        'CAD',
        description,
        fiscal_year
    ))
    
    return c.lastrowid

def process_programs(reader, filename):
    """First pass: Process rows to create programs only."""
    for row_number, row in enumerate(reader):
        fiscal_year = row.get('FSCL_YR', '') or extract_fiscal_year(filename)

        # Get or create the payer for this row
        government_entity_id = get_or_create_payer(row)

        # If TOT_CY_XPND_AMT exists and is non-zero, this row defines a program
        try:
            if row.get('TOT_CY_XPND_AMT') and float(row.get('TOT_CY_XPND_AMT')) != 0:
                # Get or create the program
                get_or_create_program(row, fiscal_year, government_entity_id)
        except (ValueError, TypeError):
            # Skip if TOT_CY_XPND_AMT is not a valid number, it's a payment
            continue

        # Commit every 1000 rows to avoid large transactions
        if row_number % 1000 == 0:
            db.commit()

def process_payments(reader, filename):
    """Second pass: Process rows to create payments, with all programs already available."""
    for row_number, row in enumerate(reader):
        fiscal_year = row.get('FSCL_YR', '') or extract_fiscal_year(filename)
        
        # Get the payer for this row
        government_entity_id = get_or_create_payer(row)
        
        # Get the program for this payment
        program_name = row.get('RCPNT_CLS_EN_DESC')

        # pt-tp-2023 has some bad data for a program
        if program_name.startswith("Contributionsto"):
            program_name = program_name.replace("Contributionsto", "Contributions to")

        # pt-tp-2022 has an extraneous row here, I think it's a duplicate with an error
        if not program_name or program_name.startswith("(L) Paiements pour soutenir les étudiants"):
            continue

        program_id = get_program(program_name, government_entity_id)

        # If this is a payment row (not a program definition)
        try:
            is_program_row = row.get('TOT_CY_XPND_AMT') and float(row.get('TOT_CY_XPND_AMT')) != 0
            if not is_program_row:
                recipient_id = get_or_create_recipient(row)
                create_payment(row, program_id, recipient_id)
        except (ValueError, TypeError):
            # If TOT_CY_XPND_AMT is not a valid number, treat as payment row
            recipient_id = get_or_create_recipient(row)
            create_payment(row, program_id, recipient_id)
            
        # Commit every 1000 rows to avoid large transactions
        if row_number % 1000 == 0:
            db.commit()

def process_rows(reader, filename):
    """Process rows in two passes - first for programs, then for payments."""
    # Store the CSV data to avoid reopening the file
    rows = list(reader)
    
    # First pass: Process programs
    process_programs(rows, filename)
    
    # Second pass: Process payments
    process_payments(rows, filename)

def process_file(filename):
    print(f"Processing file {filename}")
    with open(filename, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        process_rows(reader, filename)

    # Commit after each file
    db.commit()


def main():
    files = glob("../data/transfer-payments/*.csv")

    files = sorted(files, key=lambda f: extract_fiscal_year(f))
    print(files)
    for filename in files:
        if "-eng" in filename:
            continue
        process_file(filename)
    # Final commit and close the database
    db.commit()
    db.close()
    print("Processing completed. Data stored in transfer_payments.sqlite")

if __name__ == "__main__":
    main()
    # process_file("data/pt-tp-2024.csv")