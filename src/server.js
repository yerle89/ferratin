const express = require('express')

const app = express();

// Routes
app.get('/', (req, res) => {
    console.log("Hola mundo");
});

exports.app = app;