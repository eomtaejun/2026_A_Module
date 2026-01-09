let todos=new Array();
let temp=new Array();

const priorities={
    high: "높음",
    medium: "보통",
    low: "낮음"
}

const completed=(boolean)=>{
    return boolean ? "완료" : "진행중";
}

const getTodos=async ()=>{
    const data=await fetch("./todos.json");
    return data.json();
}

const count=()=>{
    document.querySelector("#totalCount").innerText=todos.length;
    document.querySelector("#completedCount").innerText=todos.filter(todo=>todo.completed).length;
    document.querySelector("#pendingCount").innerText=todos.filter(todo=>!todo.completed).length;
}

const load=()=>{
    document.querySelector("#todoList").innerHTML=temp.map(todo=>`
        <div class="todo-item ${todo.completed ? "completed" : ""}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${priorities[todo.priority]}</span>
                    <span class="badge status-badge">${completed(todo.completed)}</span>
                </div>
            </div>
            <p class="todo-description">${todo.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${todo.dueDate}</span>
                    <span>📝 생성: ${todo.createdAt}</span>
                </div>
            </div>
        </div>
    `).join("");
}

getTodos().then(res=>{
    console.log(res)
    todos=res.todos;
    temp=todos;
    count();
    load();
})


document.querySelector(".filter-buttons").addEventListener("click", e=>{
    const filter=e.target.dataset.filter;
    if(!filter) return;

    switch(filter){
        case "all":
            temp=todos;
            break;
        case "uncompleted":
            temp=todos.filter(todo=>!todo.completed);
            break;
        case "completed":
            temp=todos.filter(todo=>todo.completed);
            break;
        case "priority":
            // const arr=["high", "medium", "low"];
            // temp=[...todos].sort((a, b)=>arr.indexOf(a.priority)-arr.indexOf(b.priority));
            temp=todos.filter(todo=>todo.priority==="high");
            break;
    }

    load();
})