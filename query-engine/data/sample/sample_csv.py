import pandas as pd
import os

# Get the current working directory
cwd = os.getcwd()
print(f"Current working directory: {cwd}")

# Define file paths with absolute paths
input_file = os.path.join(cwd, 'query-engine/data/detailed-transfer-payments/pt-tp-2024.csv')
output_file = os.path.join(cwd, 'sample_100_rows.csv')

print(f"Input file: {input_file}")
print(f"Output file: {output_file}")

try:
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} does not exist")
        exit(1)
    
    # Read the CSV file using pandas
    print("Reading CSV file with pandas...")
    df = pd.read_csv(input_file)
    print(f"Original dataframe has {len(df)} rows and {len(df.columns)} columns")
    
    # Shuffle the dataframe (randomize the rows)
    print("Shuffling the dataframe...")
    shuffled_df = df.sample(frac=1, random_state=42)  # frac=1 means use all rows, random_state sets seed for reproducibility
    
    # Get the first 100 rows from the shuffled dataframe
    sample_df = shuffled_df.head(100)
    print(f"Selected {len(sample_df)} random rows")
    
    # Save to CSV
    print(f"Saving {len(sample_df)} rows to {output_file}...")
    sample_df.to_csv(output_file, index=False)
    
    print(f"Successfully created sample file at {output_file}")
    print(f"Output file size: {os.path.getsize(output_file)} bytes")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()