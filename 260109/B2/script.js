let todos=new Array();
let increment=1;

const load=()=>{
    console.log(todos)
    document.querySelector(".list").innerHTML=todos.map(todo=>`
        <div class="item rounded-3 p-3 d-flex justify-content-between align-items-center w-100">
            <p class="mb-0 fw-semibold">${todo.value}</p>
            <button type="button" data-id="${todo.id}" class="btn btn-danger">삭제</button>
        </div>
    `).join("");
}

document.querySelector("form").addEventListener("submit", e=>{
    e.preventDefault();
    const value=document.querySelector("input").value;
    if(!value) return;

    todos.push({
        value: value, 
        id: increment++
    })

    document.querySelector("input").value="";

    load();
})

document.querySelector(".list").addEventListener("click", e=>{
    const id=Number(e.target.dataset.id);
    console.log(id)
    if(!id) return;

    todos=todos.filter(todo=>todo.id!==id);

    load();
})

load();