const video=document.querySelector("video");

document.querySelector(".controls").addEventListener("click", e=>{
    const control=e.target.dataset.control;
    if(!control) return;

    console.log(control)

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

const format=(num)=>{
    return String(num).padStart(2, "0");
}

const timeset=()=>{
    console.log(video.duration)
    const currentm=Math.floor(video.currentTime/60);
    const currents=Math.floor(video.currentTime%60);
    const durationm=Math.floor(video.duration/60);
    const durations=Math.floor(video.duration%60);

    document.querySelector("p").innerText=`${format(currentm)}:${format(currents)} / ${format(durationm)}:${format(durations)}`;
}

video.addEventListener("timeupdate", e=>{
    timeset();
})

video.addEventListener("loadedmetadata", timeset);