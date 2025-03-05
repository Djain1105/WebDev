const http = require('http')
const express = require('express')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

// making map of users to enable password protection
let users = {
    'arnav': 'agag123'      // users will be created as name as key and password as value
}
let socketMap = {}

io.on('connection', (socket) => {
    console.log("connected with socket id = ", socket.id)

    function login(s, u) {
        s.join(u)
        s.emit('logged_in')
        socketMap[s.id] = u
    }

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login_failed')
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)
        }
    })

    socket.on('msg_send', (data) => {
        data.from = socketMap[socket.id]                    // getting who is sending the message from server makes it more authentic and secure.

        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)           // this is called creating room in io. this will enable the functionallity of sending messages to a particular user only
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })

})

app.use('/', express.static(__dirname + '/public'))


server.listen(3344, () => {
    console.log("Started on: http://localhost:3344")
})