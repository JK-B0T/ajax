"use strict";
//se crea la clase Http 
class Http {
    //Método que recibe los siguientes parámetros para hacer fetch  
    async ajax(method, url, headers = {}, body = null) {
        //Hacemos fetch con la url y un objeto que lleva el método, las cabeceras y puede o no llevar contenido
       const resp = await fetch(url, { method, headers, body});
        //Si el objeto promesa no contiene una respuesta positiva, lanzamos un error
        if(!resp.ok) throw new Error(resp.statusText);
        //Si no hay un error, devolvemos el json contenido en la promesa
        return resp.json(); // promise
   }
   //Método para obtener los eventos de la base de datos
   get(url) {
        //Llamada al método ajax, con el method=GET y la url
       return this.ajax('GET', url);
   }

   //Método para crear un evento en la base de datos
   post(url, data) {
        /*Llamada al método ajax, con el method=POST, la url, 
        la cabecera indicando que es un json y el contenido que es el json creado*/
        return this.ajax('POST', url, {
            'Content-Type': 'application/json'
        }, JSON.stringify(data));
   }
   /*
   put(url, data) {
        return this.ajax('PUT', url, {
            'Content-Type': 'application/json'
        }, JSON.stringify(data));
   }
    */
   //Método para borrar un evento de la base de datos
   delete(url) {
        //Llamada al método ajax, con el method=DELETE y la url
       return this.ajax('DELETE', url);
   }
}