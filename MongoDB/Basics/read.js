const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tododb';

async function readTasks() {
    const client = await MongoClient.connect(MONGO_URL)
    const tododb = client.db(DB_NAME)

    const todos = tododb.collection('todos')

    // find returns a cursor (cursor is like cell selected in excel). its like a file pointer in mongoDB
    // find operation with empty object {} means we want to find everything. add anything inside it (query parameters) to add conditions
    const todoArr = await todos.find({priority: {$gt: 1}}).sort({priority: -1}).toArray()                    // use batchSize() to provide how many rows at at time to be shown in the outpus
    // check mongodb query parameters on google for more
    todoArr.forEach((todo) => console.log(JSON.stringify(todo)))

}

readTasks()