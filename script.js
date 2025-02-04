let inputvalue=document.querySelector('.input-value')
let addbutton=document.querySelector('.add-todo-button');
let mainTodoEle=document.querySelector('.todo-list-ele')

// get todo list from local
let getTodoListfromLocal=()=>{
    return(JSON.parse(localStorage.getItem("todoList")));
}

let TodoElements=getTodoListfromLocal()||[];

let addeelmentFromLocal=()=>{
    TodoElements.forEach(element => {
        addEle(element);
    });
}
updatetodoListAtLocal=(TodoElements)=>{
    return localStorage.setItem("todoList",JSON.stringify(TodoElements))
}
// add element in the list
let addEle=(element)=>{
    let divItem=document.createElement('div');
    divItem.classList.add('items')
    divItem.innerHTML=`<li>${element}</li><button class="del-btn btn">Delete</button>`
    mainTodoEle.appendChild(divItem)
}

let addTodoList=(e)=>{
    e.preventDefault();
    let element=inputvalue.value.trim();
    inputvalue.value="";

    if(element!="" && !TodoElements.includes(element)){
        TodoElements.push(element);
        TodoElements=[... new Set(TodoElements)]
        localStorage.setItem("todoList",JSON.stringify(TodoElements))
        addEle(element);
    }
}
addbutton.addEventListener('click', (e)=>{
    addTodoList(e);
});
addeelmentFromLocal()
let deleteTheElement=(e)=>{
    let parentElement=e.target.parentElement;
    parentElement.remove()
}
let removelistElement=(e)=>{
    let listItem=e.target.previousElementSibling.innerText;
    TodoElements=TodoElements.filter((current)=>{
        return current!=listItem;
    })
    updatetodoListAtLocal(TodoElements)
    console.log(listItem);
    
}
mainTodoEle.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("del-btn")){
        removelistElement(e)
        deleteTheElement(e);
    }    
    
})