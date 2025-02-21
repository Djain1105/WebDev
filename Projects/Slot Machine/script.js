
let value1 = document.getElementById('value1')
let value2 = document.getElementById('value2')
let value3 = document.getElementById('value3')

let inpSpeed = document.getElementById('inpBox')

let values = ['😊', '😂', '😘', '😁', '😎', '🤢', '😍', '🤔', '😒']

function getRandomValue() {
    return values[Math.floor(Math.random() * 9)]
}

let animationId;
function updateAnimation(newspeed) {
if(animationId) clearInterval(animationId)

animationId = setInterval(() => {                       // setInterval returns ID and completes the task, so here we are clearing the previous animation and then applying the new
            value1.innerText = getRandomValue()
            value2.innerText = getRandomValue()
            value3.innerText = getRandomValue()
            }, 1000 / newspeed);
}

inpSpeed.onchange = function(ev) {

    // document.documentElement => this is :root of CSS
    document.documentElement.style.setProperty('--speed', ev.target.value)      // to change the CSS variable according to the value in the input box
    
    updateAnimation(ev.target.value)
}
