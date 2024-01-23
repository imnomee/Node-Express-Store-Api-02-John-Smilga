const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, rating, name, price, company, sort } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        //we can pass the regex search option from mongo to look for a small part in name
        queryObject.company = { $regex: company, $options: 'i' };
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let result = Product.find(queryObject); /// we find the products

    //Sorting doesn't affect the amount of items we return
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList); //we sort the products if the sort is passed
    } else {
        result = result.sort('name'); //or it will sort by default by name a-z
    }
    const products = await result; // we wait for finding and sorting
    console.log('queryObject:', queryObject);
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
