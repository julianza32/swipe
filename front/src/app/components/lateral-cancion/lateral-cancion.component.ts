import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../model/cancion';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lateral-cancion',
  templateUrl: './lateral-cancion.component.html',
  styleUrls: ['./lateral-cancion.component.css']
})

export class LateralCancionComponent implements OnInit, AfterViewInit {
  // variable con tipo de modelo
  public _Cancion: Cancion;
  //variable tipo arreglo
    public listaCanciones: any=[];
    //variable de busqueda
    public buscar: String;
     //variable url
  public url:String;
  public urlImg:String;
  //variables de imagen y cancion
  public rutaImagenC;
  //variable de tipo cancion
  public obtenerCanciones: Cancion;

  @ViewChild('menuLateral') menuLateral;
  @ViewChild('collection') collection;
  //@ViewChild('cancion') cancion: ElementRef;


  constructor(private renderer: Renderer2, private _router: Router,
    private cancionService: CancionService) {
      this.url = cancionService.url;
      this.urlImg = cancionService.url+'obtenerImgCancion/';
    }
  

  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    //iniciamos mostrando las canciones disponibles
    this.mostrarCanciones();
    this.color;
    // this.ngAfterViewInit();
  }
  mostrarCanciones() {

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
  buscarCancion(find){
    
    let parametro = {busqueda:find};
    this.cancionService.filtrarCancion(parametro).subscribe(
      (respuesta:any)=>
      {
        console.log(respuesta);
        this.listaCanciones = respuesta.cancion;
      }
    );
  }
 
  mostrarImag(cancionp){
    //let rutaImagenC= this.url+'obtenerImgCancion/'+cancionp.imagenc;
    //document.getElementById('imgCancion').setAttribute('src', rutaImagenC );
  }


  enviarCancion(cancion) {
    // let fichero = cancion.archivo;
    let infoCancion = {
      "album": cancion.album,
      "anio": cancion.anio,
      "archivo": cancion.archivo,
      "artista": cancion.artista,
      "genero": cancion.genero,
      "imagenc": cancion.imagenc,
      "letra": cancion.letra,
      "reprod": cancion.reprod + 1,
    "titulo": cancion.titulo,
    "_id": cancion._id
    }

     
    localStorage.setItem('infoCancion', JSON.stringify(infoCancion));
    this._router.navigate(['/cancion']);


    // let rutaCancion = this.url+'playMusic/'+fichero;
    // this.renderer.setAttribute(this.cancion.nativeElement,"src",rutaCancion);
    // this.cancion.nativeElement.src = rutaCancion;
    
    // this.cancion.nativeElement.play();
  }

}
