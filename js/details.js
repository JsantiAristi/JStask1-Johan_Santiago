// Funcion de selectores
const $ = selector => document.querySelector(selector);

//fetch de mi array de datos
function traerDatos(){
    const objetoDatos = fetch ("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(datos => {
        //cambio en la URL
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        console.log(id);
        // objeto que tiene el Id
        const contieneId = datos.events.find(elemento => elemento._id == id);
        console.log(contieneId);
        // Añadimos las tarjetas
        ponerTarjetas(contieneId,$details)
    })
    .catch (error => console.log(error));
}

// Ejecuto la promesa
traerDatos()

// varibales selecionadas
const $details = $("#detalles");

//inputs check template
const crearDetail = dato => {
    const change = dato.estimate ? "estimate" : "assistance"
    return `<div class="border border-primary rounded mt-5 mb-5 ms-5 me-5">
    <div class="row">
        <div class="col-12 col-md-6 d-flex align-items-center" id="imagen-detalles">
            <img src="${dato.image}" alt="${dato.name}">
        </div>
        <div class="col-12 col-md-6 text-center d-flex flex-column justify-content-between">
            <div>
                <h3 class="pt-2">${dato.name}</h3>
                <h4 class="pt-4 pe-2">${dato.description}</h4>
                <p class="text-center pt-2">Category: ${dato.category}</p>
                <p>Place: ${dato.place}</p>
                <p>Capacity: ${dato.capacity}</p>
                <p>${change} : ${dato[change]}</p>
                <p>price: $${dato.price}</p>
            </div>
            <div>
                <a href="../index.html" class="btn btn-success mb-1 me-2 ms-2 mt-2 d-block">Home</a>
                <a href="../pages/upcoming.html" class="btn btn-info mb-1 me-2 ms-2 mt-2 d-block">Upcoming Events</a>
            </div>
        </div>
    </div>
</div>
` 
}

// Tarjeta innerHTML
function ponerTarjetas( obj, element ){
    let template = '';
    template += crearDetail( obj )
    element.innerHTML = template;
}