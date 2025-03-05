let socket = io()

// socket.emit will send the data to current socket only
// io.emit will send the data to all the sockets
// socket.broadcast.emit will send the data to all the sockets except the current one

$('#loginBox').show()
$('#chatBox').hide()

let username;

$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPass').val()
    })
})

socket.on('logged_in', (data) => {
    $('#loginBox').hide()
    $('#chatBox').show()
})

socket.on('login_failed', () => {
    window.alert("Username or Password Wrong")
})

$('#btnSend').click(() => {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd', (data) => {
    $('#ulMsgs').append($('<li>').text(
        `[${data.from}]: ${data.msg}`
    ))
})