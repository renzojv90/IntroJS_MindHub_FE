const contenedor = document.getElementById("event-card");

function makeCards(element, array) {
  for (let event of array.events) {
    if (event.date > array.currentDate) {
      element.innerHTML += `
      <div class="home-main" style="width: 24rem; height: auto; ">
      <div class="home-card" style="height: 28rem;">
          <div class="photo-card">
              <img src="${event.image}" alt="Imagenes fiestas" style ="width: 19rem; height: 13rem;">
          </div>
      <div>
          <h3 style="font-size: 2rem;">${event.name}</h3>
          <p style ="text-align: justify; text-indent: 0.6rem; font-size: 1rem;height: 4.5rem">${event.description}</p>

          <div class="footer-card" style ="margin-top: 0.5rem;">
              <p style= "font-weight: 750;">$ ${event.price}</p>
              <a href="./details.html"><button>view Details</button></a>
          </div>
      </div>
  </div>
</div>`;
    }
  }
}

makeCards(contenedor, events);
