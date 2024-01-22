const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'Products Actual route' });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
