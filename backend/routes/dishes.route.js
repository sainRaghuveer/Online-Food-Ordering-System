const express = require('express');
const { getDish, postDish } = require('../controllers/dishes.controller');

const dishRouter = express.Router();


//get all dish route
dishRouter.get("/dish", getDish);


//Post new dish route
dishRouter.post("/dish", postDish);


module.exports ={
    dishRouter
}