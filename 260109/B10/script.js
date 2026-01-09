const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let drawing=false;

window.addEventListener("mousedown", e=>{
    console.log(e)
    if(e.target.tagName!=="CANVAS") return;
    ctx.moveTo(e.offsetX, e.offsetY);
    drawing=true;
})

window.addEventListener("mousemove", e=>{
    if(!drawing) return;

    if(e.target.tagName!=="CANVAS") ctx.lineTo(e.offsetX-canvas.offsetLeft, e.offsetY-canvas.offsetTop);
    else ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

window.addEventListener("mouseup", e=>{
    drawing=false;
})