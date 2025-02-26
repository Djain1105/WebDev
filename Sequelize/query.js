const { db, Student } = require('./model')

const task = async () => {
    try {
        await db.sync()

        const students = await Student.findAll({    // here we can add all the query parameters
            where: {
                age: {
                    $or: {
                        $lt: 12,                    // ages less than 12 and greater than 18
                        $gt: 18
                    }
                }
            },
            order: [
                ['age', 'DESC'],
                ['name', 'ASC']
            ]
        })

        students.forEach((student) => {
            console.log(
                `name: ${student.dataValues.name} \t\t age: ${student.dataValues.age}`)
        });
    } catch (e) {
        console.error(e)
    }
}

task();