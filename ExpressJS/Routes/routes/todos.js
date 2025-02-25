// routes are basically we are creating middleware functions in different files for different categories (eg. students and teachers data)

const route = require('express').Router()

let todos = []

route.get('/', (req,res) => {
    res.send(todos)
})

route.post('/', (req,res) => {
    todos.push({
        task: req.body.task
    })
    res.send(todos)
})
module.exports = route