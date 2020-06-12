import { Component, OnInit } from '@angular/core';
//importar modelo
import {Cancion} from '../../model/cancion';
//importar servicio
import{ CancionService} from '../../services/cancion.service';

@Component({
  selector: 'app-registro-cancion',
  templateUrl: './registro-cancion.component.html',
  styleUrls: ['./registro-cancion.component.css']
})
export class RegistroCancionComponent implements OnInit {
  //variable tipo cancion 
  public cancionRegistrada: Cancion;
  //variables tipo file
  public archivoSubirImg: File;
  public archivoSubirMusic: File;

  constructor(
    private cancionService: CancionService
  ) { 
    this.cancionRegistrada=new Cancion('','',[],'','',0,'','',0,'');
  }

  ngOnInit(): void {
  }
  //metodo subir cancion 
  subirArchivoImg(fileInput:any){
    this.archivoSubirImg=<File>fileInput.target.files[0];
  }
  subirArchivoMusic(fileInput:any){
    this.archivoSubirMusic=<File>fileInput.target.files[0];
  }
  registrarCancion(){
    this.cancionService.registrarC(this.cancionRegistrada).subscribe(
      (response: any)=>{
       let cancion=response.cancion; 
       this.cancionRegistrada=cancion;

       if(!this.cancionRegistrada._idCancion){
        alert("Error al registrar la canción");
       }else{
         alert(`Registraste correctamente la canción ${this.cancionRegistrada.titulo} `);
         this.cancionRegistrada=new Cancion('','',[],'','',0,'','',0,'');
       }
      },
      (error)=>{
        var errorMensaje=<any>error;
        if(errorMensaje != null){
          console.log(error);
        }
      }
    );
  }

}
