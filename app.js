const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const exphbs = require('express-handlebars');

// Importar rutas
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Configuración del motor de plantillas Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Rutas para la gestión de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la vista home
app.get('/', (req, res) => {
    const productos = obtenerProductos();
    res.render('home', { products: productos });
});

// Ruta para la vista realTimeProducts
app.get('/realtimeproducts', (req, res) => {
    const productos = obtenerProductos();
    res.render('realTimeProducts', { products: productos });
});

// Función para obtener productos de la base de datos (simulada)
function obtenerProductos() {
    // Simulación de una lista de productos
    const productos = [
      { id: 1, nombre: 'Producto 1', precio: 10 },
      { id: 2, nombre: 'Producto 2', precio: 20 },
      { id: 3, nombre: 'Producto 3', precio: 30 },
      // Agrega más productos según sea necesario
    ];
  
    return productos;
}

// Configuración de WebSockets
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Lógica para emitir eventos y actualizar la vista realTimeProducts
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
