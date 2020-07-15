const mongoose = require('mongoose');

const Store = require('../models/store');

module.exports = {

    getAll: function (req, res) {
        Store.find({}, function (err, stores) {
                if (err) return res.status(400).json(err);
                if (!stores) return res.status(404).json();
                res.json(stores);
            });
    },

    createOne: function (req, res) {
        let newStoreDetails = req.body;
        newStoreDetails._id = new mongoose.Types.ObjectId();

        let store = new Store(newStoreDetails);
        store.save(function (err) {
            res.json(store);
        });
    },

    getOne: function (req, res) {
        Store.findOne({ _id: req.params.id })
            .exec(function (err, store) {
                if (err) return res.status(400).json(err);
                if (!store) return res.status(404).json();
                res.json(store);
            });
    },

    updateOne: function (req, res) {
        Store.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, store) {
            if (err) return res.status(400).json(err);
            if (!store) return res.status(404).json();

            res.json(store);
        });
    },


    deleteOne: function (req, res) {
        Store.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
};