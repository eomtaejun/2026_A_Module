let datas=new Array();
let favorites=new Array();

const getData=async ()=>{
    if(localStorage.getItem("data")) return JSON.parse(localStorage.getItem("data"));
    else{
        const data=await fetch("./data.json");
        return data.json();
    }
}

const setFavorites=()=>{
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
const getFavorites=()=>{
    return JSON.parse(localStorage.getItem("favorites"));
}

const load=()=>{
    document.querySelector(".items").innerHTML=datas.map(data=>{
        const boolean=Boolean(favorites.find(value=>value===data.id));

        return `
            <div class="item">
                <div>
                    <p class="name">${data.name}</p>
                    <p class="desc">${data.desc}</p>
                </div>

                <span data-id="${data.id}">${boolean ? "★" : "☆"}</span>
            </div>
        `
    }).join("");
}

getData().then(res=>{
    localStorage.setItem("data", JSON.stringify(res));
    datas=JSON.parse(localStorage.getItem("data"));

    if(getFavorites()) favorites=getFavorites();
    setFavorites();

    load();

    console.log(datas)
})

document.querySelector(".items").addEventListener("click", e=>{
    const id=Number(e.target.dataset.id);

    if(!id) return;
    console.log(id)

    if(favorites.find(value=>value===id)) favorites=favorites.filter(value=>value!==id);
    else favorites.push(id);

    setFavorites();
    load();
})