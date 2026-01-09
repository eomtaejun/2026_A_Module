let datas=new Array();

const parseCSV=(text)=>{
    const rows=text.split("\n");
    const headers=rows.shift().split(",");

    return rows.map(row=>{
        const values=row.split(",");

        return headers.reduce((obj, header, index)=>{
            obj[header.trim()]=values[index].trim();
            return obj;
        }, {})
    })
}

const getData=async ()=>{
    const data=await fetch("./sample-data.csv");
    const text=await data.text();

    return parseCSV(text);
}

let page=0;

const pageLoad=()=>{
    // const btns=new Array();
    // for(let i=1; i<=datas.length/10; i++){
    //     btns.push(i)
    // }
    // document.querySelector("#pagination").innerHTML=[
    //     `<button id="prev">이전</button>`,
    //     ...btns.map(btn=>`<button class="page">${btn}</button>`), 
    //     `<button id="next">다음</button>`
    // ].join("");

    // if(page===0){

    // }

    document.querySelectorAll("#pagination .page").forEach(btn=>btn.classList.remove("active"));
    document.querySelector(`#pagination .page:nth-of-type(${page+2})`).classList.add("active");

    if(page===0){
        document.querySelector("#prev").disabled=true;
        document.querySelector("#pagination .page:nth-of-type(5)").style.display="none";
        document.querySelector("#pagination .prev_more").style.display="block";
    } else{
        document.querySelector("#prev").disabled=false;
        document.querySelector("#pagination .page:nth-of-type(5)").style.display="block";
        document.querySelector("#pagination .prev_more").style.display="none";
    }

    if(page===4){
        document.querySelector("#next").disabled=true;
        document.querySelector("#pagination .page:nth-of-type(3)").style.display="none";
        document.querySelector("#pagination .next_more").style.display="block";
    }else{
        document.querySelector("#next").disabled=false;
        document.querySelector("#pagination .page:nth-of-type(3)").style.display="block";
        document.querySelector("#pagination .next_more").style.display="none";
    }
}

const load=()=>{
    document.querySelector("#tableBody").innerHTML=datas
    .filter((data, index)=>index>=page*10 && index<(page+1)*10)
    .map(data=>`
        <tr>
            <td>${data.이름}</td>
            <td>${data.나이}</td>
            <td>${data.직업}</td>
            <td>${data.도시}</td>
            <td>${data.급여}</td>
        </tr>
    `).join("");

    pageLoad();
}

getData().then(res=>{
    datas=res;
    console.log(datas);
    load();
})

// document.querySelector("#pagination").addEventListener("click", e=>{
//     if(!e.target.classList.contains("page")) return;
    
//     page=Number(e.target.innerText)-1;

//     load();
// })

// document.querySelector("#pagination").addEventListener("click", e=>{
//     if(e.target.classList.contains("page")) return;

//     document.querySelectorAll("#pagination button:not(.page)").forEach(btn=>{
//         btn.disabled=false;
//     })
    
//     if(e.target.id==="prev"){
//         page=Math.max(0, --page);
//         if(page===0) document.querySelector("#prev").disabled=true;
//     } else if(e.target.id==="next"){
//         page=Math.min(datas.length/10-1, ++page);
//         if(page===datas.length/10-1) document.querySelector("#next").disabled=true;
//     }

//     load();
// })

document.querySelector("#prev").addEventListener("click", e=>{
    page=Math.max(0, --page);

    // if(page===0) document.querySelector("#prev").disabled=true;
    // else document.querySelector("#prev").disabled=false;

    load();
})
document.querySelector("#next").addEventListener("click", e=>{
    page=Math.min(datas.length/10-1, ++page);

    // if(page===4) document.querySelector("#next").disabled=true;
    // else document.querySelector("#next").disabled=false;

    load();
})

document.querySelectorAll(".page").forEach(btn=>{
    btn.addEventListener("click", e=>{
        page=Number(e.target.innerText)-1;

        load();
    })
})