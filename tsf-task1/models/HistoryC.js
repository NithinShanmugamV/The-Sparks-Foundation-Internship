const mongoose = require('mongoose');

//create schema basically it is not but how your data is stored in database
const HistoryCSchema = new mongoose.Schema({
  account1: {
    type: Number,
    required: true
  },
  account2: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = HistoryC = mongoose.model('historyC', HistoryCSchema);