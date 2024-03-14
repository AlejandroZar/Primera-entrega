// Cliente WebSocket para actualizar la lista de productos en tiempo real
const socket = io();

// Escuchar el evento 'productAdded' y actualizar la lista de productos
socket.on('productAdded', function(newProduct) {
    const productList = document.getElementById('product-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${newProduct.title} - ${newProduct.price}`;
    productList.appendChild(listItem);
});
