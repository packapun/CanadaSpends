import pandas as pd
import os
import sys
from pathlib import Path

def create_mapping(refined_classes_path):
    """Create a mapping from original to refined recipient class descriptions."""
    try:
        # Read the refined recipient classes CSV
        df_refined = pd.read_csv(refined_classes_path)
        
        # Create a mapping from original to refined descriptions
        mapping = dict(zip(
            df_refined['Recipient Class Description'],
            df_refined['New Recipient Class Description']
        ))
        
        print(f"Created mapping with {len(mapping)} entries")
        return mapping
    
    except Exception as e:
        print(f"Error creating mapping: {e}")
        sys.exit(1)

def update_transfer_payments(input_file, output_file, mapping):
    """Update recipient class descriptions in the transfer payments dataset."""
    try:
        # Check if input file exists
        if not os.path.exists(input_file):
            print(f"Input file not found: {input_file}")
            sys.exit(1)
        
        print(f"Reading transfer payments data from {input_file}...")
        
        # Read the transfer payments CSV
        # Try different encodings if needed
        try:
            df_payments = pd.read_csv(input_file, low_memory=False)
        except UnicodeDecodeError:
            df_payments = pd.read_csv(input_file, encoding='latin1', low_memory=False)
        
        # Check if the required column exists
        if 'RCPNT_CLS_EN_DESC' not in df_payments.columns:
            print("Column 'RCPNT_CLS_EN_DESC' not found in the input file")
            sys.exit(1)
        
        # Count original classes
        original_classes = df_payments['RCPNT_CLS_EN_DESC'].nunique()
        print(f"Found {original_classes} unique recipient classes in the dataset")
        
        # Create a copy to track unchanged descriptions
        unchanged = set(df_payments['RCPNT_CLS_EN_DESC'].unique())
        
        # Replace the recipient class descriptions
        replaced_count = 0
        for orig, refined in mapping.items():
            mask = df_payments['RCPNT_CLS_EN_DESC'] == orig
            count = mask.sum()
            print(f"Replacing {orig} with {refined} ({count} occurrences)")
            if count > 0:
                df_payments.loc[mask, 'RCPNT_CLS_EN_DESC'] = refined
                replaced_count += 1
                if orig in unchanged:
                    unchanged.remove(orig)
                print(f"Replaced: {orig[:50]}... ({count} occurrences)")
        
        # Report on classes that weren't in the mapping
        if unchanged:
            print(f"\n{len(unchanged)} classes were not in the mapping and remain unchanged")
            for cls in list(unchanged)[:5]:  # Show first 5 examples
                print(f"- {cls[:100]}...")
            if len(unchanged) > 5:
                print(f"- ...and {len(unchanged) - 5} more")
        
        # Write the updated data to the output file
        print(f"\nWriting updated data to {output_file}...")
        df_payments.to_csv(output_file, index=False)
        
        print(f"Done! Updated {replaced_count} unique recipient class descriptions")
        print(f"Updated file saved to: {output_file}")
    
    except Exception as e:
        print(f"Error updating transfer payments: {e}")
        sys.exit(1)

def main():
    # File paths
    script_dir = Path(__file__).parent
    refined_classes_path = script_dir / "refined_recipient_classes.csv"
    input_file = "../data/detailed-transfer-payments/pt-tp-2024.csv"
    output_file = "../data/detailed-transfer-payments/pt-tp-2024-refined.csv"
    
    print("Starting recipient class description replacement...")
    
    # Create mapping from original to refined descriptions
    mapping = create_mapping(refined_classes_path)
    
    # Update transfer payments dataset
    update_transfer_payments(input_file, output_file, mapping)

if __name__ == "__main__":
    main()