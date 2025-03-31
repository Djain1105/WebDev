const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/mongoPractice`)

const userSchema = mongoose.Schema({
    name: String,
    userName: String,
    email: String,
})
const userModel = mongoose.model("user", userSchema)

module.exports = userModel
