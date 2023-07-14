const express = require('express');
const { cartOrder, cartData, clearCart, updateOrder } = require('../controllers/cart.controller');

const cartRouter = express.Router();

//Order create route
cartRouter.post("/cart", cartOrder);


//Get cart data  route
cartRouter.get("/cart", cartData );

//Get cart data  route
cartRouter.delete("/cart", clearCart );

//update cart order
cartRouter.patch("/cart/:id", updateOrder)

module.exports={
    cartRouter
}