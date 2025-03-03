# Processing Transfer Payments with Datasette

## Getting Started
All the following should be run in the experiments directory


To generate the sqlite db:
`python clean_csv.py`
```
datasette serve transfer_payments.sqlite
```


## Publishing

```
datasette publish fly mydatabase.db --app="my-app" --install=datasette-vega

```