const express = require('express')
const session = require('express-session')
const multer = require('multer')                   // library to upload files from user end
const fs = require('fs').promises                   // used to move the file (promise based function)

const { db, Users } = require('./db')
const app = express()
const upload = multer({ dest: 'uploads/' })           // creating a uplaod object using multer and providing it the folder destination to save files
// uploads folder is just temporary folder, final files will get saved in images
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'))

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '2j34lk235h2l3j42j5h23lj4l2'            // any random string
}))

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', upload.single('avatar'), async (req, res) => {          // upload.single (upload is the object created using multer) is middlware and used when only one file is uploaded

    console.log(req.file)                                                   // use req.file to access elements of the file
    const oldPath = __dirname + '/uploads/' + req.file.filename
    const newPath = __dirname + '/images/' + 'avatar_' + req.body.username + '.' + req.file.mimetype.split('/').pop()       // we are using mimetype to get file type

    await fs.rename(oldPath, newPath)        // moving file to new path using fs

    const user = await Users.create({
        username: req.body.username,
        password: req.body.password,        // NOTE: in production we save hash of password
        email: req.body.email,
        avatar: '/images/' + 'avatar_' + req.body.username + '.' + req.file.mimetype.split('/').pop()       // we are not saving files in the database, they are getting saved in a folder, and we are saving their path as strings in the database
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