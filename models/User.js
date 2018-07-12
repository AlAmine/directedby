const mongoose = require('mongoose');
const friends = require('mongoose-friends');
const Schema = mongoose.Schema;

// Création du Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  passwordReset: {
    type: String,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.plugin(friends());

module.exports = User = mongoose.model('users', UserSchema);
