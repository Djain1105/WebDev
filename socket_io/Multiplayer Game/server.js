const http = require('http')                                
const express = require('express')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)                   
const io = socketio(server)

app.use('/', express.static(__dirname + '/public'))   

io.on('connection', (socket) => {
    console.log('connection on ', socket.id)

    socket.on('colorit', (data) => {                    // here we are doing something when we receive any event with the name specified and in the callback function we are getting the data
        io.emit('colorit', data)                        // if we do socket.emit, then the person send the data will receive it. for io.emit, all will receive the data (remember the diagram, io is a part in server so all clients will be connected to it via pipelines)
    })
})   


server.listen(3344, () => {
    console.log("Started on: http://localhost:3344")
})