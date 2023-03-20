
let queryString = location.search
let params = new URLSearchParams(queryString).get("_id")


async function printDetails() {
    try {
        let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
        let fetchResponse = await fetch(urlApi);
        let response = await fetchResponse.json();
        let arrayEventos = response.events;
        let eventId = arrayEventos.find(event => event.id == params);
        cardDetails(eventId)
    }catch (error) {
        console.log(error);
    }

    

    function cardDetails(eventId){
        if (!eventId) {
            document.getElementById("idContainer").innerHTML = "El evento no se pudo encontrar.";
            return;
            }else{
            let card = ` 
            <div class="card" style="margin: 2rem">
                    <img src="${eventId.image}" alt="${eventId.name}"/>  
                <div class="details">
                    <div class="center">
                    <h1>${eventId.name}</h1>
                    <p>${eventId.description}</p>
                    <h3>Date: ${eventId.date} - Place: ${eventId.place}</h3>
                    <h4>Capacity: ${eventId.capacity}   -   Price: $${eventId.price}</h4>
                    </div>
                </div>
            </div>
            `;
            document.getElementById("idContainer").innerHTML = card;
        }
    }

}


printDetails()


