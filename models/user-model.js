const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: [true, 'Please insert your name.']},
    logInCount: { type: Number, default: 0},
    photo: {type: String, default: '/img/happyTraveller.jpg'},
    profession: { type: String },
    location: { type: String },
    email: { type:String} ,
    about: {type: String},
    username: { type: String },
    encryptedPassword: { type: String },
    social: { type: String},
    favPlace: { type: String },
    facebookID: { type: String },
    googleID: { type: String }
  },
  {
    timestamps:true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
