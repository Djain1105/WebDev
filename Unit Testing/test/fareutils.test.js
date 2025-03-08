const mocha = require('mocha')
const chai = require('chai')
const fareutils = require('../fareutils')

const expect = chai.expect

describe('fareUtils', function () {

    it('expect fare to be 50 for 0km, 0min', () => {        // describing the test
        let fare = fareutils.calcFare(0, 0)
        expect(fare).to.equal(50)
    })


    it('expect fare to be 100 for 10km, 0min', () => {        
        let fare = fareutils.calcFare(10, 0)
        expect(fare).to.equal(100)
    })

//  if we will not describe this test, then the fare calculation using minutes line will remain yellow in the coverage
    it('expect fare to be 56 for 2km, 18min', () => {        
        let fare = fareutils.calcFare(2, 18)
        expect(fare).to.equal(56)
    })
})

// Running the test:
// just put all the files in the test folder
// and in package.json write mocha in test field. this will run all the tests describe in the file
// the npm command for running the test is `npm run test`