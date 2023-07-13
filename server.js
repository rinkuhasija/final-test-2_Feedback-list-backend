const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); //  .env file

//import routes
const authRoutes = require('./routes/auth')
const companyDetail = require('./routes/companyDetail')
const upvoteData = require('./routes/upvoteData')
const commentsRoutes = require('./routes/commentsRoutes')

// Create Express app
const app = express();

// Middleware - Enable CORS
app.use(cors());

// Middleware - Parse JSON request body
app.use(bodyParser.json());

// Middleware - Parse URL-encoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });



// Login and Register routes
app.use('/api/auth', authRoutes);

// company routes
app.use('/api/company', companyDetail);

// upvote routes
app.use('/api/', upvoteData);

app.use('/api/', commentsRoutes);


app.get("/", async (req, res) => {
    res.status(200).json("Server is up and running")
})



// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});