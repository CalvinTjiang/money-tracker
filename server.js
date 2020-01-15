//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const stores = require('./routers/store');
const categories = require('./routers/category');
const purchases = require('./routers/purchase');

const app = express();
const PORT = 8080;
app.listen(PORT);

app.use('/', express.static(path.join(__dirname,"dist/money-tracker")));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/money-tracker', {useNewUrlParser: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

// Store RESTFul endpoionts 
app.get('/db/stores', stores.getAll);          // Get all stores
app.get('/db/stores/:id', stores.getOne);      // Get specific store based on id
app.post('/db/stores', stores.createOne);      // Create a new store
app.put('/db/stores/:id', stores.updateOne);   // Update an store'details
app.delete('/db/stores/:id', stores.deleteOne);// Delete a store

 
// Category RESTFul endpoionts 
app.get('/db/categories', categories.getAll);                  // Get all categories
app.get('/db/categories/:id', categories.getOne);              // Get a specific category based on id
app.put('/db/categories/:id', categories.updateOne);           // Update a category
app.post('/db/categories', categories.createOne);              // Create a new category
app.delete('/db/categories/:id', categories.deleteOne);        // Delete a category


//Note 
// Add Purchase RESTFul endpoionts with only option which attribute to be populated
// Purchase RESTFul endpoionts 
app.get('/db/purchases', purchases.getAll);            // Get all purchases
app.get('/db/purchases/:id', purchases.getOne);        // Get a specific purchase based on id
app.post('/db/purchases', purchases.createOne);        // Create a new purchase
app.put('/db/purchases/:id', purchases.updateOne);     // Update a purchase
app.delete('/db/purchases/:id', purchases.deleteOne);  // Delete a purchase

console.log(`Access from: http://localhost:${PORT}`)