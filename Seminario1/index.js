const carrito = require('./carrito_module');
let scanf = require('scanf');

async function main() {
    while (true) {
        console.log("Carrito:", carrito.get_cart_products());
        console.log("Articulos disponibles:", await carrito.get_available_products());
        console.log("####### Acciones: #########");
        console.log("1:Añadir articulo al Carrito");
        console.log("2:Eliminar articulo del Carrito\n\n");
        console.log("Introducir acción:");
        let action = scanf('%d');
        console.log("Selecciona el id del producto:");
        let _id = scanf('%d');
        switch (action) {
            case 1: // add product
                await carrito.add_product_to_cart_by_id(_id);
                break;
            case 2: //remove product
                await carrito.remove_product_from_cart_by_id(_id);
                break;
        }
    }
}

main();