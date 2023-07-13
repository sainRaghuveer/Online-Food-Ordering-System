const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/db');
const { userRouter } = require('./routes/user.route');
const { authentication } = require('./middlewares/Authentication');
const { dishRouter } = require('./routes/dishes.route');
const { orderRouter } = require('./routes/order.route');


require('dotenv').config();

//Creating app
const app =express();

//To get access of multiple domaine
app.use(cors());

//Parsing configuration
app.use(express.json());

//Default routes
app.get("/", (req, res)=>{
    res.send("Welcome to the online-foodApp backend! 🪄");
});

// user routes
app.use("/api", userRouter);

// user authentication only authenticated user can make order
app.use(authentication);

//restaurant routes
//Dish route
app.use("/api", dishRouter);

//order route
app.use("/api", orderRouter);

//Server
app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("connected with foodApp DB");
    }catch(error){
        console.log(error);
    }
    console.log(`Server is running at PORT ${process.env.PORT}`);
})