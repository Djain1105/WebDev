const path = require('path')    // to use path

const express = require('express')
const { title } = require('process')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))     // to ensure it is taking right views folder

let tasks = ['sample taks']      // variable that stores the tasks at a instance of server (if server is restarted than the variable is created again so the previous saved are destroyed)

app.get('/', (req, res) => {

    // // one way of doing 

    // let takslist = tasks.map(t => `<li>${t}</li>`).join("\n")
    // res.send(`               
    //     <html>
    //     <body>
    //         <form action = "/" method = "POST">
    //         <input name="newTask" type="Text">
    //         <button type="submit">ADD</button>
    //         </form>
    //         <ul>
    //             ${takslist}
    //         </ul>
    //     </body></html>`)


    // other way is using the HBS file we created
    res.render("home", { 
        title: 'ToDo List',
        tasks })
})

app.post('/', (req, res) => {
    tasks.push(req.body.newTask)
    res.redirect('/')       // this will send new GET request
})

app.listen(5555, () => {
    console.log("started")
})