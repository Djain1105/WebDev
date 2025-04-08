const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        trim: true
    },
    contact: Number,
    email: String,
    password: String,
    picture: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    orders: [],
})

module.exports = mongoose.model("user", userSchema)

