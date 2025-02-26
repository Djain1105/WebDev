const {db, Student} = require('./model')

// Adding Student to db using async and await
const task = async() => {
    try {
        await db.sync()     // we use await with steps where we know that there needs to be SQL query run

        // Inserting Students
        for (let i=0; i <30; i++) {
            await Student.create({      //use .bulkCreate([ in this array, pass objects to be inserted])
                name: (['Tom', 'Dick', 'Harry', 'Ram', 'Shyam', 'Nancy', 'Shalini', 'Neha', 'Thomas', 'Sweta'])[parseInt(Math.random()*10)],
                age: 10 + parseInt(Math.random()*10)
            })
        }

    } catch (e){
        console.error(e)
    }
}

task();