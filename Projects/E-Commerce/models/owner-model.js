const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    picture: String,
    gstin: String,
    products: [],   
})

module.exports = mongoose.model("owner", ownerSchema)

