const mongoose = require('mongoose');

//create schema basically it is not but how your data is stored in database
const TransCSchema = new mongoose.Schema({
  account1: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  account2: {
    type: Number,
    required: true
  }
})

module.exports = TransC = mongoose.model('transC', TransCSchema);
