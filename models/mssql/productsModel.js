var { mssql, poolPromise } = require("./connection");
var productsModel = require("../productsModel");

module.exports.getProducts = async function() {
    try {
        let sql = "select * from products";
        const pool = await poolPromise;
        const result = await pool.request()
            .query(sql);
        let products = result.recordset;
        console.log("[productsModel.getProducts] products = " + JSON.stringify(products));
        return { status: 200, data: products };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getTypes = async function() {
    try {
        let sql = "select * from types";
        const pool = await poolPromise;
        const result = await pool.request()
            .query(sql);
        let types = result.recordset;
        console.log("[productsModel.getTypes] types = " + JSON.stringify(types));
        return { status: 200, data: types };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getProduct = async function(id) {
    console.log("[productsModel.getProduct] id = " + JSON.stringify(id));
    try {
        let sql =
            "SELECT * " +
            "FROM products p, types t " +
            "WHERE p.prod_type_id = t.type_id AND prod_id = @prod_id;";
        const pool = await poolPromise;
        const result = await pool.request()
            .input('prod_id', mssql.Int, id)
            .query(sql);
        console.log("[productsModel.getProduct] result.recordset = " + JSON.stringify(result.recordset));
        let products = result.recordset;
        if (products.length > 0) {
            console.log("[productsModel.getProduct] product = " + JSON.stringify(products[0]));
            return { status: 200, data: products[0] };
        } else {
            return { status: 404, data: { msg: "Product not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.saveProduct = async function(prod) {
    console.log("[productsModel.saveProduct] prod = " + JSON.stringify(prod));
    // checks all fields needed and ignores other fields
    if (typeof prod != "object" || productsModel.failProduct(prod)) {
        if (prod.errMsg)
            return { status: 400, data: { msg: prod.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql =
            "INSERT " +
            "INTO products " +
            "(prod_name, prod_price, prod_type_id) " +
            "OUTPUT Inserted.prod_id " +
            "VALUES (@prod_name, @prod_price, @prod_type_id)";
        const pool = await poolPromise;
        const result = await pool.request()
            .input('prod_name', mssql.VarChar, prod.prod_name)
            .input('prod_price', mssql.Decimal, prod.prod_price)
            .input('prod_type_id', mssql.Int, prod.prod_type_id)
            .query(sql);
        let product = result.recordset[0];
        console.log("[productsModel.saveProduct] product = " + JSON.stringify(product));
        return { status: 200, data: product };
    } catch (err) {
        console.log(err);
        if (err.errno == 547) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}