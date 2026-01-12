let start=0;
let total=0;
let running=false;

const format=(num)=>{
    return String(num).padStart(2, "0");
}

const render=(now)=>{
    const m=Math.floor(now/60000);
    const s=Math.floor(now/1000)%60;
    const ms=now%1000;

    document.querySelector("p").innerText=`${format(m)}:${format(s)}:${String(ms).padStart(3, "0")}`;
}

const load=()=>{
    if(!running) return;

    const now=new Date().getTime()-start+total;
    render(now);

    requestAnimationFrame(load);
}

let first=true;
const button=(control)=>{
    if(first) document.querySelector("[data-control='start']").innerText=`시작`;
    else document.querySelector("[data-control='start']").innerText=`계속`;

    switch(control){
        case "start":
            document.querySelector("[data-control='start']").classList.add("d-none");
            document.querySelector("[data-control='pause']").classList.remove("d-none");
            document.querySelector("[data-control='reset']").classList.remove("d-none");
            break;
        case "pause":
            document.querySelector("[data-control='start']").classList.remove("d-none");
            document.querySelector("[data-control='pause']").classList.add("d-none");
            document.querySelector("[data-control='reset']").classList.remove("d-none");
            break;
        case "reset":
            document.querySelector("[data-control='start']").classList.remove("d-none");
            document.querySelector("[data-control='pause']").classList.add("d-none");
            document.querySelector("[data-control='reset']").classList.add("d-none");
            break;
    }
}

document.querySelector(".controls").addEventListener("click", e=>{
    const control=e.target.dataset.control;
    if(!control) return;
    
    switch(control){
        case "start":
            if(running) return;
            running=true;
            first=false;
            start=new Date().getTime();
            requestAnimationFrame(load);
            break;
        case "pause":
            if(!running) return;
            running=false;
            total+=new Date().getTime()-start;
            break;
        case "reset":
            running=false;
            start=0;
            total=0;
            first=true;
            render(0);
            break;
    }

    button(control);
})