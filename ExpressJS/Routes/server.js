const express = require('express')
const app = express()
const todoRoute = require('./routes/todos')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(__dirname + "/public"))

app.use('/todos', todoRoute)

app.listen(4343, () => {
    console.log("Server started at: http://localhost:4343")
})