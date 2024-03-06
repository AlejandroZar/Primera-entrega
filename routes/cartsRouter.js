// cartsRouter.js

const express = require('express');
const router = express.Router();

// Importar el controlador de carritos
const cartsController = require('../controllers/cartsController');

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = cartsController.createCart();
    res.status(201).json(newCart);
});

// Ruta para obtener un carrito por su ID
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartsController.getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

module.exports = router;
