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

    getWithSuper: function (req, res) {
        Category.find({})
            .populate('supercategories')
            .exec(function (err, categories) {
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
/*
    addSuper: function(req, res){
        //req.body = { values : [ value1, value2, ..., valuen] }
        
        Category.findOneAndUpdate({ _id: req.params.id }, 
            { $push: { supercategories: { $each: req.body.values} } }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            res.json(category);
        });
    },

    addSub: function(req, res){
        // req.body = { values : [ value1, value2, ..., valuen] }
        
        Category.findOne({ _id: req.params.id })
            .exec(function (err, category) {
                if (err) return res.status(400).json(err);
                if (!category) return res.status(404).json();

                Category.updateMany({ _id: { $in: req.body.values }}, 
                    { $push: { supercategories: category._id } }, function (err, subcategories) {
                    if (err) return res.status(400).json(err);
                    if (!subcategories) return res.status(404).json();

                    res.json(subcategories);
                });
        })
    },

    deleteSuper: function(req, res){
        //req.body = { values : [ value1, value2, ..., valuen] }

        Category.findOneAndUpdate({ _id: req.params.id }, 
            { $pull: { supercategories: { $in: req.body.values}  } }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            res.json(category);
        });
    },

    deleteSub: function(req, res){
        // req.body = { values : [ value1, value2, ..., valuen] }

        Category.updateMany({ _id: { $in: req.body.values }}, 
            { $pull: { supercategories: req.params.id } }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            res.json(category);
        });
    }
*/
/*  With checking!
    addSupercategories: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            req.body.ids.forEach(id => {
                Category.findOne({ _id: id}, function (err, supercategory) {
                    if (err) return res.status(400).json(err);
                    if (!category) return res.status(404).json();

                    category.supercategories.push(supercategory._id);
                    supercategory.subcategories.push(category._id);
                    supercategory.save(function (err) {
                        if (err) return res.status(500).json(err);
                    });
                }) 
            });
            category.save(function(err){
                res.json();
            })
        });
    },

    addSubcategories: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            req.body.ids.forEach(id => {
                Category.findOne({ _id: id}, function (err, subcategory) {
                    if (err) return res.status(400).json(err);
                    if (!subcategory) return res.status(404).json();

                    category.subcategories.push(subcategory._id);
                    subcategory.supercategories.push(category._id);
                    subcategory.save(function (err) {
                        if (err) return res.status(500).json(err);
                    });
                }) 
            });
            category.save(function(err){
                res.json();
            })
        });
    },

    addSupercategory: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            Category.findOne({ _id: req.body.id}, function (err, supercategory) {
                if (err) return res.status(400).json(err);
                if (!supercategory) return res.status(404).json();

                supercategory.subcategories.push(category._id);
                supercategory.save(function (err) {
                    if (err) return res.status(500).json(err);

                    category.supercategories.push(supercategory._id);
                    category.save(function(err){
                        res.json();
                    })
                });
            }) 
        });
    },

    addSubcategory: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            Category.findOne({ _id: req.body.id}, function (err, subcategory) {
                if (err) return res.status(400).json(err);
                if (!subcategory) return res.status(404).json();

                subcategory.supercategories.push(category._id);
                subcategory.save(function (err) {
                    if (err) return res.status(500).json(err);
                    category.subcategories.push(subcategory._id);
                    category.save(function(err){
                        res.json();
                    })
                });
            }) 
        });
    },

    deleteSupercategory: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            for (let i = 0; i < category.supercategories.length; i++){
                if (category.supercategories[i] == req.params.superId){
                    superId = category.supercategories.splice(i, 1);

                    category.save(function (err) {
                        if (err) return res.status(500).json(err);

                        Category.findOne({ _id: superId }, function (err, supercategory) {
                            if (err) return res.status(400).json(err);
                            if (!supercategory) return res.status(404).json();

                            for (let j = 0; j < supercategory.subcategories.length; j++){
                                if (supercategory.subcategories[j] == req.params.id){
                                    supercategories.splice(j, 1)
                                    supercategory.save(function (err) {
                                        if (err) return res.status(500).json(err);
                
                                    });
                                }
                            }
                        });
                    });
                }
            }
        });
    },
    
    deleteSubcategory: function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) return res.status(400).json(err);
            if (!category) return res.status(404).json();

            for (let i = 0; i < category.subcategories.length; i++){
                if (category.subcategories[i] == req.params.subId){
                    subId = category.subcategories.splice(i, 1);

                    category.save(function (err) {
                        if (err) return res.status(500).json(err);

                        Category.findOne({ _id: superId }, function (err, subcategory) {
                            if (err) return res.status(400).json(err);
                            if (!subcategory) return res.status(404).json();

                            for (let j = 0; j < subcategory.supercategories.length; j++){
                                if (subcategory.supercategories[j] == req.params.id){
                                    subcategories.splice(j, 1)
                                    subcategory.save(function (err) {
                                        if (err) return res.status(500).json(err);
                
                                    });
                                }
                            }
                        });
                    });
                }
            }
        });
    },
*/
};