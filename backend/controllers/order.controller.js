// routes/orders.js
const express = require('express');


// POST /orders - Place a new order
const postOrder = async (req, res) => {
  try {
    const { dishes, total, deliveryTime } = req.body;
    const order = new orderModel({ dishes, total, deliveryTime });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    postOrder
};
