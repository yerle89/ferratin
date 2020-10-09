const products_db = require('./database');
var scanf = require('scanf');
let available_products = [];
const cart_products = [];
/* ejemplo de cart = [{
    id: 1,
    name: "iPhone",
    unidades = 3
}]*/

function add_product_to_cart(available_product) {
    let found = false;
    cart_products.filter(cart_product => {
        if (cart_product._id == available_product._id) {
            cart_product.unidades++;
            found = true;
        }
    })
    if (!found) {
        available_product.unidades = 1;
        cart_products.push(available_product);
    }
}

async function get_available_products() {
    const products = await products_db.get_products();
    return products;
}

function search_available_product_by_id(_id) {
    for (available_prod of available_products) {
        if (available_prod._id == _id) {
            return available_prod;
        }
    }
    return undefined;
}

async function check_available_product_by_id(_id) {
    const product = (await products_db.get_product_by_id(_id))[0];
    if (product.stock > 0) {
        return true;
    } else {
        return false;
    }
}

function remove_product_from_cart(_id) {
    cart_products.filter((cart_product, index) => {
        if (cart_product._id == _id) {
            if (cart_product.unidades > 1) {
                cart_product.unidades--;
                return true;;
            } else {
                cart_products.splice(index, 1);
            }
        }
    });
    return false;
}

async function main() {
    while (true) {
        console.log("Carrito:", cart_products);
        available_products = await get_available_products();
        console.log("Articulos disponibles:", available_products);
        console.log("####### Acciones: #########");
        console.log("1:Añadir articulo al Carrito");
        console.log("2:Eliminar articulo del Carrito\n\n");
        console.log("Introducir acción:");
        let action = scanf('%d');
        console.log("Selecciona el id del producto:");
        switch (action) {
            case 1: // add product
                let id = scanf('%d');
                if (await check_available_product_by_id(id)) {
                    let product = search_available_product_by_id(id);
                    if (product) {
                        add_product_to_cart(product);
                    }
                }
                else {
                    console.log("Artículo no Disponible");
                }
                break;
            case 2: //remove product
                if (cart_products.length > 0) {
                    let id = scanf('%d');
                    remove_product_from_cart(id);
                }
                console.log("Carrito Vacio!");
                break;
        }
    }
}

main();