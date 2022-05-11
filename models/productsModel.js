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