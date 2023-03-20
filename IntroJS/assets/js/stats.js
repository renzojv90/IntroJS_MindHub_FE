async function createTable() {
    try {
        let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
        let fetchResponse = await fetch(urlApi)
        let response = await fetchResponse.json()
        let pastEvArray = [];
        for (let event of response.events) {
            if (event.date < response.currentDate) {
                pastEvArray.push(event);
            }
        }
        pastEvArray.sort((a, b) => b.capacity - a.capacity);
        document.getElementById("MaxEventCapacity").innerHTML = `${pastEvArray[0].name}`;
        let maxCapacity = document.getElementById("MaxCapacity");
        
        maxCapacity.innerHTML = `${pastEvArray[0].capacity}`
        pastEvArray.sort((a, b) => b.assistance - a.assistance);
        
        document.getElementById("MaxEventAssistance").innerHTML = `${pastEvArray[0].name}`;
        document.getElementById("MaxAssistance").innerHTML = `${pastEvArray[0].assistance}`
        document.getElementById("MinEventAssistance").innerHTML = `${pastEvArray[pastEvArray.length - 1].name}`;
        document.getElementById("MinAssistance").innerHTML = `${pastEvArray[pastEvArray.length - 1].assistance}`;
        
        let categoryPastArray = [];
        let categoryPastArrayFilter = [];
        let categoryPastArrayInnerHtml = [];
        
        pastEvArray.forEach(event => {
            let asistencia = "";
            let capacidad = "";
            let precio = "";
            let ganancia = "";
            let porcentajeAsistencia = "";
            let obj_acc = {};
            if (!categoryPastArray.includes(event.category)) {
                categoryPastArray.push(event.category);
                categoryPastArrayFilter = pastEvArray.filter(e => e.category == event.category)
                categoryPastArrayFilter.reduce((acc, current) => {
                    asistencia = current.assistance;
                    precio = current.price;
                    ganancia = asistencia * precio;
                    capacidad = current.capacity;
                    obj_acc = {
                        totalGanancia: acc.totalGanancia + ganancia,
                        totalCapacidad: acc.totalCapacidad + capacidad,
                        totalAsistencia: acc.totalAsistencia + asistencia
                    }
                    return obj_acc;
                }, { totalGanancia: 0, totalCapacidad: 0, totalAsistencia: 0 })
                porcentajeAsistencia = (obj_acc.totalAsistencia / obj_acc.totalCapacidad * 100).toFixed(2);
                categoryPastArrayInnerHtml.push(`<tr>
            <td>${event.category}</td>
            <td>$ ${obj_acc.totalGanancia}</td>
            <td>${porcentajeAsistencia}%</td>
            </tr>`)
            };
        })
        document.getElementById("PastCategories").innerHTML = categoryPastArrayInnerHtml.join("");
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}
createTable()

async function createTableColumn() {
    try {
        let urlApi = "https://mindhub-xj03.onrender.com/api/amazing?time=upcoming"
        let fetchResponse = await fetch(urlApi)
        let response = await fetchResponse.json()
        let upcomingEvArray = [];
        
        for (let event of response.events) {
            upcomingEvArray.push(event);
        }
        
        let categoryUpcomingArray = [];
        let categoryUpcomingArrayFilter = [];
        let categoryUpcomingArrayInnerHtml = [];
        
        upcomingEvArray.forEach(event => {
            let estimado = "";
            let capacidad = "";
            let precio = "";
            let ganancia = "";
            let porcentajeEstimado = "";
            let obj_acc = {};
            
            if (!categoryUpcomingArray.includes(event.category)) {
                categoryUpcomingArray.push(event.category);
                categoryUpcomingArrayFilter = upcomingEvArray.filter(e => e.category == event.category)
                
                categoryUpcomingArrayFilter.reduce((acc, current) => {
                    estimado = (Math.trunc((current.capacity / current.assistance) * 100)) || current.estimate; ///
                    precio = current.price;
                    ganancia = current.price * estimado;  ///
                    capacidad = current.capacity;
                    obj_acc = {
                        totalGananciaEstimada: acc.totalGananciaEstimada + ganancia,
                        totalCapacidad: acc.totalCapacidad + capacidad,
                        totalAsistenciaEstimada: acc.totalAsistenciaEstimada + estimado
                    }
                    return obj_acc;
                }, { totalGananciaEstimada: 0, totalCapacidad: 0, totalAsistenciaEstimada: 0 });
                porcentajeEstimado = ((obj_acc.totalAsistenciaEstimada / obj_acc.totalCapacidad) * 100).toFixed(2);
                categoryUpcomingArrayInnerHtml.push(`<tr>
            <td>${event.category}</td>
            <td>$ ${obj_acc.totalGananciaEstimada}</td>
            <td>${porcentajeEstimado}%</td>
            </tr>`)
            };
            console.log(obj_acc)
            console.log(categoryUpcomingArrayInnerHtml)


        })
        document.getElementById("UpCategories").innerHTML = categoryUpcomingArrayInnerHtml.join("");
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}


createTableColumn()