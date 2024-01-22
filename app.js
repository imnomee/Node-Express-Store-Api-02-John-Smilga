require('dotenv').config();
//async errors
require('express-async-errors');

const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const productsRouter = require('./routes/products');
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use('/api/v1/products', productsRouter);

//product routes
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on: ${port}...`));
    } catch (err) {
        console.log(err.message);
    }
};

start();
