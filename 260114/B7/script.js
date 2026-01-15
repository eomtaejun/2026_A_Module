/*
let nums=new Array();

const focusing=()=>{
    const temp=nums.length>=6 ? 6 : nums.length+1;
    // const temp=nums.length+1;
    console.log(temp)
    document.querySelector(`input:nth-of-type(${temp})`).focus();
}

document.querySelectorAll("input").forEach(input=>{
    input.addEventListener("input", e=>{
        const value=e.target.value;
        if(/[^\d]/.test(value)) return e.target.value="";

        nums.push(value);
        // nums=nums.filter(num=>!isNaN(num));
        focusing();
    })
})

document.addEventListener("keydown", e=>{
    if(e.key!=="Backspace") return;

    nums.pop();
    // nums=nums.filter(num=>!isNaN(num));
    focusing();
})
*/
const inputs=document.querySelectorAll("input");
const btn=document.querySelector("button");

const disabled=()=>{
    const values=[...inputs].map(input=>input.value);
    
    if(values.some(value=>value==="")) btn.classList.add("disabled");
    else btn.classList.remove("disabled");
}

inputs.forEach((input, index)=>{
    input.addEventListener("input", e=>{
        const value=e.target.value;        
        if(/[^\d]/.test(value)) return e.target.value="";

        if(index<inputs.length-1) inputs[index+1].focus();

        disabled();
    })

    input.addEventListener("keydown", e=>{
        if(e.key!=="Backspace") return;

        if(input.value!=="") input.value="";
        else if(index>0){
            inputs[index-1].focus();
            inputs[index-1].value="";
        }

        disabled();
    })
})