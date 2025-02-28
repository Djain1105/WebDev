let socket = io()

let btnBoom = document.getElementById('btnBoom')

btnBoom.onclick = function () {
    socket.emit('btnBoom')
}

socket.on('whizz', () => {
    let div = document.createElement('div')
    div.innerText = 'whizz'
    document.body.appendChild(div)
})