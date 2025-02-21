document         // refers to entire page
document.body   // refers to body of the document

document.getElementsByTagName('p')          // will give array of elements with p tag (basically paragraph elements)
document.getElementsByClassName('para')     // will give array of elements with class para
document.getElementById('inpbox')           // will give access to that particular element

let p2 = document.getElementsByClassName('para')[1]     // this will return the second element from the array
p2.innerText    // This is another para (returns what is written inside the p tags)
p2.innerHTML    // This is <b>another</b> para (returns the inner html)
p2.outerHTML    // returns the whole html of the p tag

p2.innerText = "this is another new para"           // changes the text
p2.innerHTML = "this is another <b>new</b> para"    // new will become bold here

p2.getAttribute('class')    // will provide the class
p2.getAttribute('id')       // will provide the id

p2.setAttribute('contenteditable',true)

let i = document.getElementById('inpbox')   
i.value                             // to get what is written in the input box
i.setAttribute('type', 'email')     // to change the input type to email
i.validity                          // gives different properties with values as true or false

let btn = document.getElementById('btn')
