# Testing and Coverage

## Using Mocha and Chai

`npm install mocha chai`

Running the test:
just put all the files in the test folder (here fareutils.test.js)
and in package.json, write mocha in test field. this will run all the tests describe in the file

the npm command for running the test is:
`npm run test`

## Using nyc for test coverage

`npm install nyc`

In package.json, in scripts write:
"cover": "nyc --reporter=text --reporter=html mocha"

reporter line is optional. 
the html reporter will add coverage folder, and its index.html file opened in browser will provide a complete report
it will contain the files tested (lines in green are tested and yellow ones are not)
use --reporter=lcovonly to see the green and red lines in the ide itself using coverage gutters extension

the npm command for running the test is:
`npm run cover`

this will run nyc which will run mocha

## Testing the server

we will create a app.js file and in package.json, we will write app.js in "start"
just put all the files in the test folder (here server.test.js)

`npm install request`

the npm command for running the test is:
`npm run test`

