const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api').route)                  // the folder written in '' will be searched for index.js file to run, that's why we have linked our useres and products file to that


app.listen(2678, () => {
    console.log("Server started at: http://localhost:2678")
})
