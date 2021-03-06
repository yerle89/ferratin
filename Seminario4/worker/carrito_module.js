const products_db = require('./database');
let available_products = new Map();
const cart_products = new Map();

exports.get_available_products = async function () {
    const products = await products_db.get_products();
    products.forEach(product => {
        available_products.set(product._id, product);
    });
    return products;
}

exports.get_cart_products = function () {
    let res_cart_products = [];
    for (let [key, value] of cart_products) {
        res_cart_products.push(value);
    }
    return res_cart_products;
}

exports.add_product_to_cart_by_id = async function (_id) {
    if (await products_db.check_available_product_by_id(_id)) {
        await products_db.get_product_by_id(_id, true);
        if (cart_products.get(_id) === undefined) {
            let new_product = available_products.get(_id);
            cart_products.set(_id, { id: _id, name: new_product.name, units: 1 });
        } else {
            cart_products.get(_id).units++;
        }
        return 'Producto añadido al carrito';
    } else {
        return 'No hay stock de este producto!';
    }
}

exports.remove_product_from_cart_by_id = async function (_id) {
    if (cart_products.get(_id)) {
        await products_db.add_product_stock_by_id(_id, 1);
        if (cart_products.get(_id).units == 1) {
            cart_products.delete(_id);
        } else {
            cart_products.get(_id).units--;
        }
        return 'Producto retirado del carrito';
    } else {
        return 'No existe este producto en el carrito!';
    }
}
