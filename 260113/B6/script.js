const base=async (file)=>{
    return new Promise((res, rej)=>{
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(rs)=>res(rs.target.result);
    })
}

const loadFile=async (file)=>{
    return new Promise((res, rej)=>{
        let img=new Image();
        img.src=file;
        img.onload=()=>res(img);
    })
}

document.addEventListener("dragover", e=>{
    e.preventDefault();
})

document.querySelector(".box").addEventListener("drop", async e=>{
    e.preventDefault();

    const target=e.dataTransfer.files[0];
    console.log(target)
    const base64=await base(target);
    const img=await loadFile(base64);

    document.querySelector(".box").appendChild(img);
    document.querySelector("img").classList.add("fit-contain");
    document.querySelector("p").style.display="none";
})

document.querySelector("button").addEventListener("click", e=>{
    document.querySelector("img").remove();
    document.querySelector("p").style.display="block";
})