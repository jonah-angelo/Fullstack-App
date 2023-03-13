const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  review: {
    type: String,
    required: true
  },
});

module.exports = reviewSchema;

