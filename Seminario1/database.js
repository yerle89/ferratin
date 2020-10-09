const mongodb = require('mongodb');

const db_url = 'mongodb+srv://admin:Abcd1234@CarritoCompra.gfp2s.mongodb.net/carritocompradb/test?retryWrites=true&w=majority';
const MongoClient = mongodb.MongoClient;

async function connect() {
    try {
        const client = await MongoClient.connect(db_url, { useUnifiedTopology: true })
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
    const product = await db.collection('producto').find({ _id: _id }).toArray();
    return product;
}

exports.connect = connect;