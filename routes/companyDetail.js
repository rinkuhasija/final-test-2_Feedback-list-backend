const express = require('express')
const requireAuth = require('../middlewares/requireAuth');
const Company = require('../models/company');

const router = express.Router();

// Create (Company or Product) API
router.post('/companies-list', requireAuth, async (req, res) => {

    const { name,
        logo_url,
        description,
        category,
        product_link } = req.body;

    console.log(req.body)

    try {
        const newCompany = new Company({
            name,
            logo_url,
            description,
            category,
            product_link
        });

        await newCompany.save();

        return res.json({ message: 'Company created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


//get products data
router.get("/companies-list", async (req, res) => {
    try {
        const { category } = req.query;
    
        // Construct the query object based on the category filter
        const query = category ? { category } : {};
    
        // Find companies based on the query
        const companies = await Company.find(query);
    
        res.status(200).json(companies); } catch (error) {
      console.log("Error getting products Detail" + error);
    }
  })

module.exports = router;
