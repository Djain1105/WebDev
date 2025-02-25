$(function () {
    let inpTodo = $('#inpNewToDo')
    let btnAdd = $('#btnAdd')
    let todoList = $('#ulToDoList')

    btnAdd.click(function () {
        let newTodo = inpTodo.val()
        $.post(                      // AJAX (Asynchronous Javascript and XML). without reloading the page, the browser can send the data using get or post to our server
            '/todos/',              // takes the realtive path to the route (or any file)
            { task: newTodo },         // sends data as a JSON object
            function (data) {        // the data is basically what we get back from the server call
                todoList.empty();
                for(todo of data) {
                    todoList.append("<li>" + todo.task + "</li>")
                }
            }
        )
    })
})