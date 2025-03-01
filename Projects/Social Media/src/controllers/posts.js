const { Posts, Users } = require('../db/models')

async function createNewPost(userId, title, body) {
    const post = await Posts.create({
        title: title,
        body: body,
        userId: userId
    })

    return post
}


/**
 * findAllPosts({username: ''})
 * findAllPosts({title: ''})
 */
async function findAllPosts(query) {
    // TODO: Handle query params
    const posts = await Posts.findAll({
        include: [Users]                    // this is valid only when we have defined relation between the tables beforehand
    })
    return posts
}

module.exports = {
    createNewPost,
    findAllPosts
}

// // // Test Code
// async function task() {
//     console.log(await createNewPost(1, "This is a sample post", "Body of Post goes here")),
//         console.log(await createNewPost(2, "This is another sample post", "Some body example here also"))

//     const posts = await showAllPosts()
//     for (let p of posts) {
//         console.log(`${p.title}\nauthor:${p.user.username}\n${p.body}\n=======\n`)
//     }
// }
// task()