const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tododb';

async function writeTask() {            // to add one object
    const client = await MongoClient.connect(MONGO_URL)
    const tododb = client.db(DB_NAME)

    const todos = tododb.collection('todos')
    const todo = {
        task: "an important task",
        priority: 2,
        owner: "manager"
    }
    const result = todos.insertOne(todo)        // each object added will have its own unique id provided automatically
    console.log(result)
}


async function writeTasks() {           // to add multiple objects
    const client = await MongoClient.connect(MONGO_URL)
    const tododb = client.db(DB_NAME)

    const todos = tododb.collection('todos')
    const result = todos.insertMany([           // mongodb collection can have different types of objects in same collection. like if we provide only task and no priority and owner in a object, than that is also valid
        {task: "simple task", priority: 4, owner: "security"},  
        {task: "complicated task", priority: 1, owner: "CEO"},
        {task: "some administrative task", priority: 4, owner: "manager"},
        {task: "extra task", priority: 2, owner: "executive"}
    ])
    console.log(result)
}


// writeTask()
writeTasks()