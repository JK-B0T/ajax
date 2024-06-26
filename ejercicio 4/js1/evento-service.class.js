"use strict";

class EventoService {
    constructor() {
        this.http = new Http;
    }

    getEvents() {
        return this.http.get(`${SERVER}/eventos`).then((response) => {
            return response.eventos;
        }).catch((error) => {
            console.log("Error al devolver los eventos", error.message);
        });
    }

    post(evento) {
        return this.http.post(`${SERVER}/eventos`, evento).then((response) => {
            return response.evento;
        }).catch((error) => {
            console.log("Error al enviar el evento", error.message);
            console.error("Evento data:", JSON.stringify(evento));
        });
    }

    delete(id) {
        return this.http.delete(`${SERVER}/eventos/${id}`).then((response) => {
            return response.evento;
        }).catch((error) => {
            console.log("Error al borrar el evento", error.message);
        });
    }
}