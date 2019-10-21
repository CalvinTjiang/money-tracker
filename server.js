//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const users = require('./routers/user');
const stores = require('./routers/store');
const categories = require('./routers/category');
const purchases = require('./routers/purchase');

const app = express();

app.listen(8080);

app.use('/', express.static(path.join(__dirname,"dist/money-tracker")));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/money-tracker', {useNewUrlParser: true }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
// User RESTFul endpoionts 
app.get('/db/users', users.getAll);            // Get all users
app.get('/db/users/:id', users.getOne);        // Get specific user based on id
app.post('/db/users', users.createOne);        // Create a new user
app.put('/db/users/:id', users.updateOne);     // Update an user's details
app.delete('/db/users/:id', users.deleteOne);  // Delete an user


// Store RESTFul endpoionts 
app.get('/db/stores', stores.getAll);          // Get all stores
app.get('/db/stores/:id', stores.getOne);      // Get specific store based on id
app.post('/db/stores', stores.createOne);      // Create a new store
app.put('/db/stores/:id', stores.updateOne);   // Update an store'details
app.delete('/db/stores/:id', stores.deleteOne);// Delete a store

 
// Category RESTFul endpoionts 
app.get('/db/categories', categories.getAll);                  // Get all categories
app.get('/db/categories/super', categories.getWithSuper);      // Get all categories populate with the supercategories
app.get('/db/categories/:id', categories.getOne);              // Get a specific category based on id

app.put('/db/categories/:id', categories.updateOne);           // Update a category

app.post('/db/categories', categories.createOne);              // Create a new category
app.post('/db/categories/super/:id', categories.addSuper);     // Add 1 or more supercategories to a category
app.post('/db/categories/sub/:id', categories.addSub);         // Add 1 or more subcategories to a category

app.delete('/db/categories/:id', categories.deleteOne);        // Delete a category
app.delete('/db/categories/super/:id', categories.deleteSuper);// Delete 1 or more supercategories from a category
app.delete('/db/categories/sub/:id', categories.deleteSub);    // Delete 1 or more subcategories from a category

/*
app.post('/categories/addSupers/:id', categories.addSupercategories);
app.post('/categories/addSuper/:id', categories.addSupercategory);
app.post('/categories/addSubs/:id', categories.addSubcategories);
app.post('/categories/addSub/:id', categories.addSubcategory);
app.delete('/categories/deleteSuper/:id/:superId', categories.deleteSupercategory);
app.delete('/categories/deleteSub/:id/:subId', categories.deleteSubcategory);
*/

//Note 
// Add Purchase RESTFul endpoionts with only option which attribute to be populated
// Purchase RESTFul endpoionts 
app.get('/db/purchases', purchases.getAll);            // Get all purchases
app.get('/db/purchases/:id', purchases.getOne);        // Get a specific purchase based on id
app.post('/db/purchases', purchases.createOne);        // Create a new purchase
app.put('/db/purchases/:id', purchases.updateOne);     // Update a purchase
app.delete('/db/purchases/:id', purchases.deleteOne);  // Delete a purchase
