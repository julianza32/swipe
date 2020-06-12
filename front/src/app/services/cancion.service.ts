import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import{Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
//variable de ruta de la api
url='http://localhost:3000/api/';
  constructor(
    private _http: HttpClient,
  ) { }
  //servicio registrarC
  registrarC(cancionNueva){
    let params= JSON.stringify(cancionNueva);
    let options={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this._http.post(
      this.url+'subir',
      params,
      options
    ).pipe(map(res=>res));

  }
}
