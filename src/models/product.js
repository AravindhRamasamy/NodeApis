const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Integer,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  noofitems: {
    type: Integer,
    required: true
  },
  description: {
    type: Integer,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('productDetails', productSchema);
