"use strict";
//Creación de un objeto EventoService 
let eventoService = new EventoService();
let newEventForm = null;
let imgPreview = null;

document.addEventListener("DOMContentLoaded", e => {
    //Llamada a la función getEventos() para que cargue los eventos de la base de datos
    getEventos();

    newEventForm = document.getElementById("newEvent");
    imgPreview = document.getElementById("imgPreview");

    newEventForm.image.addEventListener('change', loadImage);
    newEventForm.addEventListener('submit', validateForm);
});

async function getEventos() {
    //Llamada al método getEvents() del objeto eventoService
    let eventList = await eventoService.getEvents();
    //Recorrer el json devuelto por el método, llamando a la función showEvent()
    eventList.forEach(e => showEvent(e));
}

async function validateForm(event) {
    event.preventDefault();

    let ok = true;
    // Comprobamos todos los campos para detectar alguno vacío.
    Array.from(newEventForm.querySelectorAll(".form-control")).forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
        if(!input.value) {
            input.classList.add("is-invalid");
            ok = false;
        } else {
            input.classList.add("is-valid");
        }
    });

    if (ok) {
        const name = newEventForm.name.value;
        const image = document.getElementById("imgPreview").src;
        const date = newEventForm.date.value;
        const description = newEventForm.description.value;
        const price = +newEventForm.price.value;

        let newEvent = {name, image, date, description, price};
        try {
            const evento = await eventoService.post(newEvent);
            showEvent(evento);
            newEventForm.reset();
            newEventForm.querySelectorAll(".is-valid").forEach(input => input.classList.remove("is-valid"));
            imgPreview.classList.add("d-none");
        } catch (e) {
            console.log(e);
        }
    }
}

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        imgPreview.src = reader.result;
        imgPreview.classList.remove("d-none");
    });
}

function showEvent(event) {
    let container = document.getElementById("eventsContainer");

    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = event.image;
    card.append(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.append(cardBody);

    let cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = event.title;
    cardBody.append(cardTitle);


    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = event.description;
    cardBody.append(cardText);

    let delButton = document.createElement("button");
    delButton.className = "btn btn-danger";
    delButton.innerText = "Delete";
    cardBody.append(delButton);

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.append(cardFooter);

    let footerText = document.createElement("small");
    footerText.classList.add("text-muted");
    const date = new Date(event.date);
    footerText.textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    cardFooter.append(footerText);

    let priceText = document.createElement("span");
    priceText.classList.add("float-right");
    priceText.textContent = (+event.price).toFixed(2) + "€";
    footerText.append(priceText);

    //Se programa el evento click del botón, para borrar el evento de la base de datos (y del HTML)
    delButton.addEventListener("click", async e => {
        let del = confirm("¿Seguro que quieres borrar el evento?");
        if(del) {
            //Llamada a la función delete() para eliminar el evento de la base de datos
            await eventoService.delete(event.id);
            //Eliminamos la tarjeta del HTML
            card.remove();
        }  
    });
    container.append(card);
}
