const { Router } = require('express')
const {
    createAnonUser,
    getUserById,
    getUserByUsername
} = require('../../controllers/users')

const route = Router()

route.get('/:id', async (req, res) => {
    let user;

    if (isNaN(parseInt(req.params.id))) {
        // when param is username
        user = await getUserByUsername(req.params.id)
    } else {
        // when param is userid
        user = await getUserById(req.params.id)
    }

    if (user) {
        res.status(200).send(user)
    } else {
        res.status(400).send({
            error: "No such id or username"
        })
    }
})


route.post('/', async (req, res) => {
    const user = await createAnonUser()
    res.status(201).send(user)
})

module.exports = {
    usersRoute: route
}