"use strict";

// Edita sólo este fichero

window.addEventListener("DOMContentLoaded", main, false);

function main () {
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

    function createEvent () {
        const date = new Date(inputArray[1].value + 'T00:00:00');
        const formatedDate = new Intl.DateTimeFormat('es-ES').format(date);

        let fatherNode = document.querySelector("#eventsContainer");
        //div contenedor -
        let container = document.createElement("div");
        container.setAttribute("class", "card");
        //imagen --
        let element = document.createElement("img");
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