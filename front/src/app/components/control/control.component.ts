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
  public cancionA:Cancion;/* Cancion */;
  public cancionB:Cancion;
  public url:String;
  public audioObj:any;

  
  constructor(
    private cancionService: CancionService
  ) {  
    this.cancionA = new Cancion('','',[],'','',0,'','',0,'');
    this.cancionB = this.cancionA;
    this.url = cancionService.url;
    this.audioObj = new Audio();
   }

  ngOnInit(): void {
    this.sesion;
    this.color;

    this.cancionB = JSON.parse(localStorage.getItem('infoCancion'))/* Cancion */;
      this.audioObj.src = this.url+"playMusic/"+this.cancionB.archivo;
      console.log(this.url+"playMusic/"+this.cancionB.archivo);
      
      this.audioObj.load();
      this.audioObj.play()

    //this.lista();
  }

  ngDoCheck()
  {
    this.cancionA = JSON.parse(localStorage.getItem('infoCancion'))/* Cancion */;
    if(this.cancionA != null)
    {
    if(this.cancionA.titulo != this.cancionB.titulo)
    {
      this.cancionB = JSON.parse(localStorage.getItem('infoCancion'))/* Cancion */;
      let ucancion =this.url+"playMusic/"+this.cancionB.archivo;
      this.audioObj.src = ucancion;
      this.audioObj.load();
      this.audioObj.play();
      console.log(this.cancionB);
      console.log(this.url+"playMusic/"+this.cancionB.archivo+ "cancion en cancionb");
      
      
      console.log(this.audioObj.src +" cancion sonando audio" );
    }
  }
    
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
  console.log(url);
  
   this.audioObj.src=url;
    this.audioObj.load();
    /*this.audioObj.play();*/
  }
  //pausa de canciones
  pausa(){

    this.audioObj.pause();
  }
  play(){

    this.audioObj.play();
    console.log(this.audioObj.src+"play");
    
  }
 
  //pasar a la siguiente cancion
  siguiente(){
    //buscar la siguiente cancion
    let siguienteC:Cancion;
     for(var i=0; i<this.listaCanciones.length; i++){
       var titulo=this.listaCanciones[i].titulo;
       
      if (titulo === this.cancionA.titulo ){
        siguienteC=this.listaCanciones[i+1];
        break;
      }
      //obtener url 
      let urlSig= this.url+'playMusic/'+siguienteC.archivo;
      //reproducir la siguiente cancion
      this.reproducirCancion(urlSig);
      //poner en localhost como canción actual
      localStorage.setItem('infoCancion',JSON.stringify(siguienteC));
    }
    
  }
  //pasar a la siguiente cancion
  atras(){
    //buscar la siguiente cancion
    let anterior:Cancion;//globales
     for(var i=0; i<this.listaCanciones.length; i++){
       var titulo=this.listaCanciones[i].titulo;
       
      if (titulo === this.cancionA.titulo ){
        anterior=this.listaCanciones[i+1];
        break;
      }
      //obtener url 
      let urlAnt= this.url+'playMusic/'+anterior.archivo;
      //reproducir la siguiente cancion
      this.reproducirCancion(urlAnt);
      //poner en localhost como canción actual
      localStorage.setItem('infoCancion',JSON.stringify(anterior));
    }
    
  }

}
