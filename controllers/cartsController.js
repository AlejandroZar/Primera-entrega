const fs = require('fs');

// Método para crear un nuevo carrito
exports.createCart = (req, res) => {
    // Lógica para crear un nuevo carrito
    const newCartId = generateUniqueId(); // Genera un ID único para el nuevo carrito
    const newCart = {
        id: newCartId,
        products: []
    };

    // Persistencia del nuevo carrito en el archivo carrito.json
    fs.readFile('data/carrito.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const carts = JSON.parse(data);
        carts.push(newCart);
        fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(201).json(newCart);
        });
    });
};

// Método para obtener un carrito por su ID
exports.getCartById = (req, res) => {
    // Lógica para obtener un carrito por su ID
    const cartId = req.params.cid;
    fs.readFile('data/carrito.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) {
            res.status(404).send('Carrito no encontrado');
            return;
        }
        res.json(cart);
    });
};

// Método para agregar un producto al carrito
exports.addProductToCart = (req, res) => {
    // Lógica para agregar un producto al carrito
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity); // Suponiendo que la cantidad se pasa en el cuerpo de la solicitud

    // Lógica para agregar el producto al carrito con el id proporcionado
    fs.readFile('data/carrito.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) {
            res.status(404).send('Carrito no encontrado');
            return;
        }
        // Verificar si el producto ya existe en el carrito
        const existingProduct = cart.products.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Incrementar la cantidad si el producto ya está en el carrito
        } else {
            cart.products.push({ id: productId, quantity: quantity }); // Agregar el nuevo producto al carrito
        }
        // Actualizar el archivo carrito.json con el carrito modificado
        fs.writeFile('data/carrito.json', JSON.stringify(carts, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(200).json(cart);
        });
    });
};

// Función para generar un ID único para un carrito
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
