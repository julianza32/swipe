import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CancionService } from '../../services/cancion.service'
@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit, AfterViewInit {
  @ViewChild('Fondoimg') imgF: ElementRef;
  @ViewChild('fondoA') fondoA: ElementRef;
  @ViewChild('letra') letra: ElementRef;
  @ViewChild('album') album: ElementRef;
  @ViewChild('anio') anio: ElementRef;
  @ViewChild('artistas') artistas: ElementRef;
  @ViewChild('genero') genero: ElementRef;
  @ViewChild('titulo') titulo: ElementRef;
  @ViewChild('cancionSrc') cancionSrc: ElementRef;



  public infoCancion = JSON.parse(localStorage.getItem('infoCancion'));
  public rutaImagen;
  public rutaCancion;
  public LoadedImg;
  public LoadedLetra;
  public url: String;

  constructor(private renderer: Renderer2, private cancionService: CancionService) {
    this.url = cancionService.url;
    this.LoadedImg = this.infoCancion.imagenc;
    this.LoadedLetra = this.infoCancion.letra;
  }


  ngAfterViewInit() {
    this.rutaImagen = this.url + 'obtenerImgCancion/' + this.infoCancion.imagenc;
    console.log(this.rutaImagen);
    this.rutaCancion = this.url + '/playMusic/' + this.infoCancion.archivo;
    this.fondoA.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
    this.imgF.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
    console.log(this.infoCancion.letra);
    this.letra.nativeElement.textContent = this.infoCancion.letra;
    this.album.nativeElement.textContent = "Album: " + this.infoCancion.album;
    this.anio.nativeElement.textContent = "Año: " + this.infoCancion.anio;
    this.artistas.nativeElement.textContent = "Artistas: " + this.infoCancion.artista[0]; 
    this.genero.nativeElement.textContent = "Genero: " + this.infoCancion.genero;
    this.titulo.nativeElement.textContent = "Titulo: " + this.infoCancion.titulo;
    //this.cancionSrc.nativeElement.src = this.rutaCancion;
    //this.cancionSrc.nativeElement.play();
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

  ngDoCheck() {

    this.infoCancion = JSON.parse(localStorage.getItem('infoCancion'));
    //console.log(this.LoadedImg +","+this.infoCancion.imagenc);

    if (this.LoadedImg != this.infoCancion.imagenc) {
      this.LoadedImg = this.infoCancion.imagenc;
      this.rutaImagen = this.url + 'obtenerImgCancion/' + this.infoCancion.imagenc;
      this.rutaCancion = this.url + '/playMusic/' + this.infoCancion.archivo;
      this.fondoA.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
      this.imgF.nativeElement.style = `background-Image: url(${this.rutaImagen})`;
      this.letra.nativeElement.textContent = this.infoCancion.letra;
      this.album.nativeElement.textContent = "Album: " + this.infoCancion.album;
      this.anio.nativeElement.textContent = "Año: " + this.infoCancion.anio;
      this.artistas.nativeElement.textContent = "Artistas: " + this.infoCancion.artista[0];
      this.genero.nativeElement.textContent = "Genero: " + this.infoCancion.genero;
      this.titulo.nativeElement.textContent = "Titulo: " + this.infoCancion.titulo;
      //this.cancionSrc.nativeElement.src = this.rutaCancion;
      //this.cancionSrc.nativeElement.play();

    }
  }
}
