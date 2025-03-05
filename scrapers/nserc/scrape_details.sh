#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p data/details

# Function to download a single details page
download_details() {
  local id=$1
  local output_file="data/details/${id}.html"
  
  # Skip if file already exists
  if [ -f "$output_file" ]; then
    echo "File $output_file already exists. Skipping..."
    return 0
  fi
  sleep 0.25

  echo "Downloading details for ID: $id"
  curl "https://www.nserc-crsng.gc.ca/ase-oro/Details-Detailles_eng.asp?id=${id}" \
    --compressed \
    -s \
    --connect-timeout 3 \
    --max-time 3
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
    -H 'Accept-Language: en-CA,en-US;q=0.7,en;q=0.3' \
    -H 'Accept-Encoding: gzip, deflate, br, zstd' \
    -H 'Connection: keep-alive' \
    -o "$output_file"
}

export -f download_details

# Process all JSON files and extract IDs
find data/listing -name "nserc_results_*.json" | while read json_file; do
  echo "Processing $json_file"
  
  # Extract the IDs from the JSON file (last element of each array in "aaData")
# Extract all detail URLs from the JSON file
detail_urls=($(jq -r '.aaData[][5]' "$json_file"))

# Process each URL with retry logic
  for detail_url in "${detail_urls[@]}"; do
    MAX_RETRIES=3
    retry_count=0
    success=false

    while [ $retry_count -lt $MAX_RETRIES ] && [ "$success" = false ]; do
      # Try downloading
      if download_details "$detail_url"; then
        success=true
      else
        retry_count=$((retry_count + 1))
        echo "Failed to download: $detail_url (attempt $retry_count of $MAX_RETRIES)"

        if [ $retry_count -lt $MAX_RETRIES ]; then
          echo "Waiting 5 minutes before retrying..."
          sleep 300  # Wait for 5 minutes (300 seconds)
        else
          echo "Maximum retries reached for: $detail_url"
          exit 1
        fi
      fi
    done
  done
done

echo "All details pages have been downloaded."

