# Node-Express-Store-Api-02-John-Smilga

This simple Store Products api doesn't have front-end
but it does bring the data from MongoDB.
In this project we worked through, getting the products
filtering
sorting
limitations
paginations

Steps to check and add your own products, you will need to replace the populate.json with your own data

1. in populate.js set your own file name
2. setup a ' .env ' on the root of this folder
3. npm install the dependencies
4. in ' .env ' set a variable MONGO_URI with your mongo connection string
5. run the populate.js using 'node populate.js', once you see success message, the data is added.

You can look for the products on '/api/v1/products' for all products //// all products
products?name / company / featured //// search by name company featured
products?sort=name,company,featured /// sort by name company featured
products?select=name,createdAt /// display selected fields
products?numericFilters=rating>4,price<30 // sort by rating greater than and price less than
