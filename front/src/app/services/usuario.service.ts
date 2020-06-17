import { Injectable } from '@angular/core';

//importar router


//importar El modulo de httpClient
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importar el map 
import { map } from 'rxjs/operators';

// importar el observable
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Injectable()
export class UsuarioService {

  //declarar la variable url de la api
  public url = 'http://localhost:3000/api/';
  //Declarar la variable identidad
  public identidad;

  //Declarar variable privada de tipo HttpClient
  constructor(
    private _http: HttpClient,
  ) { }

  //___________________________________
  //Declarar el metodo del servicio registro

  registro(usuarioNuevo) {
    let params = JSON.stringify(usuarioNuevo);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this._http.post(
      this.url + 'registro',
      params,
      options
    ).pipe(map(res => res));
  }
  //_____________________

  //----------------Iniciar sesion -------------------
  //Declarar el metodo del servicio iniciarSesion
  iniciarSesion(usuarioLogueado) {
    let params = JSON.stringify(usuarioLogueado);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this._http.post(
      this.url + 'login',
      params,
      options
    ).pipe(map(res => res));
  }
  //------------------------------------------
  //Declarar el metodo del servicio obtenerNombreUsuaario
  obtenerNombreUsuario() {
    /*En la varible identidad recogemos los datos
    de nuestro usuario una vez que haya iniciado sesion.
    Estos datos se encuentrar en el local storage */
    let usuarioAutorizado = JSON.parse(localStorage.getItem('sesion'));
    if (usuarioAutorizado != 'undefined') {
      this.identidad = usuarioAutorizado;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }
  //-----------------------------------------------------
  //Declarar el metodo del servicio editarUsuario
  
  editarUsuario(id,usuarioActualizado){
    let params = JSON.stringify(usuarioActualizado);
    let options ={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this._http.put(
      this.url+'actualizar/'+id,
      params,
      options
    ).pipe(map(res=>res));
  }
  //----------------------------------------------
  //Declarar el metodo del servicio cargarImagenUsuario
  cargarImagenUsuario(file: File, id ){
    // instanciamos el objeto FormData que nos permitira enviar la img

    let formData = new FormData();
    formData.append('imagen',file);
    return this._http.put(
      this.url+'subirImagen/'+id,
      formData
    ).pipe(map(res=>res));
  }

  eliminarUsuario(id){ 
    let options = {      
      headers: new HttpHeaders( { 'Content-Type' : 'application/json' } )  
      }  
      
      return this._http.delete(      
        this.url+'eliminarUsuario/'+id,      
        options          
        ).pipe(map(res => res));  

  }

}

 
