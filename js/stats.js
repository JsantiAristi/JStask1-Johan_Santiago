// Funcion de selectores
const $ = selector => document.querySelector(selector);


// varibales sellecionadas
const $first_table = $( "#first-table" );
const $second_table = $( "#second-table" );
const $third_table = $( "#third-table" );

//tabla 2
const categories = {}

//tabla 3
const categories2 = {}

//fetch de mi array de datos
function traerDatos() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(datos => {
        // Pongo la primera tabla
        ponerTablaObject(resultadoMayorPorcentaje(datos.events,datos) , resultadoMenorPorcentaje(datos.events,datos) , resultadoMasCapacidad(datos.events), $first_table);

        // Procesamos cada evento
        filtradoUpcoming(datos.events,datos).forEach(event => {
            // Si la categoría no existe la creamos
            if (!categories[event.category]) {
                categories[event.category] = {
                    price: 0,
                    estimate: 0,
                    capacity: 0
                }
            }
            // Sumamos los ingresos la asistencia y la capacity a la categoría correspondiente
            categories[event.category].price += event.price * event.estimate
            categories[event.category].capacity += event.capacity
            categories[event.category].estimate += event.estimate
        })
        console.log(categories);
        // Mostramos la información de cada categoría
        ponerTabla2(categories , $second_table)

        // Procesamos cada evento tabla past
        filtradoPast(datos.events,datos).forEach(event => {
            // Si la categoría no existe la creamos
            if (!categories2[event.category]) {
                categories2[event.category] = {
                    price: 0,
                    assistance: 0,
                    capacity: 0
                }
            }
            // Sumamos los ingresos la asistencia y la capacity a la categoría correspondiente
            categories2[event.category].price += event.price * event.assistance
            categories2[event.category].capacity += event.capacity
            categories2[event.category].assistance += event.assistance
        })
        console.log(categories2);
        // Mostramos la información de cada categoría
        ponerTabla3(categories2 , $third_table)

        })
        .catch(error => console.log(error));
}

traerDatos();

//-------------------------------------------------------------------//

// filtrado por fecha
function filtradoPast(array,obj){
    return array.filter(event => event.date < obj.currentDate);
}

// filtradp upcoming
function filtradoUpcoming(array,obj){
    return array.filter(event => event.date >= obj.currentDate);
}

// tabla 1 estadísticas
// evento con mayor porcentaje de asistencia
const resultadoMayorPorcentaje = (array,obj) => filtradoPast(array,obj).sort((evento1, evento2) => {
    return (
        (evento1.assistance / evento1.capacity) * 100 -
        (evento2.assistance / evento2.capacity) * 100
    );
}).slice(-1)[0];

// evento con mayor porcentaje de asistencia
const resultadoMenorPorcentaje = (array,obj) => filtradoPast(array,obj).sort((evento1, evento2) => {
    return (
        (evento1.assistance / evento1.capacity) * 100 -
        (evento2.assistance / evento2.capacity) * 100
    );
}).slice(0,1)[0];

// evento con mayor capacidad
const resultadoMasCapacidad = (array) => array.sort((evento1, evento2) => {
    return ( evento1.capacity - evento2.capacity);
}).slice(-1)[0];

// creacion de tabla 1
const crearTabla1 = (objMax , objMin , objCapacity) =>
        `
        <tr>
            <td class="firt-row">${objMax.name}</td>
            <td class="second-row">${objMin.name}</td>
            <td>${objCapacity.name}</td>
        </tr>
    `

// creacion tabla 2
const crearTabla2 = (dato1 , dato2 , dato3) => 
    `  
    <tr>
        <td class="firt-row">${dato1} </td>
        <td class="second-row">${dato2} </td>
        <td>${dato3}%</td>
    </tr>
    `

// Colocar tablas en el innerHTML
function ponerTablaObject(objMax , objMin , objCapacity, element){
    let template = '';
    template += crearTabla1(objMax , objMin , objCapacity)
    element.innerHTML = template;
}

// Colocar tabla 2 en el innerHTML
function ponerTabla2 (obj, element){
    let template = '';
    for (const category in obj){
        const prices = obj[category].price
        const estimate = obj[category].estimate
        const capacity = obj[category].capacity
        const porcentaje = ((estimate  / capacity)*100).toFixed(2)
        template += crearTabla2(category , prices , porcentaje)
    }
    element.innerHTML = template;
}

// Colocar tabla 3 en el innerHTML
function ponerTabla3 (obj, element){
    let template = '';
    for (const category in obj){
        const prices = obj[category].price
        const assistance = obj[category].assistance
        const capacity = obj[category].capacity
        const porcentaje = (assistance * 100 / capacity).toFixed(2)
        template += crearTabla2(category , prices , porcentaje)
    }
    element.innerHTML = template;
}