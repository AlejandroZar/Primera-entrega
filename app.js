const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const viewsRouter = require('./routes/viewsRouter');
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas para renderizar vistas
app.use('/', viewsRouter);

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

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Aquí puedes definir eventos para la comunicación en tiempo real
});

module.exports = app;
