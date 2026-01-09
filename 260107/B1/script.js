document.querySelector("input").addEventListener("input", e=>{
    const value=e.target.value;
    console.log(value)
    if(value.length>=8 && /[A-Z]+/.test(value) && /[\d]+/.test(value) && /[^a-zA-Z가-힣\s\t]+/.test(value)){
        e.target.style.border="3px solid #0f0";
    }
    
    else if(value.length>=6 && /[A-Z]+/.test(value) && /[\d]+/.test(value)){
        e.target.style.border="3px solid rgba(255, 196, 0, 1)";
    }

    else if(value.length<6){
        e.target.style.border="3px solid #f00";
    }
})