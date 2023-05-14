var pool = require("./connection");
var productsModel = require("../productsModel");


module.exports.getProducts = async function() {
    try {
        let sql = "select * from products";
        const products = await pool.query(sql);
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
        const types = await pool.query(sql);
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
            "WHERE p.prod_type_id = t.type_id AND prod_id = ?;";
        let products = await pool.query(sql, [id]);
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
            "VALUES (?, ?, ?); "
        let result = await pool.query(sql, [prod.prod_name, prod.prod_price, prod.prod_type_id]);
        let product = { prod_id: result.insertId };
        console.log("[productsModel.saveProduct] product = " + JSON.stringify(product));
        return { status: 200, data: product };
    } catch (err) {
        console.log(err);
        if (err.errno == 1452) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}