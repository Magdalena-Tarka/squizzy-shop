const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      _id: { type: ObjectId, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      ingredients: { type: Array, required: true },
      size: { type: String, required: true },
      priceSingle: { type: Number, required: true },
      quantity: { type: Number, required: true },
      note: { type: String },
    },
  ],
  personalData: {
    firstName: { type: String, minlength: 2, maxlength: 20, required: true },
    lastName: { type: String, minlength: 2, maxlength: 20, required: true },
    street: { type: String, minlength: 2, maxlength: 20, required: true },
    number: { type: String, maxlength: 10, required: true },
    city: { type: String, minlength: 2, maxlength: 20, required: true },
    phone: { type: String, minlength: 9, maxlength: 14, required: true },
  },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
