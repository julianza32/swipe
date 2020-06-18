import { Component, OnInit, AfterViewInit,Renderer2,ElementRef } from '@angular/core';
import {CancionService}from '../../services/cancion.service'
@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit,AfterViewInit {

  public infoCancion = JSON.parse(localStorage.getItem('infoCancion'));
  public url: String;
  
  constructor(private renderer: Renderer2, private cancionService: CancionService) {
    this.url = cancionService.url;
   }


  ngAfterViewInit(){
    let rutaImagen = this.url + 'obtenerImgCancion/'+this.infoCancion.imagenc;

    let y, i;
    y = document.querySelectorAll(".contenedorF");
    for (i=0;i<y.length; i++){
      y[i].style.backgroundImage = 'url('+rutaImagen+')';
    }
  }

  ngOnInit(): void {
    this.infoCancion;
  }
 

}
