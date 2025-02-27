// Check Sequelize documentation to learn more

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const {db} = require('./connect')

const Student = db.define('student', {     // to create a table // first parameter of define is the name of the table
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        default: -1
    }
})

module.exports = {      // using it in insert.js
    db, Student
}

db.sync()               // if we are changing properties (like adding columns, etc.) for existing tables, than do as db.sync({alter: true})
    .then(() => console.log("DB Synchronized"))
    .catch(console.error)