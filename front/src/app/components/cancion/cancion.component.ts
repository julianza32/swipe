import { Component, OnInit, AfterViewInit,Renderer2,ElementRef, ViewChild } from '@angular/core';
import {CancionService}from '../../services/cancion.service'
@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit,AfterViewInit {
  @ViewChild('Fondoimg') imgF:ElementRef;
  @ViewChild('fondoA') fondoA:ElementRef;
  
  public infoCancion = JSON.parse(localStorage.getItem('infoCancion'));
  public rutaImagen;
  public LoadedImg;
  public url: String;
  
  constructor(private renderer: Renderer2, private cancionService: CancionService) {
    this.url = cancionService.url;
    this.LoadedImg = this.infoCancion.imagenc;
   }

  

  ngAfterViewInit(){
    this.rutaImagen = this.url + 'obtenerImgCancion/'+this.infoCancion.imagenc;
    console.log(this.rutaImagen);
    
    let y, i;
    y = document.querySelectorAll(".contenedorF");
    for (i=0;i<y.length; i++){
      y[i].style.backgroundImage = 'url('+this.rutaImagen+')';
    }
  }


  ngOnInit(): void {

    /*this.infoCancion;

    let rutaImagen = this.url + 'obtenerImgCancion/'+this.infoCancion.imagenc;

    let y, i;
    y = document.querySelectorAll(".contenedorF");
    for (i=0;i<y.length; i++){
      y[i].style.backgroundImage = 'url('+rutaImagen+')';
    }*/
  }
 
  ngDoCheck()
  {
    this.infoCancion = JSON.parse(localStorage.getItem('infoCancion'));
    //console.log(this.LoadedImg +","+this.infoCancion.imagenc);
    
    if(this.LoadedImg != this.infoCancion.imagenc){
      this.LoadedImg = this.infoCancion.imagenc;
      this.rutaImagen = this.url + 'obtenerImgCancion/'+this.infoCancion.imagenc;

      this.fondoA.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
      this.imgF.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
    }
  }
}
