const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,'must provide username'],
    trim: true,
    unique: true,
    maxlength: [20, 'name can not be more than 20 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('User', UserSchema);
