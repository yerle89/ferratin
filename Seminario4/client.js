const zmq = require('zeromq/v5-compat');
const req = zmq.socket('req');
const scanf = require('scanf');
const { finished } = require('stream');
require('dotenv').config();

req.connect('tcp://127.0.0.1:8000');

function get_available_products() {
    const request_data = {
        message: {
            action: 'get_available_products'
        }
    };
    req.send(JSON.stringify(request_data));
}

function get_cart_products() {
    const request_data = {
        message: {
            action: 'get_cart_products'
        }
    };
    req.send(JSON.stringify(request_data));
}

function add_product_to_cart_by_id(_id) {
    const request_data = {
        message: {
            action: 'add_product_to_cart_by_id',
            product_id: _id
        }
    };
    req.send(JSON.stringify(request_data));
}

function remove_product_from_cart_by_id(_id) {
    const request_data = {
        message: {
            action: 'remove_product_from_cart_by_id',
            product_id: _id
        }
    };
    req.send(JSON.stringify(request_data));
}

function finsih_cart(_id) {
    const request_data = {
        message: {
            action: 'finish_cart'
        }
    };
    req.send(JSON.stringify(request_data));
}

req.on('message', data => {
    console.log(JSON.parse(data).message);
    console.log('\n\n\n');
    displayActions();
});

function displayActions() {
        console.log("####### Acciones: #########");
        console.log("1:Añadir articulo al Carrito");
        console.log("2:Eliminar articulo del Carrito\n\n");
        console.log("Introducir acción:");
        let action = scanf('%d');
        let _id;
        switch (action) {
            case 1:
                get_available_products();
                break;
            case 2:
                get_cart_products();
                break;
            case 3:
                console.log("Selecciona el id del producto:");
                _id = scanf('%d');
                add_product_to_cart_by_id(_id);
                    break;
            case 4:
                console.log("Selecciona el id del producto:");
                _id = scanf('%d');
                remove_product_from_cart_by_id(_id);
                break;
            case 5:
                finsih_cart();
                break;
        }
}

displayActions();