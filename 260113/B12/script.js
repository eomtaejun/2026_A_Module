const base=async (file)=>{
    return new Promise((res, rej)=>{
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(rs)=>res(rs.target.result);
    })
}

const readFile=async (url)=>{
    return new Promise((res, rej)=>{
        let img=new Image();
        img.src=url;
        img.onload=()=>res(img);
    })
}

document.querySelector("#file").addEventListener("input", async e=>{
    const data=e.target.files[0];
    const base64=await base(data);
    const img=await readFile(base64);
    
    document.querySelector(".box").appendChild(img);
})

document.querySelector(".buttons").addEventListener("click", e=>{
    const filter=e.target.dataset.filter;
    if(!filter) return;

    document.querySelector("img").classList.remove("bw", "sepia", "invert", "default");
    document.querySelector("img").classList.add(filter);
})