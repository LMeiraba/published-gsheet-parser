# About The Package

This npm helps you to parse a published google sheet into JSON.

https://docs.google.com/spreadsheets/d/e/2PACX-*ID_here/pubhtml type link. [Example](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6XcJtelDwNsMGtkixCLizhLtHk46kkIimLmVZQb358Ex2kZf2EfOC-Fjp3EJgAFI3Z4aGQ37OBLcq/pubhtml)

# Uses

Parsing the spreadsheet from the url.

```js
const gSheetParser = require('published-gsheet-parser')

let gSheet = await gSheetParser('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6XcJtelDwNsMGtkixCLizhLtHk46kkIimLmVZQb358Ex2kZf2EfOC-Fjp3EJgAFI3Z4aGQ37OBLcq/pubhtml')
    
console.log(JSON.stringify(gSheet,null,4))
```

# Response structure

```json
{
    "name": "",//string, name of the gsheet
    "count": 0,//int, number of tables in the gsheet
    "url": "",//string, link of the whole ghseet
    "tables": [//array of all the tables
        {
            "id": "",//ID (gid) of the table
            "name": "",//name of the table
            "url": "",//link just for this table
            "table": {//object containing the actual data of the table
                "columnAsFields": {},//uses the first column as fields and the remaining as values 
                "rowAsFields": {},//uses the first row as fields and the remaining as values
                "raw": [] //returns without formating
            }
        }
    ]
}
```