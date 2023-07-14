const { cartModel } = require('../models/cart.model');
const { dishModel } = require('../models/dish.model');
const { userModel } = require('../models/user.model');


// POST /orders - Place a new order
const cartOrder = async (req, res) => {
    try {
        const { dish, deliveryTime } = req.body;
        const user = req.headers.user;

        const orderAlreadyExists = await cartModel.find({ user, dish });
        console.log({ orderAlreadyExists })
        if (orderAlreadyExists.length > 0) {
            const order = orderAlreadyExists[0];
            await cartModel.findByIdAndUpdate(order._id, { quantity: order.quantity + 1 }, { runValidators: true });
            res.status(201).json({ message: 'Dish quantity increased' });
            return
        }

        const cartItem = new cartModel({
            dish: dish,
            user: user,
            deliveryTime,
        });

        await cartItem.save();

        res.status(201).json({ message: 'Dish added to cart successfully' });
    } catch (error) {
        console.log("error", error)
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

// POST /orders - Place a new order
const updateOrder = async (req, res) => {
    try {
        const {id:dish}= req.params;
        const user = req.headers.user;

        console.log({user})
        console.log({dish})
        const orderAlreadyExists = await cartModel.find({ user, dish });
        console.log({orderAlreadyExists})
        const order = orderAlreadyExists[0];

        if (order.quantity <= 1) {
            res.status(201).json({ message: 'You can not decrease quantity' });
            return;
        }
        await cartModel.findByIdAndUpdate(order._id, { quantity: order.quantity - 1 }, { runValidators: true });
        res.status(201).json({ message: 'Dish quantity decreased' });

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    cartOrder, cartData, clearCart, updateOrder
};

