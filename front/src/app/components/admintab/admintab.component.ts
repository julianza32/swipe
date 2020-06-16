import { Component, OnInit } from '@angular/core';
import { Cancion } from '../../model/cancion';
import { CancionService } from '../../services/cancion.service';


@Component({
  selector: 'app-admintab',
  templateUrl: './admintab.component.html',
  styleUrls: ['./admintab.component.css']
})
export class AdmintabComponent implements OnInit {
  
  public cancionRegistrada: Cancion;
  public url:String;

  public archivoSubirImg: File;
  public archivoSubirMusic: File;

  public rutaImagenC;
  public rutaCancion;
  
  public listaCanciones:any; 

  constructor(private cancionService:CancionService) 
  {
    this.cancionRegistrada=new Cancion('','',[],'','',0,'','',0,'');
    
    this.url = cancionService.url;
  }

  ngOnInit(): void {
    this.rutaImagenC=this.url+'obtenerImgCancion/'+this.cancionRegistrada.imagenc;
    this.rutaCancion=this.url+'playMusic/'+ this.cancionRegistrada.archivo;
  }

  ListarCanciones()
  {
    //this.listaCanciones = this.cancionService.
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
