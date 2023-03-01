const $cards_past = document.querySelector( "#cards-past" );

function crearTarjeta(array){
        return `<div class="col-12 col-md-6 col-lg-3 mb-3">
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
                    <a href="./details.html" class="btn btn-success">More info</a>
                </div>
            </div>
        </div>
    </div>
    `       
}

function ponerTarjetas(array, element){
    let template = '';
    for( let event of array ){
        if(event.date < ("2022-01-01")){
            template += crearTarjeta( event )
            console.log(event);
        }
    }
    element.innerHTML = template;
}
    
ponerTarjetas( data.events , $cards_past );