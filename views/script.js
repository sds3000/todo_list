let taskInput=document.getElementById("new-task");//Add a new task.
let descInput=document.getElementById("description");
let addButton=document.querySelector("#add");//first button
let incompleteTasks=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let completedTasks=document.getElementById("completed-tasks");//completed-tasks

fetch("/first", { // Loads database tasks on start
    method: "GET"
}).then(res => res.json()).then(data => { 
    for(let i = 0; i < data.length;i++){
        incompleteTasks.appendChild(createNewTaskElement(data[i].name, data[i].description));
    };
});

//New task list item
let createNewTaskElement=function(taskName, taskDesc){
    
    // Create element parts
    let listItem=document.createElement("li"); // li tag
    let checkBox=document.createElement("input");//checkbox
    let label=document.createElement("label");//label
    let editInput=document.createElement("input");//text
    let editBttn=document.createElement("button");//edit button
    let deleteBttn=document.createElement("button");//delete button
    let description=document.createElement("p");//description tag
    // Assign the name and description value
    label.innerText=taskName; 
    description.innerHTML=taskDesc;
    // Assigns attributes and values
    checkBox.type="checkbox";
    editInput.type="text";

    editBttn.innerText="Edit";
    editBttn.className="edit";
    deleteBttn.innerText="Delete";
    deleteBttn.className="delete";
    
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(description);
    listItem.appendChild(editBttn);
    listItem.appendChild(deleteBttn);
    return listItem;
}



let addTask = function(){ // attach function to post route
    // Create a new list item with the text from the #new-task:
    fetch("/task", {
        method: "POST",
        body: JSON.stringify({name:taskInput.value, description:descInput.value}), //sets the body of the req
        headers: {"Content-Type": "application/json"} 
    }).then((res) => res.json()).then((data) => { 
        let listItem=createNewTaskElement(data.name, data.description);
        incompleteTasks.appendChild(listItem);
        bindTask(listItem, completed);
    });
    // Clears box after use
    descInput.value="";
    taskInput.value="";

}

let editTask = function(){ 

    let listItem=this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    
    fetch("/editedtask", {
        method: "PUT",
        body: JSON.stringify({name:label.innerText, edit:editInput.value}), //sets the body of the req
        headers: {"Content-Type": "application/json"} 
    }).then(res => res.json()).then((data) => {});
    let editMode = listItem.classList.contains("editMode")
    if(editMode){
            label.innerText=editInput.value;
        }else{
            editInput.value=label.innerText;
        }
    listItem.classList.toggle("editMode");
}

//Delete task.
let deleteTask=function(){ 
    
    let listItem=this.parentNode; 
    let ul=listItem.parentNode; 
    let label=listItem.querySelector("label");

    fetch("/deletedTask", {
        method: "DELETE",
        body: JSON.stringify({name:label.innerText}), // Sets the body of the req
        headers: {"Content-Type": "application/json"} 
    })
    // Remove the parent list item from the ul.
    ul.removeChild(listItem);
}
//Mark task completed
let completed=function(){
    // Append the task list item to the #completed-tasks
    let listItem=this.parentNode;
    completedTasks.appendChild(listItem);
    bindTask(listItem, incompleted)
}

let incompleted=function(){
//Mark task as incomplete.
    //When the checkbox is unchecked
        //Append the task list item to the #incomplete-tasks.
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTask(listItem, completed)
}

addButton.onclick=addTask;

let bindTask=function(taskLI,checkBoxEvent){
//select ListItems children
    let checkBox=taskLI.querySelector("input[type=checkbox]");
    let editButton=taskLI.querySelector("button.edit");
    let deleteButton=taskLI.querySelector("button.delete");

//Binds buttons to their functions
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEvent;
}

// Runs when loading the page to bind checkboxes from database
for (let i=0; i<incompleteTasks.children.length;i++){
    
    bindTask(incompleteTasks.children[i],completed);
}

for (let i=0; i<completedTasks.children.length;i++){
    
    bindTask(completedTasks.children[i],incompleted);
}



/**
 *       IDEAs
 * Give user choice between ordered list and unordered list
 * somehow save all tasks that make up a bigger task and return them in order
 * 
 *  
*/