const fs = require('fs');

// Método para listar todos los productos
exports.getAllProducts = (req, res) => {
    // Lógica para obtener todos los productos
    const limit = parseInt(req.query.limit); // Limitar la cantidad de productos devueltos si se especifica en la consulta
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        let products = JSON.parse(data);
        if (limit) {
            products = products.slice(0, limit); // Aplicar el límite de productos si se especifica en la consulta
        }
        res.json(products);
    });
};

// Método para obtener un producto por su ID
exports.getProductById = (req, res) => {
    // Lógica para obtener un producto por su ID
    const productId = req.params.pid;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(product => product.id === productId);
        if (!product) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.json(product);
    });
};

// Método para agregar un nuevo producto
exports.addProduct = (req, res) => {
    // Lógica para agregar un nuevo producto
    const newProduct = req.body;
    newProduct.id = generateUniqueId(); // Generar un ID único para el nuevo producto
    if (!newProduct.status) {
        newProduct.status = true; // Establecer el valor predeterminado de status en true si no se proporciona en el cuerpo de la solicitud
    }
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const products = JSON.parse(data);
        products.push(newProduct);
        fs.writeFile('data/productos.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(201).json(newProduct);
        });
    });
};

// Método para actualizar un producto por su ID
exports.updateProduct = (req, res) => {
    // Lógica para actualizar un producto por su ID
    const productId = req.params.pid;
    const updatedFields = req.body;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        let products = JSON.parse(data);
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        fs.writeFile('data/productos.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(200).json(products[productIndex]);
        });
    });
};

// Método para eliminar un producto por su ID
exports.deleteProduct = (req, res) => {
    // Lógica para eliminar un producto por su ID
    const productId = req.params.pid;
    fs.readFile('data/productos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        let products = JSON.parse(data);
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        products.splice(productIndex, 1);
        fs.writeFile('data/productos.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(204).send();
        });
    });
};

// Función para generar un ID único para un producto
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
