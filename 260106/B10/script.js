const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let drawing=false;

document.addEventListener("mousedown", e=>{
    if(e.target.tagName!=="CANVAS") return;
    drawing=true;
    ctx.moveTo(e.offsetX, e.offsetY);
})

document.addEventListener("mousemove", e=>{
    if(!drawing) return;
    if(e.target.tagName!=="CANVAS") ctx.lineTo(e.offsetX-canvas.offsetLeft, e.offsetY-canvas.offsetTop);
    else ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

document.addEventListener("mouseup", e=>{
    drawing=false;
})


document.querySelector(".delete").addEventListener("click", e=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector(".save").addEventListener("click", e=>{
    canvas.toBlob(blob=>{
        const a=document.createElement("a");
        a.download="canvas.png";
        a.href=URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
    })
})