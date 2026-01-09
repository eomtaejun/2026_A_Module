let time=0;
let start=0;
let temp=0;

let running=false;
let rafId=null;

const load=()=>{
    time=new Date().getTime() - start;

    let minute=Math.floor(time/60000);
    let second=Math.floor(time/1000)%60;
    let ms=time%1000;

    document.querySelector("p").innerText=`${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;

    if(running) rafId=requestAnimationFrame(load);
}

document.querySelector("[data-control='start']").addEventListener("click", e=>{
    if(running) return;

    running=true;
    start=new Date().getTime()-temp;
    rafId=requestAnimationFrame(load);


    e.target.classList.add("d-none");
    e.target.innerText="계속";
    document.querySelector("[data-control='stop']").classList.remove("d-none");
    document.querySelector("[data-control='reset']").classList.remove("d-none");
})

document.querySelector("[data-control='stop']").addEventListener("click", e=>{
    if(!running) return;

    temp=time;
    running=false;


    e.target.classList.add("d-none")
    document.querySelector("[data-control='start']").classList.remove("d-none");
    document.querySelector("[data-control='reset']").classList.remove("d-none");
})

document.querySelector("[data-control='reset']").addEventListener("click", e=>{
    running=false;

    if(rafId!==null){
        cancelAnimationFrame(rafId);
        rafId=null;
    }

    time=0;
    temp=0;
    start=new Date().getTime();
    document.querySelector("p").innerText=`00:00:000`;


    document.querySelector("[data-control='start']").innerText="시작";
    document.querySelector("[data-control='start']").classList.remove("d-none");

    document.querySelector("[data-control='stop']").classList.add("d-none");
    e.target.classList.add("d-none");
})