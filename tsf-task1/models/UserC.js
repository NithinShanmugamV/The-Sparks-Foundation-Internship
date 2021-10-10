const mongoose = require('mongoose');

//create schema basically it is not but how your data is stored in database
const UserCSchema = new mongoose.Schema({
  account: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true
  },
})

module.exports = UserC = mongoose.model('userC', UserCSchema);
