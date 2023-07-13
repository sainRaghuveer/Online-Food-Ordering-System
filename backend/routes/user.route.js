const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');

const userRouter = express.Router();

//User register route
userRouter.post("/register", registerUser);


//User Login route
userRouter.post("/login", loginUser);


module.exports={
    userRouter
}