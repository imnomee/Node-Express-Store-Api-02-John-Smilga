const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        required: [true, 'Product name is required'],
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },
});

module.exports = mongoose.model('Product', productsSchema);
