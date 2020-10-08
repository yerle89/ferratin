const express = require('express')

const app = express();

// Routes
const { index_router } = require('./routes/index.routes');
app.use(index_router)
const { cart_router } = require('./routes/cart.routes');
app.use('/cart', cart_router);

exports.app = app;