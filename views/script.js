
fetch("http://localhost:4000/test")
    .then(res => res.json())
    .then(data => {
    console.log(data)
})
let button = document.querySelector('#add')
// let removeBttn = document.querySelector()
let search = document.querySelector('#search')
let todoList = ['take dogs for walk', 'call mom', 'clean kitchen', 'clear dishwasher', 'fill dish washer', 'take out trash']

// adds tasks to list
button.addEventListener('click', () => {
    for(let i = 0; i < todoList.length;i++){
        let li = document.createElement('li');
        let list = document.querySelector('#task_list');
        let button = document.createElement('button')
        button.innerText = 'done'
        button.setAttribute('class', i)
        li.innerText = todoList[i]
        li.setAttribute('class', `${i}`)
        
        list.append(li)
        list.append(button)
        console.log(li)
        // let removeBttn = document.querySelector()

    }
    
})



// remove task from list 

search.addEventListener('input', (e) => {
    let value = e.target.value
    console.log(value)
})