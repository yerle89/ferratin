const products_db = require('./database');
let available_products = [];
const cart_products = {};
/* ejemplo de cart = [{
    id: 1,
    name: "iPhone",
    unidades = 3
}]*/

exports.get_available_products = async function () {
    const products = await products_db.get_products();
    available_products = products;
    return available_products;
}

exports.get_cart_products = function () {
    return cart_products;
}

exports.add_product_to_cart_by_id = async function (_id) {
    if (await products_db.check_available_product_by_id(_id)) {
        if (cart_products[_id] === undefined) {
            let new_product = available_products.find(x => x._id === _id)
            //Hacer consulta sobre la base de datos y comprobar stock
            cart_products[_id] = {name: new_product.name, units: 1}
        } else {
            cart_products[_id].units++
        }
    } else {
        console.log('No hay stock de este producto!')
    }
}

exports.remove_product_from_cart_by_id = function (_id) {
    if (cart_products[_id]) {
        if (cart_products[_id].units == 1) {
            delete cart_products[_id]
        } else {
            cart_products[_id].units--
        }
    } else {
        console.log('No existe este producto en el carrito!')
    }
}
