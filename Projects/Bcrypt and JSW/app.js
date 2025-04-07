const express = require('express')
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

// using middleware to make it protected route
app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts')
    res.render('profile', { user })
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user')

    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid)
    }
    else {  // adding the unlike feature by removing the user id from the likes array in posts
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()

    res.redirect('/profile')
})

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user')
    
    res.render('edit', { post })
})

// just clear the cookie and redirect to login
app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect('/login')
})

// Registering the User
app.post('/register', async (req, res) => {
    let { email, password, name, age, username } = req.body

    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send("User already registered");

    // Using bcrypt to get hash of the password 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })

            // Setting the token for session identification
            let token = jwt.sign({ email: email, userid: user._id }, "shhhhh")
            res.cookie('token', token)
            res.send("Registered")
        })
    })
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body

    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send("Something Went Wrong");

    // Checking the entered password with password in db
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhhh")
            res.cookie('token', token)
            res.status(200).redirect('/profile')
        }
        else res.redirect('/login')
    })
})

// post route should also be protected (you can post only when you are logged in)
app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    let { content } = req.body

    let post = await postModel.create({
        user: user._id,
        content,
    })

    // pushing the id of post in post array in usermodel
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, {content: req.body.content})
    
    res.redirect('/profile')
})

// this is a middleware used to create protected routes (like we can provide it in a profile route and then the user will need to login first)
function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.redirect('/login')
    else {
        let data = jwt.verify(req.cookies.token, "shhhhh")
        req.user = data
        next()
    }
}

app.listen(3232, () => {
    console.log("Server started on: https://localhost:3232")
})