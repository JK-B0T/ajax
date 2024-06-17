"use strict";
//Esta clase para crear un objeto desde el archivo JavaScript principal y poder llamar a sus métodos
class EventoService {
    //En la creación del objeto, se crea dentro un objeto de tipo Http
    constructor() {
        //En la propiedad http del objeto EventoService hay un objeto Http
        this.http = new Http();
    }

    //Método para recoger los eventos de la base de datos
    async getEvents() { // Devuelve Promise<Array<Evento>> con el array de eventos
        //Llamada al método get de la clase http
        const response = await this.http.get(`${SERVER}/eventos`);
        //Array de eventos que devuelve la llamada
        return response.eventos;    
    }

    //Método para crear un evento en la base de datos
    async post(evento) { // Devuelve Promise<Evento> 
        //Llamada al método post de la clase http
        const response = await this.http.post(`${SERVER}/eventos`, evento);
        //Devuelve el evento creado
        return response.evento;
    }

    //Método para eliminar un evento en la base de datos, recibiendo la id para concatenarla en la url
    async delete(id) { // Returns Promise<true>
        //Llamada al método delete de la clase http
        await this.http.delete(`${SERVER}/eventos/${id}`);
    }
}
