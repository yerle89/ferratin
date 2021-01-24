const mongodb = require('mongodb');


const MongoClient = mongodb.MongoClient;

async function connect() {
    try {
        const client = await MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true })
        const db = client.db('carritocompradb');
        return db;
    } catch (e) {
        console.log(e);
    }
}

exports.get_products = async () => {
    const db = await connect();
    const productos = await db.collection('producto').find({}).toArray();
    return productos;
}

exports.get_product_by_id = async (_id, updateStock = false) => {
    const db = await connect();
    const product = (await db.collection('producto').find({ _id: _id }).toArray())[0];
    if (updateStock && product.stock > 0) {
        db.collection('producto').findOneAndUpdate({ _id: _id }, {$set: {stock: product.stock - 1}}, {upsert: true}, function(err, doc) {
            if (err) { console.log("Error updating stock"); }
        })
    }
    return product;
}

exports.add_product_stock_by_id = async (_id, qtyToAdd) => {
    const db = await connect();
    const product = (await db.collection('producto').find({ _id: _id }).toArray())[0];
    db.collection('producto').findOneAndUpdate({ _id: _id }, {$set: {stock: product.stock + qtyToAdd}}, {upsert: true}, function(err, doc) {
        if (err) { console.log("Error updating stock"); }
    })
    return product.stock + qtyToAdd
}

exports.check_available_product_by_id = async (_id) => {
    const product = await this.get_product_by_id(_id);
    return product !== undefined && product.stock > 0
}
