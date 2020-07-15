const mongoose = require('mongoose');

const Purchase = require('../models/purchase');

module.exports = {
    getAll: function (req, res) {
        let query = {};
        if (req.query.year !== undefined && req.query.month !== undefined){
            let minDate = new Date(req.query.year, req.query.month);
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

                let modifiedDB = [];
                if (req.query.groupBy === "Category"){
                    purchases.forEach((purchase) => {
                        let id = purchase.category._id;
                        if (modifiedDB.length === 0 || modifiedDB[modifiedDB.length - 1].category.id !== id) {
                            modifiedDB.push({
                                category: {
                                    id: id,
                                    icon: purchase.category.icon,
                                    name: purchase.category.name
                                },
                                income: 0,
                                expenses: 0,
                                purchases: []
                            })
                        }
                        let index = modifiedDB.length - 1;
                        if (purchase.isExpense) {
                            modifiedDB[index].expenses += purchase.amount;
                        } else {
                            modifiedDB[index].income += purchase.amount;
                        }
                        modifiedDB[index].purchases.push(purchase)
                    });                    
                    res.json(modifiedDB);
                } else if (req.query.groupBy === "Date"){
                    purchases.forEach((purchase)=>{
                        let date = new Date(purchase.date);
                        if (modifiedDB.length === 0 || modifiedDB[modifiedDB.length - 1].date.day !== date.getDate()) {
                            modifiedDB.push({
                                date: {
                                    day: date.getDate(),
                                    month: date.getMonth(),
                                    year: date.getFullYear()
                                },
                                income: 0,
                                expenses: 0,
                                purchases: []
                            })
                        }
                        let index = modifiedDB.length - 1;    
                        if (purchase.isExpense){
                            modifiedDB[index].expenses += purchase.amount;
                        } else {
                            modifiedDB[index].income += purchase.amount;
                        }
                        modifiedDB[index].purchases.push(purchase)
                    });    
                    res.json(modifiedDB);
                }
                else {
                    res.json(purchases);
                }
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