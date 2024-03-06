// productsController.js

// Importar el módulo fs para manejar archivos
const fs = require('fs');

// Ruta al archivo de productos
const productsFilePath = './data/productos.json';

// Función para obtener todos los productos
const getAllProducts = () => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData);
};

// Función para obtener un producto por su ID
const getProductById = (productId) => {
    const products = getAllProducts();
    return products.find(product => product.id === productId);
};

// Función para agregar un nuevo producto
const addProduct = (newProduct) => {
    const products = getAllProducts();
    newProduct.id = generateProductId();
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
};

// Función para generar un ID único para el producto
const generateProductId = () => {
    const products = getAllProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastProductId + 1;
};

// Exportar los métodos del controlador
module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};
