// productsRouter.js

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined; // Obtener el límite de productos si se proporciona
    let products = productsController.getAllProducts();
    if (limit !== undefined) {
        products = products.slice(0, limit); // Aplicar el límite de productos
    }
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productsController.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    const product = productsController.addProduct(newProduct);
    res.status(201).json(product);
});

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = productsController.updateProduct(productId, updatedFields);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    productsController.deleteProduct(productId);
    res.status(204).end();
});

module.exports = router;
