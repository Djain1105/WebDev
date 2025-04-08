## Logging messages at console

`npm i debug`

In mongoose connection file:
`const dbgr = require('debug')("development:mongoose")`

set up the environment variable:
`$env:DEBUG="development:*"`

this will print all the messages on console when code is in development phase

## Setting up mongodb uri

we can use this for taking up environment variables or using dotenv

`npm i config`

and then we make a new file in config folder named `development.json`
config will automatically detect the environment (development or production) and then will take the variable accordingly

## Making some routes available in development only

we can set environment variable to development
`$env:NODE_ENV="development"`

## dotenv

we can use this for taking up environment variables or using config.get

`npm i dotenv`

in app.js do `require('dotenv').config()`
