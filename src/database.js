const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function connect() {
    const client = await MongoClient.connect('mongodb+srv://admin:Abcd1234@CarritoCompra.gfp2s.mongodb.net/carritocompradb/test?retryWrites=true&w=majority')
    client.db('carritocompra')
}

