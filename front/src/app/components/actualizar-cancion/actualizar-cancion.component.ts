import { Component, OnInit } from '@angular/core';
//importar modelo
import {Cancion} from '../../model/cancion';
//importar servicio
import{ CancionService} from '../../services/cancion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-actualizar-cancion',
  templateUrl: './actualizar-cancion.component.html',
  styleUrls: ['./actualizar-cancion.component.css']
})
export class ActualizarCancionComponent implements OnInit {
//variable de cancion
public cancionActualizada: Cancion;
//variables de tipo file
public archivoSubirImg: File;
  public archivoSubirMusic: File;
  //variable url
  public url:String;
  //variables de imagen y cancion
  public rutaImagenC;
  public rutaCancion;

  constructor(
    private cancionService:CancionService
  ) { 
    this.url=cancionService.url;
  }

  ngOnInit(): void {
    this.rutaImagenC=this.url+'obtenerImgCacion/'+this.cancionActualizada.imagenc;
    this.rutaCancion=this.url+'playMusic/'+this.cancionActualizada.archivo;
  }
  //metodo subir cancion 
  subirArchivoImg(fileInput:any){
    this.archivoSubirImg=<File>fileInput.target.files[0];
  }
  subirArchivoMusic(fileInput:any){
    this.archivoSubirMusic=<File>fileInput.target.files[0];
  }

  //metodo actualizarCancion
  actualizarCancion(){
    this.cancionService.actualizarC(this.cancionActualizada,this.cancionActualizada._id).subscribe(
      (response: any)=>{
        if(response.cancion){
          alert ('Los datos de la canción han sido actualizados satisfactoriamente!!');

          //Validación de la carga de la imagen
         if(!this.archivoSubirImg){
          alert('No hay ninguna imagen');
        }else{
          alert(`Tu imagen para la canción ${this.cancionActualizada.titulo} es: ${this.archivoSubirImg}`);
          this.cancionService.cargarImagenAlbum(this.archivoSubirImg,this.cancionActualizada._id).subscribe(
            (result:any)=>{
              this.cancionActualizada.imagenc=result.imagenc;
              let rutaImagenC= this.url+'obtenerImgCancion/'+this.cancionActualizada.imagenc;
              console.log(rutaImagenC);
              document.getElementById('imgCancion').setAttribute('src', rutaImagenC );
            }
          );
        }
        //Validación de la carga de la canción
        if(!this.archivoSubirMusic){
          alert('No hay ninguna canción');
        }else{
          alert(`Haz elegido el archivo de música: ${this.archivoSubirMusic} `);
          this.cancionService.cargarCancion(this.archivoSubirMusic,this.cancionActualizada._id).subscribe(
            (result:any)=>{
              this.cancionActualizada.archivo=result.archivo;
              let rutaCancion= this.url+'playMusic/'+this.cancionActualizada.archivo;
              console.log(rutaCancion);
              document.getElementById('archivoCancion').setAttribute('src', rutaCancion );
            }
          );
        }
        }else{
          alert('No es posible actualizar los datos de la canción');
        }
      }, error=>{
        if (error !=null){
          console.log(error);
        }
      }
    );
  }
  //metodo eliminar cancion
  eliminarCancion(id){
    this.cancionService.eliminarC(id).subscribe(
      (response: any) => {
        if (response.cancion) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      }, error => {
        if (error != null) {
          console.log(error);
        }
      }
    );
  }
}
