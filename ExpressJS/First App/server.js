const express = require('express')
const app = express()

app.use('/', express.static(__dirname + "/public"))

// function to decrypt the data
function dataDecrypt(req, res, next) {
    // convert all lowercase letters to uppercase and vice versa

    for (let q in req.query) {
        let data = req.query[q]
        let data_decrypt = data.split('')
            .map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
            .join('');
        req.query[q] = data_decrypt
    }

    next()
}

// function to decode the data
function dataDecode(req, res, next) {
    
    for (let q in req.query) {
        let data = req.query[q]
        let data_decoded = new Buffer(data, 'base64').toString('ascii')
        req.query[q] = data_decoded
    }
    next()
}

function evalutecode (data) {   // function to evaluate code (Never use EVAL() function in code!!!)
    return eval(data)
}

app.get('/eval', dataDecrypt, dataDecode, (req, res) => {
    let codeValue;
    for(let q in req.query) {
        let data = req.query[q]
        codeValue = eval(data)
    }
    res.send("====== " + codeValue + "======")
})


app.listen(5324, () => {
    console.log("Server started at: http://localhost:5324")
})