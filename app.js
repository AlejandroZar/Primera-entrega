// app.js

const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

// Configurar puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
