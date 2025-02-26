const Sequelize = require('sequelize')

const db = new Sequelize('sampledb1', 'sampleuser1', 'samplepass1', {   // DB name, User Name, Password  //never provide the password as here
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {db}

db.authenticate()
    .then(() => console.log("Connection Worked"))
    .catch((err) => console.log(err))