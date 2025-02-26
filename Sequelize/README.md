# DATABASES: Sequelize Basics

## Setting Up Database

Opening MYSQL shell 
type in command prompt : ```mysql -u root -p```   (root is the default user and -p to enter the password in the next step)

In the MYSQL shell: create database, user and grant rights

``` CREATE DATABASE sampledb1;      (sampledb1 is the name of database to be created)
    CREATE USER sampleuser1 IDENTIFIED BY 'samplepass1';    (sampluser1 & samplepass1 are name & password of user respectively)
    GRANT ALL PRIVILEGES ON sampledb1.* TO sampleuser1;
    flush privileges;
```

## To install sequelize do in terminal (in VS Code)
```npm init```
```npm install sequelize mysql2```

## Connecting with the database using Sequelize
Open a JS File and write as:

const Sequelize = require('sequelize')

const db = new Sequelize('sampledb1', 'sampleuser1', 'samplepass1', {       (DB name, user name, user pass)
    host: 'localhost',
    dialect: 'mysql'       (tells which kind of sql we're using)
})

to check if db is working correctly:
db.authenticate()
.then(() => console.log("Connection Worked"))
.catch((err) => console.log(err))

## Order of files:
connect => model => insert => query