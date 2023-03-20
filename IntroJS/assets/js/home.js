
async function printEvents() {
    let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let events = response.events;
    let div = document.getElementById("boxCard")
    div.innerHTML = ``;
    


    function CreacionCard(datos, contenedor) {
    contenedor.innerHTML = ""
    let eventos = ""
    datos.forEach((date) => {
    eventos += `
                        <div class="home-main" style="width: 24rem; height: auto; ">
                            <div class="home-card" style="height: 28rem;">
                                <div class="photo-card">
                                    <img src="${date.image}" alt="${date.name}" style ="width: 19rem; height: 13rem;">
                                </div>
                            <div>
                                <h3 style="font-size: 1.8rem;">${date.name}</h3>
                                <p style ="text-align: justify; text-indent: 0.6rem; font-size: 1rem;height: 4.5rem">${date.description}</p>
                
                                <div class="footer-card" style ="margin-top: 0.5rem;">
                                    <p style= "font-weight: 750;">$ ${date.price}</p>
                                    <a href="./details.html?id=${date.id}"><button>view Details</button></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
    })
    if (datos.length === 0)
        contenedor.innerHTML = defineNotCard();
    else
        contenedor.innerHTML = eventos;
    }

    CreacionCard(events, div);

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
                    </div>`
    }

    let categoryConteiner = document.getElementById("checks")
    let categoryPrincipal = document.getElementById("boxCheck")

    let categorias = (Array.from(new Set(events.map(container => container.category))))

    console.log(categorias)

    function CreacionCheckbox(category, conteiner) {
    let checkboxs = ""
    category.forEach(date => {
    checkboxs += `<input type="checkbox" name="category" id="${date}" value="${date}" for="${date}">
    ${date}`
    })
    conteiner.innerHTML += checkboxs
    }


    CreacionCheckbox(categorias, categoryConteiner)
    
    categoryPrincipal.addEventListener("change", () => {
    let filtradoCategoria = filter()
    console.log(filtradoCategoria)
    CreacionCard(filtradoCategoria, div)
    defineNotCard()

    })

    function filterCategoria(eventos) {
    let checked = (Array.from(document.querySelectorAll("input[type ='checkbox']:checked"))
    .map((date) => date.value));
    let arrayFiltrado = checked
        .map((value) =>
        eventos.filter((container) => {
            return container.category === value;
        })
        ).flat();
    if (checked.length == false) {
        return events
    } else {
        return arrayFiltrado
    }
    }

    let input = document.getElementById("input-texto")

    input.addEventListener("input", () => {
    let filtradoBusqueda = filter()
    CreacionCard(filtradoBusqueda, div)
    defineNotCard()
    })

    function filterBusqueda(eventos, valueSearch) {
    return eventos.filter(event => (event.name).toLowerCase().includes(valueSearch.toLowerCase()))
    }

    function filter() {
    let filtradoCategoria = filterCategoria(events, categorias)
    let filtradoBusqueda = filterBusqueda(filtradoCategoria, input.value)
    return filtradoBusqueda
    }
}


printEvents()