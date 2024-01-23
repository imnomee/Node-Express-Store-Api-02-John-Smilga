const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, select, numericFilters } = req.query;
    const queryObject = {};

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regex = /\b(>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regex,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
        console.log(numericFilters, filters);
    }
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

    //sorting with numeric, price numbers

    const products = await result; // we wait for finding and sorting

    console.log('queryObject:', queryObject, 'page/limit', page, limit);
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
};
