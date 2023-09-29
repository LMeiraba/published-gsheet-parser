const cheerioTableparser = require('cheerio-tableparser')
const axios = require('axios')
const cheerio = require('cheerio');

async function parse(url) {
    url = url.split('?')[0].split('#')[0]
    let a = await axios.get(url).then(req => {
        const $ = cheerio.load(req.data)
        let tables_html = $('#sheets-viewport').children()
        cheerioTableparser($)
        let doc_name = $('.name', '#doc-title').text()
        let tables_json = {
            name: doc_name,
            count: tables_html.length,
            url: url,
            tables: []
        }
        for (let i = 0; i < tables_html.length; i++) {
            let id = tables_html[i].attribs.id
            let table_name = $(`#sheet-button-${id}`, '#sheet-menu').text()
            let table = ($('.waffle', `#${id}`).parsetable(true, true, true)).slice(1).map(t => {
                if(!t[0].length){
                    return t.slice(1)
                }else return t
            })
            
            let columnAsFields = {}
            for (let i = 0; i < table.length; i++) {
                let x = table[i]
                if (!x[0].length) x = x.slice(1)
                columnAsFields[x[0]] = x.slice(1)
            }
            let rowAsFields = {}
            for (let i = 1; i < table.length; i++) {//no of row
                for (let j = 0; j < table[i].length; j++) {//no of elemets
                    if(!rowAsFields[table[0][j]]){
                        rowAsFields[table[0][j]] = []
                    }
                    rowAsFields[table[0][j]].push(table[i][j])
                }
                
            }
            tables_json.tables.push({
                id: id,
                name: table_name,
                url: url + `?gid=${id}&single=true`,
                table: {
                    columnAsFields: columnAsFields,
                    rowAsFields: rowAsFields,
                    raw: table
                }
            })
        }
        return tables_json
    });
    return a
}
module.exports = parse