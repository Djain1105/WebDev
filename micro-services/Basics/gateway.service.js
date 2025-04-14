// now this will be run on a different laptop (the gateway) and will forward the requests to the other two services

const express = require('express')
const app = express();
const proxy = require('express-http-proxy');

// we can do port forwarding if using different laptops (set the port visibility to public)
// (because localhost will always mean the laptop from which this file would run)

app.use('/stress-test', proxy('http://localhost:3002'))
app.use('/', proxy('http://localhost:3001'))            // currently running on my laptop only, so no forwarding used

app.listen(3000, () => {
    console.log('Gateway is running on http://localhost:3000')
})