var pool = require("./connection");

module.exports.getProducts = async function() {
    try {
        let sql = "select * from products"
        let result = await pool.query(sql);
        let products = result.rows;
        console.log("[productsModel.getProducts] products = " + JSON.stringify(products));
        return { status: 200, data: products };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getTypes = async function() {
    try {
        let sql = "select * from types"
        let result = await pool.query(sql);
        let types = result.rows;
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
            "WHERE p.prod_type_id = t.type_id AND prod_id = $1;";
        let result = await pool.query(sql, [id]);
        let products = result.rows;
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
    if (typeof prod != "object" || failProduct(prod)) {
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
            "VALUES ($1, $2, $3) " +
            "RETURNING prod_id";
        let result = await pool.query(sql, [prod.prod_name, prod.prod_price, prod.prod_type_id]);
        let product = result.rows[0];
        console.log("[productsModel.saveProduct] product = " + JSON.stringify(product));
        return { status: 200, data: product };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

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