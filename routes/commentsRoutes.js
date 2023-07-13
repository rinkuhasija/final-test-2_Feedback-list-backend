// commentsRoutes.js

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Add a new comment
router.post('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = new Comment({
      postId,
      content
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all comments for a specific post
router.get('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    const commentsData = {}

    comments.forEach(comment => {
      commentsData[comment.postId] = comment.content;
    })

    // console.log("all-comments");
    res.status(200).json(commentsData);

  } catch (error) {
    console.error('Error retrieving comments:', error);
    console.log("error");
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
