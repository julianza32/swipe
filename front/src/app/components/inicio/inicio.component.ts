import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public ListaGenero:any;
  public url:string;

  constructor(private cancionService:CancionService) {
    this.url = cancionService.url;
   }

  ngOnInit(): void {
    this.listarGeneros();
  }

  listarGeneros()
  {
    this.cancionService.listarGeneros().subscribe(
      (response:any)=>{
        let lista = response.canciones;
        this.ListaGenero = lista;
        console.log(this.ListaGenero);
        
      });
  }
}
