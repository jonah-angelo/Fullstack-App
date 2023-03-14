const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  reviewer: {
    type: String,
    required: true
  }
},
{ timestamps: true}
);

module.exports = reviewSchema;

