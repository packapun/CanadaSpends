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
 - [ ] Proper Sourcing
 - 