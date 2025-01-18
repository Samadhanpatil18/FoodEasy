const express = require('express');
const cartRouter = express.Router();
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCartItems);

module.exports = cartRouter;