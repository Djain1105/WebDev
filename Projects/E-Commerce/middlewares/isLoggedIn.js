const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        // the error created here using the method below helps us access the error message at other routes also
        req.flash("error", "You need to login first!")
        return res.redirect('/')
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)

        // when we are finding the user, then we will be able to get all the details of user
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password")                   // here we will ensure that we're not getting the password
        req.user = user
        next()
    } catch (err) {
        req.flash("error", "something went wrong")
        res.redirect('/')
    }
}