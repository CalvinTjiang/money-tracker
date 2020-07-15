const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    isExpense: {
        type: Boolean,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    },
    amount: {
        type: Number,
        required: true
    },
    memo: {
        type: String
    }
});
module.exports = mongoose.model('purchase', purchaseSchema, 'purchase');