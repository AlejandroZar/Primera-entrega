// cartsController.js

// Importar el módulo fs para manejar archivos
const fs = require('fs');

// Ruta al archivo de carrito
const cartFilePath = './data/carrito.json';

// Función para obtener el carrito por su ID
const getCartById = (cartId) => {
    const cartsData = fs.readFileSync(cartFilePath, 'utf-8');
    const carts = JSON.parse(cartsData);
    return carts.find(cart => cart.id === cartId);
};

// Función para crear un nuevo carrito
const createCart = () => {
    const cartsData = fs.readFileSync(cartFilePath, 'utf-8');
    const carts = JSON.parse(cartsData);
    const newCart = {
        id: generateCartId(),
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));
    return newCart;
};

// Función para generar un ID único para el carrito
const generateCartId = () => {
    const cartsData = fs.readFileSync(cartFilePath, 'utf-8');
    const carts = JSON.parse(cartsData);
    const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;
    return lastCartId + 1;
};

// Exportar los métodos del controlador
module.exports = {
    getCartById,
    createCart
};
