const mongoose = require('mongoose')
// const Company = require './company.js';

const upvoteSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const Upvote = mongoose.model('Upvote', upvoteSchema);

module.exports = Upvote;
