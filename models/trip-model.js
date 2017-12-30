const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model.js');

const tripSchema = new Schema(
  {
    country: {type: String, required: [true, 'Which country did you travel to?']},
    cityVisited: {type: String},
    yearVisited: { type: String},
    daysStayed: { type: String},
    tourAttractions: {type: String},
    description: {type: String},
    something: { type: String },
    photoAddress: [String],
    tripNote:{ type: String},
    owner: {type: Schema.Types.ObjectId },
  },
  {
    timestamps: true
  }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
