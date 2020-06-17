import { Component, OnInit } from '@angular/core';
import {Cancion} from '../../model/cancion';
import {CancionService} from '../../services/cancion.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  //variable tipo arreglo
  public listaCanciones:any[];
  public cancionA: Cancion;
  public url:String;
  public audioObj= new Audio();
  constructor(
    private cancionService: CancionService
  ) { this.url=cancionService.url;
  }

  ngOnInit(): void {
    this.sesion;
    this.color;
  }
  ngDoCheck()
  {
    console.log("Un Cambio");
  }

  //trae la lista de canciones
  lista(){
    this.cancionService.obtenerCanciones().subscribe(
      (response: any) => {
        this.listaCanciones = response.canciones;
      },
      (error) => {
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          console.log(error);
        }
      }
    );
  }
  
  //carga y reproduccion de canciones 
  reproducirCancion(url){
  this.audioObj.src=url;
  this.audioObj.load();
  this.audioObj.play();
  }
  //pausa de canciones
  pausa(){
    this.audioObj.pause();
  }
 
  //pasar a la siguiente cancion
  siguiente(){
    //buscar la siguiente cancion
    let siguiente;
     for(var i=0; i<this.listaCanciones.length; i++){
       var titulo=this.listaCanciones[i].titulo;
       
      if (titulo === this.cancionA.titulo ){
        siguiente=this.listaCanciones[i+1].archivo;
        break;
      }
      //obtener url 
      let urlSig;
      //reproducir la siguiente cancion
      this.reproducirCancion(urlSig);
      //poner en localhost como canción actual
      
    }
    
  }
  

}
