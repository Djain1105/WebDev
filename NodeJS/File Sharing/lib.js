function awesomeFunction() {
    console.log("OMG! this is awesome")
}

module.exports = {          // creating a global variable to esport the objects
    awesomeFunction
}

// We can also do like
module.exports.awesomeFunction = awesomeFunction()  
// in the memory, module.exports already exists as empty object.
// so if if do module.exports = than this will make new object and we will not able to achieve circular import functionality
// but if we use . notation to add content in module.exports, than we will be able to achieve circular functionality 
// Circular functionality => calling require from 1 file to 2 and from 2 file to 1