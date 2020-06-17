import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  //variable de ruta de la api
  url = 'http://localhost:3000/api/';
  constructor(
    private _http: HttpClient,
  ) { }
  //servicio registrarC
  registrarC(cancionNueva) {
    let params = JSON.stringify(cancionNueva);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this._http.post(
      this.url + 'subir',
      params,
      options
    ).pipe(map(res => res));

  }
  //servicio actualizar cancion
  actualizarC(cancionActualizar, id) {
    let params = JSON.stringify(cancionActualizar);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this._http.put(
      this.url + 'updateMusic/' + id,
      params,
      options
    ).pipe(map(res => res));
  }
  // servicio eliminar canción
  eliminarC(id) {

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this._http.delete(
      this.url + 'deleteMusic/' + id,
      options
    ).pipe(map(res => res));
  }
  //servicio cargar imagen del albúm
  cargarImagenAlbum(file: File, id) {
    let formData = new FormData();
    formData.append('imagenc', file);
    return this._http.put(
      this.url +'subirImgCancion/' + id,
      formData
    ).pipe(map(res => res));
  }
  obtenerImagenAlbum(file)
  {
    return this._http.get(this.url+'obtenerImgCancion/'+file).pipe(map(res => res));
  }

  //servicio cargar cancion
  cargarCancion(file: File, id) {
    let formData = new FormData();
    formData.append('archivo', file);
    return this._http.put(
      this.url + 'subirCancion/' + id,
      formData
    ).pipe(map(res => res));
  }

  //servicio traer todas las canciones orden asc
  listarCanciones()
  {
    return this._http.get(this.url+'listarCanciones').pipe(map(res=>res));
  }
  listarGeneros()
  {
    return this._http.get(this.url+'obtenerCancionesGenero').pipe(map(res=>res));
  }

  /buscarCancion(id)
  {
    return this._http.get(this.url+'buscarCancion/'+id).pipe(map(res=>res));
  } 

  filtrarCancion(busqueda)
  {
    let params = JSON.stringify(busqueda);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this._http.post(this.url+'buscarCancionEsp',params,options).pipe(map(res=>res));
  }
   //servicio mostrar canciones disponibles
   obtenerCanciones(){
    return this._http.get(this.url+'obtenerCanciones').pipe(map(res=>res));
  }

 
}
