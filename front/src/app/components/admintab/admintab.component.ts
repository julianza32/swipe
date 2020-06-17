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

  }

  subirArchivoImg(fileInput:any){
    this.archivoSubirImg=<File>fileInput.target.files[0];
  }
  subirArchivoMusic(fileInput:any){
    this.archivoSubirMusic=<File>fileInput.target.files[0];
  }
}
