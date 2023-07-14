const express = require('express');
const { cartOrder, cartData, clearCart } = require('../controllers/cart.controller');

const cartRouter = express.Router();

//Order create route
cartRouter.post("/cart", cartOrder);


//Get cart data  route
cartRouter.get("/cart", cartData );

//Get cart data  route
cartRouter.delete("/cart", clearCart );

module.exports={
    cartRouter
}