const add=document.querySelector("button:not(.clear-btn)");
const reset=document.querySelector(".clear-btn");

let datas=new Array();

const getColor=()=>{
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);

    return `rgb(${r}, ${g}, ${b})`;
}

const formatData=()=>{
    const total=datas.map(data=>data.value).reduce((sum, value)=>sum+value, 0);
    
    let percents=datas.map(data=>{
        return {...data, percent: (data.value/total)*100}
    })

    datas=percents;
}

const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

const draw=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x=canvas.width/2;
    const y=canvas.height/2;
    const r=100;

    let startAngle=-Math.PI/2;

    const total=datas.map(data=>data.value).reduce((sum, value)=>sum+value, 0);

    datas.forEach(data=>{
        const angle=(data.value/total)*Math.PI*2;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r, startAngle, startAngle+angle);
        ctx.closePath();

        ctx.fillStyle=data.color;
        ctx.fill();

        startAngle+=angle;
    })
}

const load=()=>{
    document.querySelector("#legend").innerHTML=datas.map(data=>`
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${data.color}"></div>
            <span>${data.title} (${Math.round(data.percent)}%)</span>
        </div>
    `).join("");

    document.querySelector("#labelInput").value="";
    document.querySelector("#valueInput").value="";
}

add.addEventListener("click", e=>{
    const data={
        title: document.querySelector("#labelInput").value, 
        value: Number(document.querySelector("#valueInput").value), 
        color: getColor()
    }

    datas.push(data);
    formatData();

    load();
    draw();
})

document.querySelector(".clear-btn").addEventListener("click", e=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    datas=new Array();
    load();
})