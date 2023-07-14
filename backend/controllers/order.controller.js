const { dishModel } = require('../models/dish.model');
const { orderModel } = require('../models/order.model');


// POST /orders - Place a new order
const postOrder = async (req, res) => {
  try {
    const { dishes, total, deliveryTime } = req.body;

    // Populate the dish details in the order
    const populatedDishes = await dishModel.populate(dishes, { path: 'dish' });

    const order = new orderModel({ dishes: populatedDishes, total, deliveryTime });
    const savedOrder = await order.save();

    // Populate the saved order details before sending the response
    const populatedOrder = await orderModel
      .findById(savedOrder._id)
      .populate('dishes.dish', '-__v');

    res.status(201).json({ order: populatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    postOrder
};
