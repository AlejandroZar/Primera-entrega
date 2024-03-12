const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Rutas para la gestión de productos
app.use('/api/products', productsRouter);

// Rutas para la gestión de carritos
app.use('/api/carts', cartsRouter);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
