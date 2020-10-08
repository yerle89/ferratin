const { Router } = require('express');
const cartdb = require('../database');

const router = Router();

router.get('/', async (req, res) => {
    const productos = await cartdb.get_productos();
    res.send(productos);
});

exports.cart_router = router;