
let taskInput=document.getElementById("new-task");//Add a new task.
let addButton=document.querySelector("#add");//first button
let incompleteTasks=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let completedTasks=document.getElementById("completed-tasks");//completed-tasks

fetch('/first', {
    method: 'GET'
}).then(res => res.json()).then(data => {
    for(let i = 0; i < data.length;i++){
        console.log(data[i].name)
        incompleteTasks.appendChild(createNewTaskElement(data[i].name))
    }
    
    
    for (let i=0; i<incompleteTasks.children.length;i++){
        console.log('hi')
        
        bindTask(incompleteTasks.children[i],completed);
    }
    
    for (let i=0; i<completedTasks.children.length;i++){
    
        bindTask(completedTasks.children[i],incompleted);
    }
})

//New task list item
let createNewTaskElement=function(taskString){

    let li=document.createElement("li"); // li tag
    let checkBox=document.createElement("input");//checkbox
    let label=document.createElement("label");//label
    let editInput=document.createElement("input");//text
    let editBttn=document.createElement("button");//edit button
    let deleteBttn=document.createElement("button");//delete button

    label.innerText=taskString; // 

    checkBox.type="checkbox";
    editInput.type="text";

    editBttn.innerText="Edit";//innerText encodes special characters, HTML does not.
    editBttn.className="edit";
    deleteBttn.innerText="Delete";
    deleteBttn.className="delete";



    //and appending.
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(editInput);
    li.appendChild(editBttn);
    li.appendChild(deleteBttn);
    return li;
}



let addTask = function(){ // attach function to post route
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    fetch('/task', {
        method: 'POST',
        body: JSON.stringify({name:taskInput.value}), //sets the body of the req
        headers: {'Content-Type': 'application/json'} // need to set content type 
    }).then((res) => res.json()).then((data) => { 
        let listItem=createNewTaskElement(data.name);
        incompleteTasks.appendChild(listItem);
        bindTask(listItem, completed);
    })

    taskInput.value="";

}



let editTask = function(){ // need to press edit button 2 times for some reason
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    let listItem=this.parentNode;

    let editInput = listItem.querySelector('input[type=text]');
    let label = listItem.querySelector("label");
    
    console.log('editInput:' + editInput.value, label.innerText) 
    fetch('/editedtask', {
        method: 'PUT',
        body: JSON.stringify({name:label.innerText, edit:editInput.value}), //sets the body of the req
        headers: {'Content-Type': 'application/json'} 
    }).then(res => res.json()).then((data) => {
        console.log(data.name, data.edit)
        
    })
    //If class of the parent is .editmode
    if(editInput.value){

        //switch to .editmode
        //label becomes the inputs value.
            label.innerText=editInput.value;
        }else{
            editInput.value=label.innerText;
        }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
}




//Delete task.
let deleteTask=function(){ // app.delete route
    console.log(this);
    
    let listItem=this.parentNode; 
    let ul=listItem.parentNode; 
    let label = listItem.querySelector('label')
    console.log(listItem.querySelector('label'))
    console.log(label.value)
    fetch('/deletedTask', {
        method: 'DELETE',
        body: JSON.stringify({name: label.innerText}), //sets the body of the req
        headers: {'Content-Type': 'application/json'} 
    }).then( res => res.json()).then((data) => {
        
    }) 
    
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
let completed=function(){
    console.log("Completed");
    //Append the task list item to the #completed-tasks
    let listItem=this.parentNode;
    completedTasks.appendChild(listItem);

}

let incompleted=function(){
    console.log("Incomplete");
//Mark task as incomplete.
    //When the checkbox is unchecked
        //Append the task list item to the #incomplete-tasks.
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
}






//Set the click handler to the addTask function.
addButton.onclick=addTask;
// addButton.addEventListener("click",addTask);




let bindTask=function(taskLI,checkBoxEvent){
    console.log("bind li");
//select ListItems children
    let checkBox=taskLI.querySelector("input[type=checkbox]");
    let editButton=taskLI.querySelector("button.edit");
    let deleteButton=taskLI.querySelector("button.delete");


//Bind editTask to edit button.
    editButton.onclick = editTask;
//Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEvent;
}


for (let i=0; i<incompleteTasks.children.length;i++){
    console.log('hi')
    
    bindTask(incompleteTasks.children[i],completed);
}

// for (let i=0; i<completedTasks.children.length;i++){

//     bindTask(completedTasks.children[i],incompleted);
// }



/**
 *       IDEAs
 * Give user choice between ordered list and unordered list
 * somehow save all tasks that make up a bigger task and return them in order
 * 
 *  
*/