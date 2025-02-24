// JS is a Interpreter Language
// REPL - Read, Evaluate, Print, Loop (each line is executed one by one)
// C++ is compiled first and then executed so do not have REPL

c = 20;      // Global Variable
var d = 30;  // Function Scope
let e = 50;  // Block Scope

console.log(e);

// Arrays
let arr = ["Apple", "Banana", "Mango"]
console.log(arr);


arr.push("Banana");  // Insert at Back
arr.pop();           // remove from Back
arr.shift();         // remove from Front
arr.unshift("Kiwi"); // Insert at Front
arr.indexOf("Kiwi"); // to find the index of an element

// Loops
for(let i=0; i<arr.length; i++) {
    console.log(arr[i]);
};

// OOPS
// JS allows to create objects without defining the class
var bird = {
    x: 100,
    y: 20,
    color: "blue",
    eggs: [1,2,3,4],
};

console.log(bird.eggs)
alert("Hey There!") // displays a alert dialog box on the screen


// Another way of creating JS Objects
function Fruit(taste,color) {
    this.color = color;
    this.taste = taste;
}

let mango = new Fruit("sweet", "yellow");
console.log(mango.taste)

// Using Class Keyword

class FruitClass {
    constructor(taste,color) {
        this.color = color;
        this.taste = taste;
    }
};

let Kiwi = new FruitClass("sour", "green");

class Fruits extends FruitClass {
    constructor(color, taste, quantity) {
        super(taste, color)
        this.quantity = quantity
    }
}


setTimeout(() => {
    // this thing will happen after 1000 milli seconds
}, 1000);


// Using Promises

let wait = function(timeout) {
    
    if(isNaN(parseInt(timeout))) {
        reject(new Error('Timeout should be a number'))
    }

    return new Promise((resolve, reject) => {
        console.log("Started to wait")
        setTimeout(function() {
            console.log("Waited")
            resolve();
        }, timeout)
    })
}   

wait(1000)
    .then(() => {                       // resolve fulfilled then this
        console.log("After Waiting")
    })
    .catch((err) => {                   // if error then this 
        console.error(err)
    })
