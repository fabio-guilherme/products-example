var express = require('express');
var router = express.Router();
var productsModel = require('../models/mssql/productsModel');

/* GET products listing. */
router.get('/', async function(req, res, next) {
    console.log("[productsRoutes] Retrieving all products");
    let result = await productsModel.getProducts();
    res.status(result.status).send(result.data);

});

/* GET a specific product */
router.get('/:id(\\d+)', async function(req, res, next) {
    let id = req.params.id;
    console.log("[productsRoutes] Retrieving product with id " + id);
    let result = await productsModel.getProduct(id);
    res.status(result.status).send(result.data);
});

/* GET types listing */
router.get("/types", async function(req, res, next) {
    console.log("[productsRoutes] Retrieving all types");
    let result = await productsModel.getTypes();
    res.status(result.status).send(result.data);
});

/* POST a new product */
router.post('/', async function(req, res, next) {
    let newProduct = req.body;
    console.log("[productsRoutes] Saving product " + JSON.stringify(newProduct));
    let result = await productsModel.saveProduct(newProduct);
    res.status(result.status).send(result.data);
});


module.exports = router;