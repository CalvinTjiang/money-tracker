const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    },
    paymentType: {
        type: String,
        required: true
    },
    outcome: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    memo: String,

});
module.exports = mongoose.model('purchase', purchaseSchema, 'purchase');