let todos=new Array();
let copy=new Array();
const level={
    high: "높음",
    medium: "보통",
    low: "낮음"
}

const getDatas=async ()=>{
    const data=await fetch("./todos.json");
    return data.json();
}

const count=()=>{
    document.querySelector("#totalCount").innerText=todos.length;
    document.querySelector("#completedCount").innerText=todos.filter(todo=>todo.completed).length;
    document.querySelector("#pendingCount").innerText=todos.filter(todo=>!todo.completed).length;
}

const load=()=>{
    document.querySelector("#todoList").innerHTML=copy.map(todo=>`
        <div class="todo-item ${todo.completed ? "completed" : ""}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${level[todo.priority]}</span>
                    <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
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

getDatas().then(res=>{
    todos=res.todos;
    copy=todos;
    console.log(todos)

    load();
    count();
})

const filters=[
    ()=>todos,
    ()=>todos.filter(todo=>!todo.completed),
    ()=>todos.filter(todo=>todo.completed),
    ()=>todos.filter(todo=>todo.priority==="high"),
]

document.querySelectorAll(".filter-btn").forEach((btn, index)=>{
    btn.addEventListener("click", e=>{
        copy=filters[index]();

        document.querySelector(".filter-btn.active")?.classList.remove("active");
        e.target.classList.add("active");

        load();
    })
})