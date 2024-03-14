const express = require('express');
const router = express.Router();

// Ruta para renderizar la vista home
router.get('/', (req, res) => {
    // Aquí debes obtener los productos de tu base de datos o archivo JSON
    const products = [
        { title: 'Producto 1', price: 10.99 },
        { title: 'Producto 2', price: 19.99 },
        // Agrega más productos según sea necesario
    ];

    res.render('home', { products });
});

// Ruta para renderizar la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
