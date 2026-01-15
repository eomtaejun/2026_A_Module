const addbtn=document.querySelector("button:not(.clear-btn)");
const clearbtn=document.querySelector(".clear-btn");

const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let datas=new Array();
let colors=new Array();

const getColor=()=>{
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);

    colors.push(`rgb(${r}, ${g}, ${b})`);
}

const draw=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerx=canvas.width/2;
    const centery=canvas.height/2;
    const radius=canvas.width/4;
    const total=datas.reduce((acc, value)=>acc+value.value, 0);
    let startAngle=-Math.PI/2;

    datas.forEach((data, index)=>{
        getColor();

        const angle=(data.value/total)*(Math.PI*2);

        ctx.beginPath();
        ctx.moveTo(centerx, centery);
        ctx.arc(centerx, centery, radius, startAngle, startAngle+angle);
        ctx.fillStyle=colors[index];
        ctx.fill();
        ctx.closePath();

        startAngle+=angle;
    })
}

const labels=()=>{
    const total=datas.reduce((acc, value)=>acc+value.value, 0);

    document.querySelector("#legend").innerHTML=datas.map((data, index)=>`
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${colors[index]}"></div>
            <span>${data.name} (${Math.round((data.value/total)*100)}%)</span>
        </div>
    `).join("");
}

addbtn.addEventListener("click", e=>{
    datas.push({
        name: document.querySelector("#labelInput").value,
        value: Number(document.querySelector("#valueInput").value)
    })

    document.querySelector("#labelInput").value="";
    document.querySelector("#valueInput").value="";

    draw();
    labels();
})

clearbtn.addEventListener("click", e=>{
    datas=new Array();
    colors=new Array();

    draw();
    labels();
})