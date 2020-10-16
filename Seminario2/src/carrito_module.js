const products_db = require('./database');
let available_products = [];
const cart_products = [];
/* ejemplo de cart = [{
    id: 1,
    name: "iPhone",
    unidades = 3
}]*/

exports.get_available_products = async function () {
    const products = await products_db.get_products();
    available_products = products;
    return products;
}

exports.get_cart_products = function () {
    return cart_products;
}

exports.add_product_to_cart_by_id = async function (_id) {
    if (await products_db.check_available_product_by_id(_id)) {
        for (let i = 0; i < cart_products.length; i++) {
            if (cart_products[i]._id == _id) {
                cart_products[i].unidades++;
                return 'Producto añadido con éxito';
            }
        }
        // not found
        for (let i = 0; i < available_products.length; i++) {
            if (available_products[i]._id == _id) {
                let product = available_products[i];
                product.unidades = 1;
                cart_products.push(product);
                return 'Producto añadido con éxito';
            }
        }
    }
    return 'Producto no añadido porque no hay stock';
}

exports.remove_product_from_cart_by_id = function (_id) {
    for (let i = 0; i < cart_products.length; i++) {
        if (cart_products[i]._id == _id) {
            if (cart_products[i].unidades == 1) {
                cart_products.splice(i, 1);
                return 'Producto eliminado con éxito';
            } else {
                cart_products[i].unidades--;
                return 'Producto eliminado con éxito';
            }
        }
    }
    return 'No existe este producto en el carrito';
}
