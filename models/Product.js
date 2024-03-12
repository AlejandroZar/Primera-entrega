const fs = require('fs');

class Product {
    constructor() {
        this.productFilePath = './data/productos.json';
    }

    // Método para obtener todos los productos
    async getAllProducts() {
        try {
            const productsData = await fs.promises.readFile(this.productFilePath, 'utf-8');
            return JSON.parse(productsData);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw new Error('Error al obtener los productos');
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        try {
            const products = await this.getAllProducts();
            const product = products.find(product => product.id === productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            console.error(`Error al obtener el producto con ID ${productId}:`, error);
            throw new Error(`Error al obtener el producto con ID ${productId}`);
        }
    }

    // Método para agregar un nuevo producto
    async addProduct(newProduct) {
        try {
            const products = await this.getAllProducts();
            const newProductId = String(products.length + 1);
            const productWithId = { id: newProductId, ...newProduct };
            products.push(productWithId);
            await fs.promises.writeFile(this.productFilePath, JSON.stringify(products, null, 2));
            return productWithId;
        } catch (error) {
            console.error('Error al agregar un nuevo producto:', error);
            throw new Error('Error al agregar un nuevo producto');
        }
    }

    // Método para actualizar un producto
    async updateProduct(productId, updatedFields) {
        try {
            const products = await this.getAllProducts();
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado');
            }
            const updatedProduct = { ...products[productIndex], ...updatedFields };
            products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.productFilePath, JSON.stringify(products, null, 2));
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${productId}:`, error);
            throw new Error(`Error al actualizar el producto con ID ${productId}`);
        }
    }

    // Método para eliminar un producto
    async deleteProduct(productId) {
        try {
            const products = await this.getAllProducts();
            const updatedProducts = products.filter(product => product.id !== productId);
            await fs.promises.writeFile(this.productFilePath, JSON.stringify(updatedProducts, null, 2));
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${productId}:`, error);
            throw new Error(`Error al eliminar el producto con ID ${productId}`);
        }
    }
}

module.exports = Product;
