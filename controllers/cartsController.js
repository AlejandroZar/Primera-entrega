// cartsController.js

const fs = require('fs');

const cartFilePath = './data/carrito.json';

const getCartById = (cartId) => {
    const cartsData = fs.readFileSync(cartFilePath, 'utf-8');
    const carts = JSON.parse(cartsData);
    return carts.find(cart => cart.id === cartId);
};

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

const generateCartId = () => {
    const cartsData = fs.readFileSync(cartFilePath, 'utf-8');
    const carts = JSON.parse(cartsData);
    const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;
    return lastCartId + 1;
};

module.exports = {
    getCartById,
    createCart
};
