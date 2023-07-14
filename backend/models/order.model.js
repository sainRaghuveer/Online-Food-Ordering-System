const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  dishes: [
    {
      dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
      quantity: { type: Number, default:1 },
    },
  ],
  total: { 
    type: Number, 
    required: true 
},
  deliveryTime: { 
    type: String,
    default:"2 Hrs"
 },
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = {
  orderModel
};
