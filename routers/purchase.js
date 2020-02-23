const mongoose = require('mongoose');

const Purchase = require('../models/purchase');

module.exports = {
    getAll: function (req, res) {
        let query = {};
        if (req.body.year !== undefined && req.body.month !== undefined){
            let minDate = new Date(req.body.year, req.body.month);
            let maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 1);
            if (minDate.getMonth() == 11) {
                maxDate = new Date(minDate.getFullYear() + 1, 0, 1);
            } 
            query = {date: {$gte: minDate, $lt: maxDate}};
        }

        Purchase.find(query)
            .populate('store', { name: 1, icon: 1 })
            .populate('category', { name: 1, icon: 1 })
            .sort({date: -1})
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
            res.json(purchase);
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
            res.json({purchase});
        });
    },

    deleteOne: function (req, res) {
        Purchase.findOneAndRemove({ _id: req.params.id }, function (err, purchase) {
            if (err) return res.status(400).json(err);
            res.json(purchase);
        });
    },
};