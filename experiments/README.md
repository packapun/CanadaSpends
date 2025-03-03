# Processing Transfer Payments with Datasette

## Getting Started
All the following should be run in the experiments directory


Run `python clean_csv.py` to generate the sqlite db

Run `datasette serve transfer_payments.sqlite` to run datasette locally


This exposes 


## Publishing

```
datasette publish vercel transfer_payments.sqlite \
        --project=canada-spends \
        --vercel-json=vercel.json \
        --public \
        --install datasette-chatgpt-plugin 
```


# TODO

 - [ ] Proper Sourcing
 - [ ] Add GeoData for better geo-mapping
   - https://open.canada.ca/data/en/dataset/fe945388-1dd9-4a4a-9a1e-5c552579a28c
   - Also would be nice to add shapes for provinces for heatmaps
   - geocode-sqlite for any locations that don't have data
 - [ ] use llm for embedding generation