// comentario
var mgdb = require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url = "mongodb+srv://admin:Abcd1234@CarritoCompra.gfp2s.mongodb.net/carritocompradb/test?retryWrites=true&w=majority"


function conectar(callback) {
  mongoclient.connect(url, { useUnifiedTopology: true }, callback);
}

function insertar(data) {
  mongoclient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    /*assert.equal(err, null);
  
    var db = client.db('carritocompradb');
    console.log("Database conected!");*/

    /*db.createCollection("documents", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      });*/

    /*insertDocuments(db, function () {
      if (err) throw err;
      console.log('success with insertion!');
      client.close();
    });*/

  });
}
function borrar(data) {
  mongoclient.connect(url, { useUnifiedTopology: true }, function (err, client) {

  }
}



function insertar(data) {
  funcion conectar()
}


var insertDocuments = function (db, callback) {
  // Get the documents collection
  var collection = db.collection("producto");
  // Insert some documents
  collection.insertMany([
    { cod: 1, desc: 'one plus', stock: 0 }, { cod: 2, desc: 'iphone', stock: 10 }, { cod: 3, desc: 'nokia', stock: 5 }
  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 products into the collection");
    callback(result);
  });
}

//var insertDocuments = function (db, callback) {
  // Get the documents collection
  // var collection = db.collection('products');
  // Insert some documents
/*collection.insertMany([
  { cod: 1, desc: 'palos', stock: 0 }, { cod: 2, desc: 'hierros', stock: 10 }, { cod: 3, desc: 'muelles', stock: 5 }
], function (err, result) {
  assert.equal(err, null);
  assert.equal(3, result.result.n);
  assert.equal(3, result.ops.length);
  console.log("Inserted 3 products into the collection");
  callback(result);
});*/
//}