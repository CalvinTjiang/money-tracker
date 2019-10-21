const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('store', storeSchema, 'store');