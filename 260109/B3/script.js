const box=document.querySelector(".box");
let x=0;
let y=0;

window.addEventListener("keydown", e=>{
    const rect=box.getBoundingClientRect();
    console.log(e.key)
    switch(e.key){
        case "ArrowUp":
            if(rect.top-10>=0) y-=10;
            else y=0;
            break;
        case "ArrowDown":
            if(rect.bottom+10<=window.innerHeight) y+=10;
            else y=window.innerHeight;
            break;
        case "ArrowLeft":
            if(rect.left-10>=0) x-=10;
            else x=0;
            break;
        case "ArrowRight":
            if(rect.right+10<=window.innerWidth) x+=10;
            else x=window.innerWidth;
            break;
    }

    box.style.transform=`translate(-50%, -50%) translate(${x}px, ${y}px)`;
})