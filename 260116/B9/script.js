let datas=new Array();
let favorites=new Array();

const getDatas=async ()=>{
    const data=await fetch("./data.json");

    if(localStorage.getItem("datas")) return JSON.parse(localStorage.getItem("datas"));
    else return data.json();
}
const setDatas=()=>{
    localStorage.setItem("datas", JSON.stringify(datas));
}

const getFavorites=()=>{
    if(localStorage.getItem("favorites")) return JSON.parse(localStorage.getItem("favorites"));
    else return favorites;
}
const setFavorites=()=>{
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

const loadFavorite=(id)=>{
    if(favorites.some(value=>value===id)) return "warning";
    else return "dark";
}

const load=()=>{
    document.querySelector(".wrap").innerHTML=datas.map(data=>`
        <div class="p-3 bg-white border rounded-3 d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column justify-content-center align-items-start">
                    <p class="mb-0 fs-4 fw-bold">${data.name}</p>
                    <p class="mb-0 fs-5 text-secondary">${data.desc}</p>
                </div>

                <span class="text-${loadFavorite(data.id)} fs-3 p-1" data-id="${data.id}">${loadFavorite(data.id)==="dark" ? "☆" : "★"}</span>
            </div>
    `).join("");
}

getDatas().then(res=>{
    datas=res;
    console.log(res)
    setDatas();

    favorites=getFavorites();
    setFavorites();
    load();
})

document.querySelector(".wrap").addEventListener("click", e=>{
    const id=Number(e.target.dataset.id);
    if(!id) return;

    favorites=getFavorites();

    if(favorites.some(data=>data===id)) favorites=favorites.filter(value=>value!==id);
    else favorites.push(id);

    setFavorites();
    load();
})