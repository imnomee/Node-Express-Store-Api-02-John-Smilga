const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).limit(4);
    return res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, rating, name, price, company, sort, select } = req.query;
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

    //select: lets you select the fields you want to display in result of products
    if (select) {
        console.log(select);
        const selected = select.split(',').join(' ');
        result = result.select(selected);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    //23 products
    // (1-1) * 10 = 0 (skip 0 items) 1 page
    //(2-1) * 10 = 10 (skip 10 items) 2 page

    const products = await result; // we wait for finding and sorting

    console.log('queryObject:', queryObject, 'page/limit', page, limit);
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
