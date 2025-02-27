const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

const db = new Sequelize('shopdb', 'shopper', 'shoppass', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {                                 // Optional. used to define max and min number of users (defining higher max users will consume greater ram but will execute queries faster)
        min: 0,
        max: 5
    }
})

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Product = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufacturer: DataTypes.STRING,              // if only 1 property needs to be defined than we can do it directly
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
})

db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((error) => console.error("Error creating Database"))

exports = module.exports = {
    User, Product
}