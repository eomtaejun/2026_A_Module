document.querySelector("button").addEventListener("click", e=>{
    const value=document.querySelector("#color").value;

    document.body.style.background=value;
})