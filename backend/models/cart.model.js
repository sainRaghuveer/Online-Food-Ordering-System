const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryTime: {
        type: String,
        default: "2 Hrs"
    },
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = {
    cartModel
};
