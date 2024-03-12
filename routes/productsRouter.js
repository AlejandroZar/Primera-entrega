const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas para la gestión de productos
router.get('/', productsController.getAllProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', productsController.addProduct);
router.put('/:pid', productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
