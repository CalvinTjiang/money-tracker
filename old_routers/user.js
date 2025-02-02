const mongoose = require('mongoose');

const User = require('../models/user');
const Purchase = require('../models/purchase');
module.exports = {

    getAll: function (req, res) {
        User.find({}, function (err, users) {
                if (err) return res.status(400).json(err);
                if (!users) return res.status(404).json();
                res.json(users);
            });
    },

    createOne: function (req, res) {
        let newUserDetails = req.body;
        newUserDetails._id = new mongoose.Types.ObjectId();

        let user = new User(newUserDetails);
        user.save(function (err) {
            res.json(user);
        });
    },

    getOne: function (req, res) {
        User.findOne({ _id: req.params.id })
            .exec(function (err, user) {
                if (err) return res.status(400).json(err);
                if (!user) return res.status(404).json();
                res.json(user);
            });
    },

    updateOne: function (req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
            if (err) return res.status(400).json(err);
            if (!user) return res.status(404).json();

            res.json(user);
        });
    },


    deleteOne: function (req, res) {
        User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
            if (err) return res.status(400).json(err);

            Purchase.deleteMany({user : req.params.id}, function(err){
                if (err) return res.status(400).json(err);
                res.json(user); 
            })
        });
    },
};