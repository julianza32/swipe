import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cancion } from '../../model/cancion';
import { CancionService } from '../../services/cancion.service';


@Component({
  selector: 'app-admintab',
  templateUrl: './admintab.component.html',
  styleUrls: ['./admintab.component.css']
})
export class AdmintabComponent implements OnInit {
  
  @ViewChild('player') player:ElementRef;
  @ViewChild('_id') id:ElementRef;

  public cancionTrabajada: Cancion;
  public url:String;

  public archivoSubirImg: File;
  public archivoSubirMusic: File;

  public rutaImagenC;
  public rutaCancion;
  
  public listaCanciones:any; 

  constructor(private cancionService:CancionService) 
  {
    this.cancionTrabajada=new Cancion('','',[],'','',0,'','',0,'');
    
    this.url = cancionService.url;
  }

  ngOnInit(): void {
    
    this.ListarCanciones();
  }

  ngDoCheck()
  {
    console.log(this.rutaImagenC+","+this.cancionTrabajada.imagenc);
    
  }


  
  playsong()
  {
    this.player.nativeElement.play();
  }
  
  deleteId()
  {
    //this.id.nativeElement.value="";
    this.cancionTrabajada=new Cancion('','',[],'','',0,'','',0,'');
  }

  ListarCanciones()
  {
    this.cancionService.listarCanciones().subscribe(
      (response:any)=>{
        console.log(response);
        this.listaCanciones=response;
      }
    );
    
    
  }

  modCancion(id)
  {
    this.cancionService.buscarCancion(id).subscribe(
      (response:any)=>{
        this.cancionTrabajada = response.cancion;
        console.log(this.cancionTrabajada);
        this.rutaImagenC=this.url+'obtenerImgCancion/'+this.cancionTrabajada.imagenc;
        this.player.nativeElement.src = this.url+'playMusic/'+ this.cancionTrabajada.archivo;
    });

    
    
  }
  delCancion(id)
  {
    this.cancionService.eliminarC(id).subscribe(
      (response:any)=>{
        alert(response.message);
        this.listaCanciones();
      }
    );
  }

  ProcesarFormulario()
  {
    if(this.cancionTrabajada._id)
    {
      this.cancionService.actualizarC(this.cancionTrabajada,this.cancionTrabajada._id).subscribe(
        (response:any)=>{
          let cancionMod=response.cancion;
          if(!cancionMod._id)
          {
            alert("Error al modificar cancion");
          }else{
            alert(`se ha modificado correctamente ${cancionMod.titulo}`);
            if(!this.archivoSubirImg){
              alert('No hay ninguna imagen');
            }else{
              alert(`Tu imagen para la canción ${cancionMod.titulo} es: ${this.archivoSubirImg.name}`);
              console.log();
              
              this.cancionService.cargarImagenAlbum(this.archivoSubirImg,cancionMod._id).subscribe(
                (result:any)=>{
                  console.log(result);
                  
                  this.cancionTrabajada.imagenc=result.imagenc;
                  let rutaImagenC= this.url+'obtenerImgCancion/'+this.cancionTrabajada.imagenc;
                  console.log(rutaImagenC);
                  //document.getElementById('imgCancion').setAttribute('src', rutaImagenC );
                }
              );
            }
              
              if(!this.archivoSubirMusic){
                alert('No hay ninguna canción');
              }else{
                alert(`Haz elegido el archivo de música: ${this.archivoSubirMusic.name} `);
                this.cancionService.cargarCancion(this.archivoSubirMusic,cancionMod._id).subscribe(
                  (result:any)=>{
                    this.cancionTrabajada.archivo=result.archivo;
                    let rutaCancion= this.url+'playMusic/'+this.cancionTrabajada.archivo;
                    console.log(rutaCancion);
                    //document.getElementById('archivoCancion').setAttribute('src', rutaCancion );
                  }
                );
              }
          }
 
          this.ListarCanciones();
        }
      );
    }else{
      this.cancionTrabajada._id='';
      this.cancionService.registrarC(this.cancionTrabajada).subscribe(
        (response:any)=>{
          let newCancion=response.cancion;
          if(!newCancion._id){
            alert("Error al registrar la canción");
           }else{
             alert(`Registraste correctamente la canción ${newCancion.titulo} `);
             //Validación de la carga de la imagen
             if(!this.archivoSubirImg){
               alert('No hay ninguna imagen');
             }else{
               alert(`Tu imagen para la canción ${newCancion.titulo} es: ${this.archivoSubirImg.name}`);
               console.log();
               
               this.cancionService.cargarImagenAlbum(this.archivoSubirImg,newCancion._id).subscribe(
                 (result:any)=>{
                   console.log(result);
                   
                   this.cancionTrabajada.imagenc=result.imagenc;
                   let rutaImagenC= this.url+'obtenerImgCancion/'+this.cancionTrabajada.imagenc;
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
               this.cancionService.cargarCancion(this.archivoSubirMusic,newCancion._id).subscribe(
                 (result:any)=>{
                   this.cancionTrabajada.archivo=result.archivo;
                   let rutaCancion= this.url+'playMusic/'+this.cancionTrabajada.archivo;
                   console.log(rutaCancion);
                   //document.getElementById('archivoCancion').setAttribute('src', rutaCancion );
                 }
               );
             }
             this.cancionTrabajada=new Cancion('','',[],'','',0,'','',0,'');
           }
          this.ListarCanciones();
        }
      );
    }
    
  }

  subirArchivoImg(fileInput:any){
    this.archivoSubirImg=<File>fileInput.target.files[0];
  }
  subirArchivoMusic(fileInput:any){
    this.archivoSubirMusic=<File>fileInput.target.files[0];
  }
}
