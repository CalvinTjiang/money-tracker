const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    memo: {
        type: String
    }
});
module.exports = mongoose.model('category', categorySchema, 'category');