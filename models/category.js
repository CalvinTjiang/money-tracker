const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    supercategories : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
    /*subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }]*/
});
module.exports = mongoose.model('category', categorySchema, 'category');