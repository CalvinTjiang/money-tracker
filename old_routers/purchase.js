const mongoose = require('mongoose');

const Purchase = require('../models/purchase');
const User = require('../models/user');

module.exports = {
    getAll: function (req, res) {
        Purchase.find({})
            .populate('store', 'name')
            .populate('category', 'name')
            .populate('user', { name:1, balance:1 })
            .sort({date : -1})
            .exec(function (err, purchases) {
                if (err) return res.status(400).json(err);
                if (!purchases) return res.status(404).json();
                res.json(purchases);
            });
    },

    createOne: function (req, res) {
        let newPurchaseDetails = req.body;
        newPurchaseDetails._id = new mongoose.Types.ObjectId();

        let purchase = new Purchase(newPurchaseDetails);
        purchase.save(function (err) {
            User.findOneAndUpdate({ _id: newPurchaseDetails.user }, {$inc: {balance :newPurchaseDetails.income - newPurchaseDetails.outcome }}, function (err, user) {
                if (err) return res.status(400).json(err);
                if (!user) return res.status(404).json();
    
                res.json(purchase);
            });
        });
    },

    getOne: function (req, res) {
        Purchase.findOne({ _id: req.params.id })
            .exec(function (err, purchase) {
                if (err) return res.status(400).json(err);
                if (!purchase) return res.status(404).json();
                res.json(purchase);
            });
    },

    updateOne: function (req, res) {
        Purchase.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, purchase) {
            if (err) return res.status(400).json(err);
            if (!purchase) return res.status(404).json();
            let difference = 0;
            if (req.body.income != null){
                difference += req.body.income - purchase.income;
            }
            if (req.body.outcome != null){
                difference -= req.body.outcome - purchase.outcome;
            }
            if (difference != 0){
                User.findOneAndUpdate({ _id: purchase.user }, {$inc: {balance :difference}}, function (err, user) {
                    if (err) return res.status(400).json(err);
                    if (!user) return res.status(404).json();
        
                    res.json(purchase);
                });
            }
        });
    },

    deleteOne: function (req, res) {
        Purchase.findOneAndRemove({ _id: req.params.id }, function (err, purchase) {
            if (err) return res.status(400).json(err);
            User.findOneAndUpdate({ _id: purchase.user }, {$inc: {balance :purchase.outcome - purchase.income }}, function (err, user) {
                if (err) return res.status(400).json(err);
                if (!user) return res.status(404).json();
    
                res.json(purchase);
            });
        });
    },

    updateCategory: function (req, res){
        Purchase.updateMany({ category: req.params.id}, { category: req.body.id}, function (err){
            if (err) return res.status(400).json(err);
            res.json();
        })
    },

    updateStore: function (req, res){
        Purchase.updateMany({ store: req.params.id}, { store: req.body.id}, function (err){
            if (err) return res.status(400).json(err);
            res.json();
        })
    }
};