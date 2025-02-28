const http = require('http')                                // socket require server on http
const express = require('express')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)                     // creating http server out of my express app
const io = socketio(server)

io.on('connection', (socket) => {
    console.log("connected with socket id = ", socket.id)   // everytime we open the server, new socket id will get created for each instance

    socket.on('btnBoom', () => {                            // sending something to server from client
        console.log("Boom received on ", socket.id)
    })

    setInterval(() => {                                     // sending something automatically from server to client
        socket.emit('whizz')
    }, 2000);
})

app.use('/', express.static(__dirname + '/public'))      // first parameter '/', means we are making public folder available on root path


server.listen(3344, () => {
    console.log("Started on: http://localhost:3344")
})