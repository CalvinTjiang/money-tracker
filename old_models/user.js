const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    balance: {
        validate: {
            validator: function (newBalance) {
                if (Number.isInteger(newBalance))
                    return true;
                else return false
            },
            message: 'Incorrect type: balance should be integer!'
        },
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('user', userSchema, 'user');