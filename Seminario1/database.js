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

exports.get_product_by_id = async (_id) => {
    const db = await connect();
    const product = (await db.collection('producto').find({ _id: _id }).toArray())[0];
    return product;
}

exports.check_available_product_by_id = async (_id) => {
    const product = await this.get_product_by_id(_id);
    if (product.stock > 0) {
        return true;
    } else {
        return false;
    }
}
