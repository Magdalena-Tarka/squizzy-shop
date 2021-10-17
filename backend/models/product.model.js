const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: Array, required: true },
  options: { type: Array, required: true },
  fruit: { type: Boolean },
  vege: { type: Boolean },
  pressedJuice: { type: Boolean },
  milk: { type: Boolean },
});

module.exports = mongoose.model('Product', productSchema);
