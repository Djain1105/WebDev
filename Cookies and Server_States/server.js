const express = require('express')
const app = express()

// also read statefull and stateless system
// cookies are basically some information stored for future use or identification
// we use express-session when we want the cookies to be stored on server side (preferred as secure). this will only have client id on client side, and all the information tracked will be on the server side
// we use cookies-session when we want the cookies to be stored on client side
const expressSession = require('express-session')

app.set('view engine', 'hbs')

// we initialize the express session before any middleware functions

app.use(expressSession({
    resave: false,                                  // saves the cookies on each client <--> communication. (if true, this will save the cookie again & again on every intialization)
    saveUninitialized: false,                       // if true, it will save cookies even if nothing is tracked
    secret: "some long random string here",         // used to encrypt the cookie
    name: "any name"                                // used to change the name of the cookie (by default the name is connect.sid)
}))


app.get('/', (req, res) => {
    console.log(req.session)                        // this will give output if we have defined the cookies otherwise this will give undefined

    if (!req.session.visits) req.session.visits = 1
    else req.session.visits++
    res.render('index', { count: +(req.session.visits) })       // + will print 1 if there is no visit (or 0)
})

app.listen(9876, () => {
    console.log("Server started on: http://localhost:9876")
})