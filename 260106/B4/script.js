const format=(time)=>{
    return String(time).padStart(2, "0");
}

const getTime=()=>{
    const now=new Date();

    const hour=now.getHours();
    const minute=now.getMinutes();
    const second=now.getSeconds();

    document.querySelector(".time").innerText=`${format(hour)}:${format(minute)}:${format(second)}`;

    requestAnimationFrame(getTime);
}

requestAnimationFrame(getTime);