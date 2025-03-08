const express = require('express')
const path = require('path')
const app = express()
const fareUtils = require('./fareutils')

app.use('/', express.static(path.join(__dirname, 'public_static')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/calcfare', (req, res) => {
    let km = parseFloat(req.body.km)
    let min = parseInt(req.body.min)

    let fare = fareUtils.calcFare(km, min)
    res.send({ fare: fare })
})

app.get('/rate', (req, res) => {
    res.send(fareUtils.rate)
})

exports = module.exports = { app }