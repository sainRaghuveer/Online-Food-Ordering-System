const express = require('express');
const { postOrder } = require('../controllers/order.controller');

const orderRouter = express.Router();

//Order create route
orderRouter.post("/order", postOrder);

module.exports={
    orderRouter
}