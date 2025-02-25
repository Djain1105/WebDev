let txtCode = document.getElementById("txtCode")
let inpCode = document.getElementById("inpCode")
let btnEncode = document.getElementById("btnEncode")
let btnEval = document.getElementById("btnEval")
let btnEncrypt = document.getElementById("btnEncrypt")

function dataEncode(data) {
    return btoa(data)           // base64 encoding
}

function dataEncrypt(data) {
    // convert all lowercase letters to uppercase and vice vers
    let data_encrypt = data.split('')
        .map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
        .join('');
    return data_encrypt
}

btnEncode.onclick = function () {
    inpCode.value = dataEncode(txtCode.value)
}

btnEncrypt.onclick = function () {
    inpCode.value = dataEncrypt(inpCode.value)
}
