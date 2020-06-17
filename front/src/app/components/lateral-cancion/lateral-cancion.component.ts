import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../model/cancion';
@Component({
  selector: 'app-lateral-cancion',
  templateUrl: './lateral-cancion.component.html',
  styleUrls: ['./lateral-cancion.component.css']
})

export class LateralCancionComponent implements OnInit, AfterViewInit {

  // variable con tipo de modelo
  public cancionA: Cancion;
  //variable tipo arreglo
  public listaCanciones: any = [];
  //variable de busqueda
  public buscar: String;

  @ViewChild('menuLateral') menuLateral;
  @ViewChild('collection') collection;
  @ViewChild('cancion') cancion: ElementRef;

  public obtenerCanciones: Cancion;
  public url: String;

  constructor(private renderer: Renderer2,
    private cancionService: CancionService) {
      this.url = cancionService.url;
    }
  

  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  // public listaCanciones: any;

  ngAfterViewInit() {
    let y, i;
    y = document.querySelectorAll(".collection-item");

    if (!this.sesion) {
      this.renderer.setStyle(this.menuLateral.nativeElement, 'background', 'rgb(222, 222, 222)');
      this.renderer.setStyle(this.menuLateral.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.collection.nativeElement, 'background', 'rgb(222, 222, 222)');

      for (i = 0; i < y.length; i++) {
        y[i].style.background = "#dedede";
        y[i].style.boxShadow = "15px 15px 30px #666666, -15px -15px 30px #ffffff";

      }
    } else if (!this.color) {
      this.renderer.setStyle(this.menuLateral.nativeElement, 'background', 'rgb(222, 222, 222)');
      this.renderer.setStyle(this.menuLateral.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.collection.nativeElement, 'background', 'rgb(222, 222, 222)');
      for (i = 0; i < y.length; i++) {
        y[i].style.background = "#dedede";
        y[i].style.boxShadow = "15px 15px 30px #666666, -15px -15px 30px #ffffff";
      }
    } else {
      this.renderer.setStyle(this.menuLateral.nativeElement, 'background', this.color.fondo);
      this.renderer.setStyle(this.menuLateral.nativeElement, 'color', this.color.fLetra);
      this.renderer.setStyle(this.collection.nativeElement, 'background', this.color.fondo);
      for (i = 0; i < y.length; i++) {
        y[i].style.background = this.color.fondo;
        y[i].style.boxShadow = this.color.sombra;
      }
    }
  }

  ngOnInit(): void {
    this.mostrarCanciones();
    this.url;
  }
  
mostrarCanciones(){
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

reproCancion(fichero){
  let rutaCancion = this.url+'playMusic/'+fichero;
  // this.renderer.setAttribute(this.cancion.nativeElement,"src",rutaCancion);
  this.cancion.nativeElement.src = rutaCancion;
  
  this.cancion.nativeElement.play();
}

// listarCanciones(){
//   this.cancionService.listarCanciones().subscribe(
//     (response: any) => {
//       console.log(response);
//       this.listaCanciones = response;
//     }
//   );
//}

}
