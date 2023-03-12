// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./review.js');

// Create a schema to define the properties of the songs collection
const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    artist: {type: String, required: true},
    genre: {type: String, required: true},
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    dateReleased: { type: Number, required: true},
    reviews: [reviewSchema]
});

// Export the schema as a Monogoose model.
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Song', songSchema);