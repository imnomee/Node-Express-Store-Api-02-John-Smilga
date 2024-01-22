require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProductsData = require('./products.json');

const start = async () => {
    try {
        //connect with database
        await connectDB(process.env.MONGO_URI);
        //remove all the products before pasting our data, if any.
        await Product.deleteMany();
        //create method can take and array of products if property formated according to the Model
        await Product.create(jsonProductsData);
        console.log('Success!!!!');
        //close the process
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
