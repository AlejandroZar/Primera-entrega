// cartsRouter.js

const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.post('/', (req, res) => {
    const newCart = cartsController.createCart();
    res.status(201).json(newCart);
});

module.exports = router;
