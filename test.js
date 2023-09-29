const gSheetParser = require('./index')

async function main(){
    let gSheet = await gSheetParser('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6XcJtelDwNsMGtkixCLizhLtHk46kkIimLmVZQb358Ex2kZf2EfOC-Fjp3EJgAFI3Z4aGQ37OBLcq/pubhtml')
    
    console.log(JSON.stringify(gSheet,null,4))
}
main()