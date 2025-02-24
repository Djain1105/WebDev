const fs = require('fs')        // check different API's (inbuild library) available in JS on google

fs.writeFile(__dirname + '/myfile.txt', "some data", function(err) {     // if just written 'myfile.txt' then the file be made from where the 'node' wil be called. dirname will save it in our folder
    if(err) throw err           // if error then 'throw' will crash the program

    console.log("fie was written")
})