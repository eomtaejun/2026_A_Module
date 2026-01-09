const readFile=async (file)=>{
    return new Promise((res, rej)=>{
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(rs)=>res(rs.target.result);
    })
}

const loadImage=async (image)=>{
    return new Promise((res, rej)=>{
        let img=new Image();
        img.src=image;
        img.onload=()=>res(img);
    })
}

document.querySelector("input").addEventListener("input", async e=>{
    const base=await readFile(e.target.files[0]);
    const img=await loadImage(base);

    document.querySelector(".box").appendChild(img);
    document.querySelector("img").classList.add("fit-cover");
})

document.querySelectorAll("button").forEach(button=>{
    button.addEventListener("click", e=>{
        const image=document.querySelector("img");
        if(!image) return;

        image.classList.remove("bw", "sepia", "invert");
        image.classList.add(e.target.dataset.filter);
    })
})