const express = require('express')

const app = express()       // this creates a server

app.use(express.urlencoded({extended: true}))       // this will enable the parsing of the body if it is url encoded (there are many other ways of encoding like file, json, etc. and we can parse them using different methods)

app.get("/", (req, res) => {                    // GET methods only have URL
    res.send("<h1>Hello World</h1>")
})

app.get("/greet", (req, res) => {        // req => request parameters , res => response
    let person = 'Guest'
    if (req.query.person)
        person = req.query.person       // query basically gives the input paramas (eg.=> https://localhost:4444/great?person=Divyansh than this will print Good Morning! Divyansh , otherwise if https://localhost:4444/great) than it will print Good Morning! Guest)
    res.send("Good Morning! " + person)
})

app.post("/greet", (req, res) => {        // POST method
    let person = 'Guest'
    if (req.body.person)                  // this will provide us with the params in the body (if not done the urlencoded step, then this will return undefined)
        person = req.body.person       
    res.send("Good Evening! " + person)
})

app.get("/:city/:greeting", (req,res) => {        // :city makes it params (path Parameters) that is anything can be written there and we can also read that value
    res.send(req.params.greeting + " to " + req.params.city + "!")
})

app.get("/form", (req, res) => {
    res.sendFile(__dirname + '/files/form.html')     // to send html file (good practice to save html files in a files folder)
})

function middleware1 (req,res,next) {       // a function that is automatically triggered by a request and sends response or calls another function is called middleware or handler functions
    console.log(req.url)
    next()                                  // we are calling middleware2
}
function middleware2 (req,res,next) {       // a function that is automatically triggered by a request and sends response or calls another function is called middleware or handler functions
    console.log(req.url)

    res.send('Random')
}
app.get('/x',middleware1,middleware2)       // both middleware functions are passed. next() in middleware1 function will make it to go in middleware2 function


// we are mounting public folder on a particluar path (here xyz)
app.use('/xyz', express.static(__dirname + "/public"))      // means whenever /xyz will be visited then server will respond with files in public (public contains that are visible publicaly like html, etc.)
// by default index.html file from that folder will open if present, otherwise error. (otherwise we will have to type the file name in the url)


app.listen(4444, () => {           // this activates the server. pick a port number greater then 1024 (0 to 1024 ports are reserved)
    console.log("Server started on http://localhost:4444")      // 127.0.0.1:4444 (this will return with the same as this is local host) (my ip address from wifi network can be taken and then do IP:4444 that will also open this)
})       