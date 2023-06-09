const express = require('express');
const router = express.Router();
const Upvote = require('../models/upvote');

//POST COUNT
router.post('/upvotes/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the upvote document for the given postId
        let upvote = await Upvote.findOne({ postId });

        if (!upvote) {
            // Create a new upvote document if it doesn't exist
            upvote = new Upvote({ postId });
        }

        // Increment the upvote count
        upvote.count += 1;

        // Save the updated upvote document
        await upvote.save();

        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating upvote count:', error);
        res.sendStatus(500);
    }
});

//GET COUNT BY POST ID
router.get('/upvotes/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the upvote document for the given postId
        const upvote = await Upvote.findOne({ postId });

        if (!upvote) {
            return res.status(404).json({ message: 'Upvote not found' });
        }

        res.status(200).json({ count: upvote.count });
    } catch (error) {
        console.error('Error retrieving upvote count:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//GET ALl COUNTs
router.get('/upvotes/', async (req, res) => {
    try {
      const upvotes = await Upvote.find();
      const countData = {};
  
      upvotes.forEach(upvote => {
        countData[upvote.postId] = upvote.count;
      });
  
      res.json(countData);
    } catch (error) {
      console.error('Error retrieving upvote count data:', error);
      res.sendStatus(500);
    }
  });

module.exports = router;
