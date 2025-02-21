window.onload = function() {
    let num = document.getElementById('inpbox')
    let print = document.getElementById('btn')
    let list = document.getElementById('list')

    print.onclick = function() {
        let N = parseInt(num.value)
        let listHtml = ''                       
        for(i=1; i<=N; i++) {
            listHtml += '<li>' + i + '</li>'    // don't do like list.innerHTML += '<li>' + i + '</li>' as updating innerHTMl is a costly operation.
        }                                       // so it will take very high time and also will freeze the browser till the for loop ends.
        list.innerHTML = listHtml               // so try using innerHTML minimally and carefully 
    }

    // we can also do like this in for loop
    for(i=1; i<=N; i++) {       // this method will also not take much time as its just adding child to the list and not creating list itself again and again as done in concatenation statement
        let item = document.createElement('li')
        item.innerText = i
        list.appendChild(item)
    }           

}