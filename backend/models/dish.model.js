const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  price: { 
    type: Number, 
    required: true 
},
  image: { 
    type: String 
},
});

const dishModel = mongoose.model('Dish', dishSchema);

module.exports = {
    dishModel
};
