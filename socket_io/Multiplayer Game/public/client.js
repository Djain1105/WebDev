let socket = io()

socket.on('connect', () => {
    document.getElementById('socketId').innerText = socket.id
})

function colorTheBox(color) {
    document.querySelector('.' + color).style.backgroundColor = color       // query selector is use to select elements just like jquery
    setTimeout(() => {
        document.querySelector('.' + color).style.backgroundColor = null
    }, 500);
}

document.getElementById('colorIt').onclick = function () {
    const color = document.getElementById('selectedColor').value

    socket.emit('colorit', { color })                                       // in the emit, the event name along with any data is passed 
}

socket.on('colorit', (data) => {                                            // at client side, if we receive any event of specified name, then do as specified
    colorTheBox(data.color)
})