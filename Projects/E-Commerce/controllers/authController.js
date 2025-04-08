const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async (req, res) => {
    try {
        // if any of the fields is not provided in frontend, then also the user will get created by undefined
        // so use package JOY to check for this
        let { email, password, fullName } = req.body

        let user = await userModel.findOne({ email })
        if (user) {
            req.flash("error", "you already have an account, please login!")
            return res.redirect('/')
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        fullName,
                        email,
                        password: hash
                    })

                    let token = generateToken(user)
                    res.cookie("token", token)

                    res.send("your account has been created")
                }
            })
        })
    } catch (err) {
        res.send(err.message)
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body

    let user = await userModel.findOne({ email })
    if (!user) {
        req.flash("error", "Email or Password Incorrect!")
        return res.redirect('/')
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.redirect('/shop')
        }
        else {
            req.flash("error", "Email or Password Incorrect!")
            return res.redirect('/')
        }
    })
}

module.exports.logoutUser = (req, res) => {
    res.cookie("token", "")
    res.redirect('/')
}