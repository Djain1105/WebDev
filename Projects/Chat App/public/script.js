let socket = io()

let btnSend = document.getElementById('btnSend')
let inpMsg = document.getElementById('inpMsg')
let ulMsgList = document.getElementById('ulMsgList')

// socket.emit will send the data to current socket only
// io.emit will send the data to all the sockets
// socket.broadcast.emit will send the data to all the sockets except the current one

btnSend.onclick = function() {
    socket.emit('msg_send', {
        msg: inpMsg.value
    })
    inpMsg.value = ""
}

socket.on('msg_rcvd', (data) => {
    let liNewMsg = document.createElement('li')
    liNewMsg.innerText = data.msg
    ulMsgList.appendChild(liNewMsg)
})