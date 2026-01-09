const success=document.querySelector(".btn-success");
const danger=document.querySelector(".btn-danger");
const box=document.querySelector(".box");

let increment_value=0;

const increment=()=>{
    ++increment_value;
    return increment_value;
}

const del=(id)=>{
    const elem=document.querySelector(`[data-id="${id}"]`);
    if(elem) elem.remove();
    else return;
}

const time=(id)=>{
    setTimeout(()=>{
        del(id);
    }, 5000)
}

success.addEventListener("click", e=>{
    const id=increment();
    box.insertAdjacentHTML("beforeend", `<div data-id="${id}" class="alert alert-success mb-3">성공하였습니다</div>`)
    time(id);
})

danger.addEventListener("click", e=>{
    const id=increment();
    box.insertAdjacentHTML("beforeend", `<div data-id="${id}" class="alert alert-danger mb-3">실패하였습니다</div>`)
    time(id);
})

document.addEventListener("click", e=>{
    const id=e.target.dataset.id;

    if(!id) return;

    del(id);
})