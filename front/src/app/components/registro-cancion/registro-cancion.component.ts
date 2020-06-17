import { Component, OnInit } from '@angular/core';
//importar modelo
import {Cancion} from '../../model/cancion';
//importar servicio
import{ CancionService} from '../../services/cancion.service';

//import{Router,ActivatedRoute, Params} from '@angular/router';

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
  //variable url
  public url:String;
  //variables de imagen y cancion
  public rutaImagenC;
  public rutaCancion;
  

  constructor(
    private cancionService: CancionService
  ) { 
    this.cancionRegistrada=new Cancion('','',[],'','',0,'','',0,'');
    this.url=cancionService.url;
  }

  ngOnInit(): void {
      this.rutaImagenC=this.url+'obtenerImgCancion/'+this.cancionRegistrada.imagenc;
      this.rutaCancion=this.url+'playMusic/'+ this.cancionRegistrada.archivo;
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

      
       if(!this.cancionRegistrada._id){
        alert("Error al registrar la canción");
       }else{
         alert(`Registraste correctamente la canción ${this.cancionRegistrada.titulo} `);
         //Validación de la carga de la imagen
         if(!this.archivoSubirImg){
           alert('No hay ninguna imagen');
         }else{
           alert(`Tu imagen para la canción ${this.cancionRegistrada.titulo} es: ${this.archivoSubirImg.name}`);
           console.log();
           
           this.cancionService.cargarImagenAlbum(this.archivoSubirImg,this.cancionRegistrada._id).subscribe(
             (result:any)=>{
               console.log(result);
               
               this.cancionRegistrada.imagenc=result.imagenc;
               let rutaImagenC= this.url+'obtenerImgCancion/'+this.cancionRegistrada.imagenc;
               console.log(rutaImagenC);
               //document.getElementById('imgCancion').setAttribute('src', rutaImagenC );
             }
           );
         }
         //Validación de la carga de la canción
         if(!this.archivoSubirMusic){
           alert('No hay ninguna canción');
         }else{
           alert(`Haz elegido el archivo de música: ${this.archivoSubirMusic.name} `);
           this.cancionService.cargarCancion(this.archivoSubirMusic,this.cancionRegistrada._id).subscribe(
             (result:any)=>{
               this.cancionRegistrada.archivo=result.archivo;
               let rutaCancion= this.url+'playMusic/'+this.cancionRegistrada.archivo;
               console.log(rutaCancion);
               //document.getElementById('archivoCancion').setAttribute('src', rutaCancion );
             }
           );
         }
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
