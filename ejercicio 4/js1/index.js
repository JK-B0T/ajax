"use strict";

// Edita sólo este fichero

window.addEventListener("DOMContentLoaded", main, false);

function main () {
/*
index.js
Tendrá casi la misma funcionalidad que en el ejercicio anterior pero esta vez utilizando
servicios web.
Lo primero que haremos será crear un objeto de la clase EventoService y llamar al
método Evento.getEventos() y asignar el array de eventos recibido a una variable global.
A continuación muestra todos los eventos del array al usuario, generando el HTML de
cada card como en el ejercicio anterior incluyendo además un botón para eliminar el
evento (mira el código de index.html para un ejemplo de estructura).
Debemos asignar el evento ‘click’ al botón de borrar, que llamará al método delete() del
objeto EventoService, y si el evento se borra correctamente (no hay error), debemos
eliminarlo del array global de eventos y del HTML (puedes eliminar el elemento del HTML
directamente, o volver a reconstruirlos todos a partir del array que ya no contiene el
evento).
...
botonBorrar.addEventListener("click", e => {
// Borrar evento
});
...
También controlaremos el envío del formulario, validando que no haya ningún campo
vacío y enviando el evento al servidor (crea un objeto JSON que represente al evento a
partir de dicho formulario y llama al método post() del objeto EventoService). Si todo ha
ido bien, añade el evento al array global y muéstralo. Si hay algún error, sería suficiente
con imprimirlo por consola.
*/
const Servicios = new EventoService;
const response = Servicios.getEvents();//.then(respuesta => console.log(respuesta, typeof respuesta,respuesta.eventos));
console.log(response, typeof response,response.eventos);

const imgPreview = document.querySelector("#imgPreview");
const input = document.querySelector("#image");
const form = document.querySelector("#newEvent");

const inputArray = Array.from(document.querySelectorAll("input:not([type='button'])"));
inputArray.splice(2, 0, document.querySelector("textarea"));

form.addEventListener("submit", checkInputsValidation, false);

    function checkInputsValidation(event) {
        event.preventDefault();
        let isFormValid = true;

        inputArray.map((element) => {
            console.log(element, element.value);
            if (element.value === "") {
                if (!element.classList.contains("is-invalid")) {
                    element.classList.add("is-invalid");
                }
                if (element.classList.contains("is-valid")) {
                    element.classList.remove("is-valid");                  
                }
            } else {
                if (!element.classList.contains("is-valid")) {
                    element.classList.add("is-valid");
                }
                if (element.classList.contains("is-invalid")) {
                    element.classList.remove("is-invalid");                  
                }
            } 
            if (element.classList.contains("is-invalid")) {
                isFormValid = false;
            }  
        });
       
        if (isFormValid === true) {
            createEvent();
            addEvent();
            resetForm();
        }
    }

    function resetForm () {
        inputArray.map((element) => {
            if (element.classList.contains("is-valid")) {
                element.classList.remove("is-valid");
            } else if (element.classList.contains("is-invalid")){
                element.classList.remove("is-invalid");
            }
            imgPreview.classList.add("d-none");
            form.reset();
        });
    }

    function addEvent () {
        return {
            id: "??????",
            name: inputArray[0].value,
            descripton: inputArray[1].value,
            image: imgPreview.src,
            price: inputArray[2].value,
            date: inputArray[3].value,
        }
    }

    function createEvent () {
        const date = new Date(inputArray[1].value + 'T00:00:00');
        const formatedDate = new Intl.DateTimeFormat('es-ES').format(date);

        let fatherNode = document.querySelector("#eventsContainer");
        //div contenedor -
        let container = document.createElement("div");
        container.setAttribute("class", "card");
        //imagen --
        let element = document.createElement("button");
        element.setAttribute("type", "button");
        element.addEventListener("click", () => {
            //Abrir dialog
            //Eliminar elemento
            //Eliminar datos
        }, false);
        container.append(element);
        //imagen --
        element = document.createElement("img");
        element.setAttribute("class", "card-img-top");
        element.setAttribute("src", imgPreview.src);
        container.append(element);
        //div del cuerpo --
        element = document.createElement("div");
        element.setAttribute("class", "card-body");
        //cuerpo > h4 ---
        let childElement = document.createElement("h4");
        childElement.setAttribute("class", "card-title");
        let elementText = document.createTextNode(inputArray[0].value);
        childElement.append(elementText);
        element.append(childElement);
        //cuerpo > p ---
        childElement = document.createElement("p");
        childElement.setAttribute("class", "card-text");
        elementText = document.createTextNode(formatedDate);
        childElement.append(elementText);
        element.append(childElement);
        container.append(element);
        //div del footer --
        element = document.createElement("div");
        element.setAttribute("class", "card-footer");
        //footer > small ---
        childElement = document.createElement("small");
        childElement.setAttribute("class", "text-muted");
        elementText = document.createTextNode(inputArray[2].value);
        childElement.append(elementText);
        //small > span ----
        let youngestElement = document.createElement("span");
        youngestElement.setAttribute("class", "float-right");
        elementText = document.createTextNode(inputArray[3].value + " €");
        youngestElement.append(elementText);
        childElement.append(youngestElement);

        element.append(childElement);
        container.append(element);
        fatherNode.append(container);

        /*
        <div class="card">
          <button type="button">X</button>
          <img class="card-img-top" src="image_base64">
          <div class="card-body">
            <h4 class="card-title">Nombre del evento</h4>
            <p class="card-text">Descripción.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
			        dd/mm/yyyy
			        <span class="float-right">Precio €</span>
	          </small>
          </div>
        </div>
        */
    }

    input.addEventListener("change", (e) => {
        const file = input.files[0];

        if (file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener("load", e => {
                imgPreview.classList.remove("d-none");
                imgPreview.src = reader.result;
            })
        }
    }, false);
}