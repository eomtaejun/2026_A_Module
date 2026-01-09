document.querySelector("button").addEventListener("click", e=>{
    const value=document.querySelector("input").value;
    document.querySelector("body").style.background=value;
})