// productsController.js

const fs = require('fs');

const productsFilePath = './data/productos.json';

const getAllProducts = () => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData);
};

const getProductById = (productId) => {
    const products = getAllProducts();
    return products.find(product => product.id === productId);
};

const addProduct = (newProduct) => {
    const products = getAllProducts();
    newProduct.id = generateProductId();
    if (newProduct.status === undefined) {
        newProduct.status = true; // Establecer el valor predeterminado de status como true si no se proporciona
    }
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
};

const updateProduct = (productId, updatedFields) => {
    const products = getAllProducts();
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        return products[productIndex];
    }
    return null;
};

const deleteProduct = (productId) => {
    let products = getAllProducts();
    products = products.filter(product => product.id !== productId);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const generateProductId = () => {
    const products = getAllProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastProductId + 1;
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
