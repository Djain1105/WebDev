$(() => {

    $('#navbar').load('../components/navbar.html', loginIfNeeded)       // when the navbar html will be loaded, then only loginIfNeeded function will run (Async Programming)
    $('#footer').load('../components/footer.html')
    $('#content').load('../components/all-posts.html')

})

function loginIfNeeded() {

    window.currentUser = window.localStorage.user ? JSON.parse(window.localStorage.user) : null

    if (!currentUser) {
        $.post('/api/users', {}, (user) => {
            if (user) {
                window.localStorage.user = JSON.stringify(user)
                currentUser = user
                $('#nav-username').text(currentUser.username)
            }
        })
    }
    else {
        $('#nav-username').text(currentUser.username)
    }
}

