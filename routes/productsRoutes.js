var express = require('express');
var router = express.Router();
var productModel = require('../models/productsModel');

/* GET products listing. */
router.get('/', async function(req, res, next) {
    let result = await productModel.getProducts();
    res.status(result.status).send(result.data);

});

/* GET a specific product */
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending product with id " + id);
    let result = await productModel.getProduct(id);
    res.status(result.status).send(result.data);
});

/* GET types listing */
router.get("/types", async function(req, res, next) {
    let result = await productModel.getTypes();
    res.status(result.status).send(result.data);
});

/* POST a new product */
router.post('/', async function(req, res, next) {
    let newProduct = req.body;
    console.log("Saving product " + JSON.stringify(newProduct));
    let result = await productModel.insertProduct(id);
    res.status(result.status).send(result.data);
});


module.exports = router;