#!/usr/bin/env python3
"""
Test script for the SQL query endpoint
"""

import requests
import json
import argparse
import sys

def test_sql_endpoint(question, base_url="http://localhost:8000"):
    """Test the SQL query endpoint with a question"""
    endpoint = f"{base_url}/sql/query"
    
    # Prepare the request payload
    payload = {
        "question": question,
        "source": "test_script"
    }
    
    print(f"Sending question to {endpoint}: {question}")
    
    # Make the request
    try:
        response = requests.post(endpoint, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            
            # Print the results in a formatted way
            print("\n===== RESPONSE =====")
            print(f"Status: {result.get('status')}")
            print(f"\nSQL Query Generated:")
            print(f"-------------------")
            print(result.get('sql_query'))
            
            print(f"\nSummary:")
            print(f"--------")
            print(result.get('summary'))
            
            print(f"\nFull Answer:")
            print(f"-----------")
            print(result.get('answer'))
            
            print(f"\nRelated Questions:")
            print(f"-----------------")
            for i, question in enumerate(result.get('related_questions', []), 1):
                print(f"{i}. {question}")
                
            return True
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Test the SQL query endpoint")
    parser.add_argument("question", nargs="?", help="Question to send to the endpoint")
    parser.add_argument("--url", default="http://localhost:8000", help="Base URL for the API")
    
    args = parser.parse_args()
    
    # If no question provided, ask for one
    if not args.question:
        args.question = input("Enter your question about Canadian government spending: ")
    
    # Run the test
    success = test_sql_endpoint(args.question, args.url)
    
    # Exit with appropriate code
    sys.exit(0 if success else 1) 