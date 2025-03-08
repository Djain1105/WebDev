const express = require('express')
const session = require('express-session')
const { db, Users } = require('./db')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '2j34lk235h2l3j42j5h23lj4l2'            // any random string
}))

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const user = await Users.create({
        username: req.body.username,
        password: req.body.password,        // NOTE: in production we save hash of password
        email: req.body.email
    })

    res.status(201).send(`User ${user.id} created`)
})

// hash of password (we use md5 for hashing the password)
// hash of a string will always provide same value for same string and different value for different string
// but for 2 strings, its possible they have same hash
// there is no such thing like reverse hash, so saving passwords using hash provides more security
// there are rainbow tables which have hashes for common passwords, thats why its advised to use strong passwords
// we can do password encryption (adding any random string) and then hashing to avoid this rainbow table loophole

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const user = await Users.findOne({ where: { username: req.body.username } })

    if (!user) {
        return res.status(404).render('login', { error: 'No such username found' })
    }

    if (user.password != req.body.password) {
        return res.status(401).render('login', { error: 'Incorrect Password' })
    }
    req.session.userId = user.id                                // using cookies to save the userid
    res.redirect('/profile')
})

app.get('/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login')
    }
    const user = await Users.findByPk(req.session.userId)       // using cookies, finding data from db
    res.render('profile', { user })
})

app.get('/logout', (req, res) => {
    req.session.userId = null                                   // we can also do re.session.destroy, but then we will not be able to track other users using the same computer
    res.redirect('/login')
})

db.sync()
    .then(() => {
        app.listen(2222, () => console.log('Server started on: http://localhost:2222'))
    })
    .catch(console.error)