const format=(num)=>{
    return String(num).padStart(2, "0");
}

const load=()=>{
    const h=new Date().getHours();
    const m=new Date().getMinutes();
    const s=new Date().getSeconds();

    document.querySelector("#time").innerText=`${format(h)}:${format(m)}:${format(s)}`;

    requestAnimationFrame(load);
}

requestAnimationFrame(load)