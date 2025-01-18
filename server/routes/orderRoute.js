const express = require('express');
const orderRouter = express.Router();
const authMiddleware = require('../middleware/auth');
const { placeOrder, verifyOrder, getUserOrders, getOrders, statusUpdate } = require('../controllers/orderController')

orderRouter.get('/getorders', getOrders);
orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders',authMiddleware, getUserOrders);
orderRouter.post('/status_update', statusUpdate);

module.exports = orderRouter;