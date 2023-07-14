const { cartModel } = require('../models/cart.model');


// POST /orders - Place a new order
const cartOrder = async (req, res) => {
    try {
        const { dish, deliveryTime } = req.body;
        const user = req.headers.user;
    
        const cartItem = new cartModel({
          dish:dish,
          user:user,
          deliveryTime,
        });
    
        await cartItem.save();
    
        res.status(201).json({ message: 'Dish added to cart successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};


// GET /orders - cart data order
const cartData = async (req, res) => {
    try {
      const user = req.headers.user;
  
      const cartItems = await cartModel.find({ user }).populate('dish');
  
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const clearCart = async (req, res) => {
    try {
      const user = req.headers.user;
  
      await cartModel.deleteMany({ user });
  
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    cartOrder,cartData, clearCart
  };

