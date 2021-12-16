var pool = require("./connection");

module.exports.getProducts = async function() {
    try {
        let sql = "Select * from products";
        let result = await pool.query(sql);
        let products = result.rows;
        console.log("[productsModel] products = " + JSON.stringify(products));
        return { status: 200, result: products };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.getProductById = async function(id) {
    try {
        let sql = "select * from products " +
            "where prod_id = $1;";
        let result = await pool.query(sql, [id]);
        if (result.rows.length > 0)
            return { status: 200, result: result.rows[0] };
        else return { status: 404, result: { msg: "Product not found." } };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}



module.exports.getProduct =
    function(pos) {
        return productsOld[pos];
    }

module.exports.addProduct =
    function(product) {
        let inserted = 1;
        productsOld.push(product);
        return { inserted: inserted };
    }