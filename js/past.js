// Funcion de selectores
const $ = selector => document.querySelector(selector);

// varibales sellecionadas
const $cards_past = $( "#cards-past" );
const $checkbox_Selector = $("#checkbox-selector");
const $text_input = $("#search-input");

// Datos según categoria
const listaCategorias = Array.from( new Set( data.events.map( event => event.category ) ) )

//inputs check template
const crearChecked = dato => `<div class="form-check form-check-inline check-box">
        <input class="form-check-input" type="checkbox" id="${dato}" value="${dato}">
        <label class="form-check-label" for="${dato}">${dato}</label>
    </div>
    `

// Mensaje cuando no se encuentra nada
const crearh2Alerta = () => `<h2 class="text-center mb-4"> The element was not found </h2>`

// tarjetas template
const crearTarjeta = array =>
        `<div class="col-12 col-md-6 col-lg-3 mb-3">
        <div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <img src="${array.image}" class="card-img-top" alt="${array.name}">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <div class="d-flex justify-content-around">
                        <span class="badge text-bg-primary ">${array.place}</span>
                    </div>
                    <h5 class="card-title text-center mt-2">${array.name}</h5>
                    <p class="card-text text-center">${array.description}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text ">Price $${array.price}</p>
                    <a href="./details.html?id=${array._id}" class="btn btn-info">Info</a>
                </div>
            </div>
        </div>
    </div>
    `

//Checked innerHTML
function ponerChecked( array, element ){
    let template = '';
    for( let event of array ){
        template += crearChecked( event )
    }
    element.innerHTML = template;
}

function filtradoPast(array){
    return array.filter(event => event.date < data.currentDate);
}

// Tarjetas innerHTML
function ponerTarjetas(array, element){
    let template = '';
    if (array.length == 0){
        template = crearh2Alerta();
        element.innerHTML = template;
    }
    for( let event of array ){
            template += crearTarjeta( event )
        }
    element.innerHTML = template;
}

// Eventos
$checkbox_Selector.addEventListener( 'change', e => ponerTarjetas(filtroCruzado(),$cards_past))
$text_input.addEventListener("input", e => ponerTarjetas(filtroCruzado(),$cards_past ));

//filtrados
function filtroCheckBox( array ){
    const $check_box = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    const arrayValues = $check_box.map(e => e.value);
    if (arrayValues.length === 0){
        return array;
    }
    const arrayFiltrado = array.filter(event => {
        return arrayValues.includes(event.category)
        }
    )
    console.log(arrayFiltrado)
    return arrayFiltrado;
} 

//filtro search
function filtroSearch( array ){
    const stringValue = $text_input.value.toLowerCase();
    if (stringValue.length === 0){
        return array;
    }
    const arrayString = array.filter(event => {
        return event.name.toLowerCase().includes(stringValue);
        }
    )
    return arrayString;
}

function filtroCruzado(){
    return filtroCheckBox(filtroSearch(filtradoPast(data.events)))
}

    
ponerTarjetas( filtradoPast(data.events) , $cards_past );
ponerChecked(listaCategorias , $checkbox_Selector);