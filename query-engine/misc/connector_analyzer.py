import pandas as pd
import re
import csv

# Load the CSV file
def analyze_connectors(input_file, output_file):
    # Read the CSV file
    df = pd.read_csv(input_file)
    
    # Get unique values from RCPNT_CLS_EN_DESC
    unique_descriptions = df['RCPNT_CLS_EN_DESC'].dropna().unique()
    
    # Define connecting tokens
    connectors = [",", " and ", " or ", "/"]
    
    # Function to count connecting tokens in a string
    def count_connectors(text):
        total = 0
        for connector in connectors:
            total += text.count(connector)
        return total
    
    # Create a list to store results
    results = []
    
    # Process each unique description
    for desc in unique_descriptions:
        count = count_connectors(desc)
        if count > 2:  # Only keep descriptions with more than 2 connecting tokens
            results.append({
                'description': desc,
                'connector_count': count
            })
    
    # Sort results by connector count (descending)
    results_sorted = sorted(results, key=lambda x: x['connector_count'], reverse=True)
    
    # Write to CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['description', 'connector_count']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for row in results_sorted:
            writer.writerow(row)
    
    print(f"Analysis complete. Found {len(results)} descriptions with more than 2 connecting tokens.")
    print(f"Results saved to {output_file}")

if __name__ == "__main__":
    input_file = "query-engine/data/detailed-transfer-payments/pt-tp-2024.csv"
    output_file = "grant_descriptions_with_connectors.csv"
    analyze_connectors(input_file, output_file) 