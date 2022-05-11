/*==========================================================================================================
    Example on how to automate the selection of the database using a global variable (not being used now).  
    In this case, the router just needs to import this file. global.DATABASE can be set in app.js.
==========================================================================================================*/

/*
let modelFile;

let pgFile = "./pg/productsModel";
let mssqlFile = "./mssql/productsModel";

switch (global.DATABASE) {
    case global.DB.PG:
        modelFile = pgFile;
        console.log("[productsModel] Using Postgres.");
        break;
    case global.DB.MSSQL:
        modelFile = mssqlFile;
        console.log("[productsModel] Using SQL Server.");
        break;
    default:
        console.log("[productsModel] global.DATABASE not defined! Defaulting to Postgres.");
        modelFile = pgFile;
}

let model = require(modelFile);
module.exports = model;
*/


/*==========================================================================================================
                            Functions to be used by all database versions.
==========================================================================================================*/

function failProductPrice(prod) {
    if (typeof prod.prod_price != "number" || prod.prod_price <= 0) {
        prod.errMsg = "Invalid price";
        return true;
    }
    return false;
}

function failProduct(prod) {
    if (typeof prod.prod_name != "string" || prod.prod_name.length < 3) {
        prod.errMsg = "Invalid name";
        return true;
    } else if (failProductPrice(prod)) {
        return true;
    } else if (!Number.isInteger(prod.prod_type_id) || prod.prod_type_id <= 0) {
        prod.errMsg = "Invalid type";
        return true;
    }
    return false;
}

module.exports = { failProduct };