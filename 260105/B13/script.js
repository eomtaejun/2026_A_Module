const video=document.querySelector("video");

document.querySelector(".controls").addEventListener("click", e=>{
    const control=e.target.dataset.control;

    if(!control) return;

    switch(control){
        case "pause":
            video.pause();
            break;
        case "play":
            video.play();
            break;
        case "prev":
            video.currentTime-=10;
            break;
        case "next":
            video.currentTime+=10;
            break;
        case "muted":
            video.muted=true;
            break;
        case "unmuted":
            video.muted=false;
            break;
    }
})

const format=(time)=>{
    const minute=Math.floor(time/60);
    const second=Math.floor(time%60);
    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

video.addEventListener("loadedmetadata", e=>{
    document.querySelector(".duration").innerText=`${format(video.duration)}`;
    document.querySelector(".current").innerText=`${format(video.currentTime)}`;
})

video.addEventListener("timeupdate", e=>{
    document.querySelector(".current").innerText=`${format(video.currentTime)}`;
})