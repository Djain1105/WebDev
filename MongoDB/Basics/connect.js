const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tododb';

// Async IFFE
(async () => {

    const client = await MongoClient.connect(MONGO_URL)     // this creates a client
    const tododb = client.db(DB_NAME)                        // if there is a database of name DB_NAME (here tododb) than this will give access to it, otherwise it will create a new db and then give access to it

    console.log(tododb)

})()

