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
  
  echo "Downloading details for ID: $id"
  curl "https://www.nserc-crsng.gc.ca/ase-oro/Details-Detailles_eng.asp?id=${id}" \
    --compressed \
    -s \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
    -H 'Accept-Language: en-CA,en-US;q=0.7,en;q=0.3' \
    -H 'Accept-Encoding: gzip, deflate, br, zstd' \
    -H 'Connection: keep-alive' \
    -o "$output_file"

    sleep 0.5
}

export -f download_details

# Process all JSON files and extract IDs
find data/listing -name "nserc_results_*.json" | while read json_file; do
  echo "Processing $json_file"
  
  # Extract the IDs from the JSON file (last element of each array in "aaData")
  jq -r '.aaData[][5]' "$json_file" | xargs -P 1 -I{} bash -c 'download_details "$@"' _ {}
done

echo "All details pages have been downloaded."

