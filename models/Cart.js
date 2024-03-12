const fs = require('fs');

class Cart {
    constructor() {
        this.cartFilePath = './data/carrito.json';
    }

    // Método para obtener todos los carritos
    async getAllCarts() {
        try {
            const cartsData = await fs.promises.readFile(this.cartFilePath, 'utf-8');
            return JSON.parse(cartsData);
        } catch (error) {
            console.error('Error al obtener los carritos:', error);
            throw new Error('Error al obtener los carritos');
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(cartId) {
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find(cart => cart.id === cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            console.error(`Error al obtener el carrito con ID ${cartId}:`, error);
            throw new Error(`Error al obtener el carrito con ID ${cartId}`);
        }
    }

    // Método para crear un nuevo carrito
    async createCart() {
        try {
            const carts = await this.getAllCarts();
            const newCartId = (carts.length > 0) ? String(Number(carts[carts.length - 1].id) + 1) : '1';
            const newCart = { id: newCartId, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            console.error('Error al crear un nuevo carrito:', error);
            throw new Error('Error al crear un nuevo carrito');
        }
    }

    // Método para agregar un producto al carrito
    async addProductToCart(cartId, productId, quantity) {
        try {
            const carts = await this.getAllCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }
            const cart = carts[cartIndex];
            const existingProductIndex = cart.products.findIndex(product => product.product === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            await fs.promises.writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            console.error(`Error al agregar producto al carrito ${cartId}:`, error);
            throw new Error(`Error al agregar producto al carrito ${cartId}`);
        }
    }
}

module.exports = Cart;
