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

//insert many data API
const companies = [
    {
        name: " Cred Club",
        logo_url: " https://res.cloudinary.com/ddtqo540a/image/upload/v1686260470/Feedback_list_images/image_2_y2h67o.png ",
        description: "It is good for credit card payments,it is fast,secure ",
        category: [" Fintech ", "B2B "],
        product_link: " https://cred.club/ "

    },

    {
        name: "Apna Godam ",
        logo_url: " https://res.cloudinary.com/ddtqo540a/image/upload/v1686260470/Feedback_list_images/image_3_aiodaa.png ",
        description: "Provide warehouse and loan service to farmers and small traders ",
        category: ["Agritech"],
        product_link: " https://apnagodam.com/"

    }

    // {
    //     name: " ",
    //     logo_url: "",
    //     description: " ",
    //     category: [" ", " "],
    //     product_link: " "

    // },

    // {
    //     name: " ",
    //     logo_url: "",
    //     description: " ",
    //     category: [" ", " "],
    //     product_link: " "

    // }

    // Add more earphones as needed
];


router.post("/insertProductsData", async (req, res) => {

    try {

        // Insert the dummy data into the Product collection
        Company.insertMany(companies)
            .then(() => {
                console.log('Dummy data inserted successfully.');
            })
            .catch((err) => {
                console.error('Error inserting dummy data:', err);
            });

        res.status(201).send("data inserted successfully")

    } catch (error) {
        console.log("data not inserted" + error);
    }

});

//get products data
router.get("/getProductsData", async (req, res) => {
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
