const mocha = require('mocha')
const expect = require('chai').expect
const request = require('request')
const { app } = require('../server')
let server;

describe('server', () => {

    before((done) => {                                                          // runs before the testcases and checks whether the server is running or not
        server = app.listen(2222, done)
    })

    it('rates should be correct', (done) => {                               // without done, this is a async function
        request.get('http://localhost:2222/rate', (err, resp, body) => {
            let rates = JSON.parse(body)
            expect(rates.fixed).to.equal(50)
            expect(rates.perKm).to.equal(10)
            done()
        })
    })

    after((done) => { // after all the tests are run, we stop the server
        if (server) {
            server.close(done);
        } else {
            done();
        }
    })
})