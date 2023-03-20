async function pastEventos() {
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing?time=past";
let fetchResponse = await fetch(urlApi);
let response = await fetchResponse.json();
let assistance = response.events;
let div = document.getElementById("boxpast");
div.innerHTML = ``;

let oldEvents = assistance.filter(function (assistance) {
    return assistance.date <= response.currentDate;
});

function crearpastEvent(datos, contenedor) {
    contenedor.innerHTML = "";
    let eventos = "";
    datos.forEach((element) => {
    eventos += `
    <div class="home-main" style="width: 24rem; height: auto; ">
        <div class="home-card" style="height: 28rem;">
            <div class="photo-card">
            <img src="${element.image}" alt="${element.name}" style ="width: 19rem; height: 13rem;">
            </div>
        <div>
            <h3 style="font-size: 1.8rem;">${element.name}</h3>
            <p style ="text-align: justify; text-indent: 0.6rem; font-size: 1rem;height: 4.5rem">${element.description}</p>

            <div class="footer-card" style ="margin-top: 0.5rem;">
            <p style= "font-weight: 750;">$ ${element.price}</p>
            <a href="./details.html?id=${element.id}"><button>view Details</button></a>
            </div>
        </div>
        </div>
    </div>`;
    });
    if (datos.length === 0) contenedor.innerHTML = defineNotCard();
    else contenedor.innerHTML = eventos;
}
crearpastEvent(oldEvents, div);

function defineNotCard() {
    return `
    <div class="home-main " style="width: 24rem; height: auto; ">
                    <div class="home-card" style="height: 28rem;">
                        <div class="photo-card">
                            <img src="notfound" alt="notfound" style ="width: 19rem; height: 13rem;">
                        </div>
                    <div>
                    <h3 style="font-size: 2rem;">No events found!</h3>
                    <p style ="text-align: justify; text-indent: 0.6rem; font-size: 1rem;height: 4.5rem">Try again</p>

                    <div class="footer-card" style ="margin-top: 0.5rem;">
                    </div>
                    </div>
                </div>
            </div>`;
}

let categoryConteiner = document.getElementById("checks");
let categoryPrincipal = document.getElementById("boxCheck");

let categorias = Array.from(
    new Set(assistance.map((container) => container.category))
);

console.log(categorias);
  // checkbox
function CreacionCheckbox(category, conteiner) {
    let checkboxs = "";
    category.forEach((element) => {
    checkboxs += `<input type="checkbox" name="category" id="${element}" value="${element}" for="${element}">
    ${element}`;
    });
    conteiner.innerHTML += checkboxs;
}

CreacionCheckbox(categorias, categoryConteiner);
categoryPrincipal.addEventListener("change", () => {
    let filtradoCategoria = filter();
    console.log(filtradoCategoria);
    crearpastEvent(filtradoCategoria, div);
});

  //filtro de categoria
function filterCategoria(eventos) {
    let checked = Array.from(
    document.querySelectorAll("input[type ='checkbox']:checked")
    ).map((date) => date.value);
    let arrayFiltrado = checked
    .map((value) =>
        eventos.filter((container) => {
        return container.category === value;
        })
    )
    .flat();
    if (checked.length == false) {
    return oldEvents;
    } else {
    return arrayFiltrado;
    }
}

let input = document.getElementById("input-texto");

input.addEventListener("input", () => {
    let filtradoPorBusqueda = filter();
    crearpastEvent(filtradoPorBusqueda, div);
});

function filterBusqueda(assistance, valueSearch) {
    return assistance.filter(
    (event) =>
        event.name.toLowerCase() &&
        (valueSearch.length === 0 ||
        valueSearch.includes(valueSearch.category)) &&
        event.date < response.currentDate
    );
}

function filter() {
    let filtradoCategoria = filterCategoria(assistance, categorias);
    let filtradoBusqueda = filterBusqueda(filtradoCategoria, input.value);
    return filtradoBusqueda;
}
}
pastEventos();
