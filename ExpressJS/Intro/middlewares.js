const express = require('express')

const app = express()

function m1(req, res, next) {       // even after next, the statements are executed of the middleware functions 
    console.log("m1 pre-next")      // can be used where like we can load the website initially and then use any analytics or data we need to get
    next()                          // Middlewares always come at cost of memory!
    console.log("m1 post-next")
}

function m2(req, res, next) {
    console.log("m2 pre-next")
    next()
    console.log("m2 post-next")
}

function m3(req, res, next) {
    console.log("m3 pre-next")
    next()
    console.log("m3 post-next")
}

app.get('/hello', m1, m2, m3, (req, res) => {
    console.log("pre send")
    res.send("Hello World")
    console.log("post send")
})

app.listen(5432, () => {
    console.log("Server started at: http://localhost:5432")
})