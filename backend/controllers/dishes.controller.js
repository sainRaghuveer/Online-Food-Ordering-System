// routes/dishes.js
const express = require('express');
const { dishModel } = require('../models/dish.model');
const { dishes } = require('../utils/dishData');


// GET /dishes - Getting all dishes
const getDish=async (req, res) => {
  try {
    const dishes = await dishModel.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /dishes - Creating a new dish
const postDish = async (req, res) => {
  try {

  
    //In case admin dashboard we can use this req.body
    const { name, description, price, image } = req.body;

    //For now I am sending some data for the sake of this assignment that will come from utils/dishData.js
    const dish = await dishModel.insertMany(dishes);
    // const savedDish = await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getDish, postDish
};
