"use strict";

class EventoService {
    constructor() {
        this.http = new Http;
    }

    getEvents() {
        return this.http.get(`${SERVER}/eventos`).then((response) => {
            return response.eventos;
        }).catch(() => {
            console.log("no");
        });
    }
    /*
        Método getEventos() → Llamará a http://SERVER/eventos por ‘GET’. El servidor devolverá
    un objeto JSON con una propiedad llamada eventos que contendrá un array de eventos
    como valor. Devuelve el array de eventos recibido. Ejemplo de respuesta recibida:
    {
    "eventos": [
            {
            "id": 2,
            "name": "Este es un evento",
            "date": "2018-09-24",
            "description": "Descripción del evento",
            "price": 24.95,
            "image":
            "http://localhost:3000/img/2aafb87911d7641787df5fe0f833777a49f64.jpg"
            },
            {
            "id": 3,
            "name": "Otro evento",
            "date": "2018-09-29",
            "description": "Descripción de otro evento",
            "price": 15,
            "image":
            "http://localhost:3000/img/8eb66385c92fa52d27ba838bbf9863212ce90.jpg"
            }
        ]
    }

        Método post(evento) → Llamará a http://SERVER/eventos mediante POST, y enviará
    como datos el evento recibido. El servidor responderá con un JSON que contendrá un
    campo llamado evento, que será el evento insertado con la id generada y la url de la
    imagen.
    {
        "evento": {
        "id": 4,
        "name": "Fin de año",
        "date": "2017-12-31",
        "description": "Si bebes no conduzcas",
        "price": 45.95,
        "image":
        "http://localhost:3000/img/7f3614831ca8187435c087bd6040082375428.jpg"
        }
    }

        Método delete(idEvento) → Llamará al servicio http://SERVER/eventos/:id usando
    DELETE (:id será la id del evento a borrar). El servidor devolverá una respuesta con la
    propiedad id (number) si se ha borrado correctamente, o un error en caso contrario.
    Devuelve dicha id.
    {
    "id": 4,
    }
*/
}