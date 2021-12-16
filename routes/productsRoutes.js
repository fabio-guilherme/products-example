var express = require('express');
var router = express.Router();
var productModel = require('../models/productsModel');

/* GET products listing. */
router.get('/', async function(req, res, next) {
    let result = await productModel.getProducts();
    res.status(result.status).send(result.result);

});

/* GET a specific product */
router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending product with id " + id);
    let result = await productModel.getProductById(id);
    res.status(result.status).send(result.result);
});

module.exports = router;