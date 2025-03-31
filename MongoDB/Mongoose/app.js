const express = require('express')
const app = express()

const userModel = require('./userModel')

app.get('/', (req, res) => {
    res.send("Hey")
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "divyansh",
        userName: "devil",
        email: "d@gmail.com"
    })

    res.send(createdUser)
})

app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({ name: "divyansh" }, { name: "divyansh Jain" }, { new: true })

    res.send(updatedUser)
})

app.get('/read', async (req, res) => {
    let users = await userModel.find()

    res.send(users)
})

app.get('/readOne', async (req, res) => {
    let users = await userModel.find({ name: "divyansh Jain" })

    res.send(users)
})

app.get('/delete', async (req, res) => {
    let users = await userModel.findOneAndDelete({ name: "divyansh Jain" })

    res.send(users)
})

app.listen(3000, () => {
    console.log("Server started on: http://localhost:3000")
})