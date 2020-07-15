const mongoose = require('mongoose');

const Category = require('../models/category');

module.exports = {
    getAll: function (req, res) {
        Category.find({}, function (err, categories) {
                if (err) return res.status(400).json(err);
                if (!categories) return res.status(404).json();
                res.json(categories);
            });
    },

    createOne: function (req, res) {
        let newCategoryDetails = req.body;
        newCategoryDetails._id = new mongoose.Types.ObjectId();

        let category = new Category(newCategoryDetails);
        category.save(function (err) {
            res.json(category);
        });
    },

    getOne: function (req, res) {
        Category.findOne({ _id: req.params.id })
            .exec(function (err, category) {
                if (err) return res.status(400).json(err);
                if (!category) return res.status(404).json();
                res.json(category);
            });
    },

    updateOne: function (req, res) {
        Category.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            res.json(category);
        });
    },


    deleteOne: function (req, res) {
        Category.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
};