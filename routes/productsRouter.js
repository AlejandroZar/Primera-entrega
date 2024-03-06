// productsRouter.js

const express = require('express');
const router = express.Router();

// Importar el controlador de productos
const productsController = require('../controllers/productsController');

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    const products = productsController.getAllProducts();
    res.json(products);
});

// Ruta para obtener un producto por su ID
router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productsController.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const newProduct = req.body;
    const product = productsController.addProduct(newProduct);
    res.status(201).json(product);
});

module.exports = router;
