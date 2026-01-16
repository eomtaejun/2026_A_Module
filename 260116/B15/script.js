let datas=new Array();

let page=0;
const limit=10;

const parsing=(data)=>{
    const rows=data.split("\n");
    const header=rows.shift().split(",");

    return rows.map(row=>{
        const values=row.split(",");

        return header.reduce((obj, head, index)=>{
            obj[head.trim()]=values[index];

            return obj;
        }, {})
    })
}
const getDatas=async ()=>{
    const data=await fetch("./sample-data.csv");
    const text=await data.text();
    return parsing(text);
}

const btnload=()=>{
    let nums=new Array();
    for(let i=0; i<datas.length/limit; i++){
        nums.push(i);
    }

    document.querySelector("#pagination").innerHTML=[
        `<button ${page===0 ? "disabled" : ""} data-control="prev">이전</button>`,
        nums.map(num=>`
            <button class="${num===page ? "active" : ""}" data-page="${num}">${num+1}</button>
        `).join(""),
        `<button ${page===(datas.length/limit)-1 ? "disabled" : ""} data-control="next">다음</button>`
    ].join("");
}

const load=()=>{
    document.querySelector("#tableBody").innerHTML=datas
    .filter((data, index)=>index>=page*limit && index<((page+1)*limit))
    .map(data=>`
        <tr>
            <td>${data.이름}</td>
            <td>${data.나이}</td>
            <td>${data.직업}</td>
            <td>${data.도시}</td>
            <td>${data.급여}</td>
        </tr>
    `).join("");

    btnload();
}

getDatas().then(res=>{
    datas=res;
    console.log(datas);

    load();
})

document.querySelector("#pagination").addEventListener("click", e=>{
    const pagination=e.target.dataset.page;
    const control=e.target.dataset.control;

    if(pagination) page=Number(pagination);

    if(control){
        switch(control){
            case "prev":
                page=Math.max(0, --page);
                break;
            case "next":
                page=Math.min((datas.length/limit)-1, ++page);
                break;
        }
    }
    
    load();
})