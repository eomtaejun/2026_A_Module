let todo=new Array();

const load=()=>{
    document.querySelector(".box").innerHTML=todo.map((value, index)=>`
        <div class="item">
            <span class="fs-5 fw-semibold">${value}</span>
            <button class="btn btn-danger" data-id="${index}">삭제</button>
        </div>
    `).join("");
}

document.querySelector("form").addEventListener("submit", e=>{
    e.preventDefault();

    const value=document.querySelector("input").value;
    document.querySelector("input").value="";

    todo.push(value);

    load();
})

document.querySelector(".box").addEventListener("click", e=>{
    const id=e.target.dataset.id;
    if(!id) return;
    todo=todo.filter((value, index)=>index!==Number(id));
    
    load();
})