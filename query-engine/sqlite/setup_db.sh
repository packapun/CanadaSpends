#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Print working directory to debug
echo "Current working directory: $(pwd)"
echo "Listing contents of current directory:"
ls -la

# Create the data directory
mkdir -p /app/data/sqlite

# Generate the database
echo "Creating SQLite database..."
if python clean_csv.py; then
  echo "Database created successfully!"
else
  echo "Error creating database!"
  # Continue despite errors so container stays running
  set +e
fi

# Check if database file exists and check its contents
echo "Checking if database was created:"
ls -la db/transfer_payments.sqlite || echo "No sqlite file found!"
echo "Current working directory: $(pwd)"

if [ -f db/transfer_payments.sqlite ]; then
  echo "Database file exists. Checking tables:"
  echo ".tables" | sqlite3 db/transfer_payments.sqlite
  echo "Checking row counts:"
  echo "SELECT 'payers:', COUNT(*) FROM payers;" | sqlite3 db/transfer_payments.sqlite
  echo "SELECT 'recipients:', COUNT(*) FROM recipients;" | sqlite3 db/transfer_payments.sqlite
  echo "SELECT 'programs:', COUNT(*) FROM programs;" | sqlite3 db/transfer_payments.sqlite
  echo "SELECT 'payments:', COUNT(*) FROM payments;" | sqlite3 db/transfer_payments.sqlite
  
else
  echo "WARNING: transfer_payments.sqlite not found!"
fi

echo "Container will remain running to keep the volume mounted..."

# Keep the container running regardless of whether previous steps succeeded
tail -f /dev/null 