let values=new Array();

const focusing=()=>{
    // console.log("idx", values.length)
    const idx=values.length;
    if(idx<6){
        document.querySelector(`input:nth-of-type(${idx+1})`).focus();
    } else{
        document.querySelector("button").focus();
    }
    
    if(values.length===6) document.querySelector("button").classList.remove("disabled");
    else document.querySelector("button").classList.add("disabled");
}

focusing()

document.querySelectorAll("input").forEach(input=>{
    input.addEventListener("input", e=>{
        const value=e.target.value;

        if(value==="") return;

        if(/[^\d]/.test(value)) e.target.value="";
        else{
            values.push(value);
        }

        focusing();
    })
})

window.addEventListener("keydown", e=>{
    if(e.code!=="Backspace") return;

    values.pop();

    focusing();
})