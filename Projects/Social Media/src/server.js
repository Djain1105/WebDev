const express = require('express')

const { db } = require('./db/models')
const { usersRoute } = require('./routes/users')
const { postsRoute } = require('./routes/posts')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/', express.static(__dirname + '/public'))

db.sync()               // if we do, db.sync({forced: true}) then the whole database will be cleared
    .then(() => {
        app.listen(8383, () => {
            console.log("Server started on http://localhost:8383")
        })
    })
    .catch((err) => {
        console.error(new Error('Could not start database'))
        console.error(err)
    })