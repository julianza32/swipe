import { Component, OnInit } from '@angular/core';
// import {CancionCompent} from '../cancion'
@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {

  public infoCancion = JSON.parse(localStorage.getItem('infoCancion'));

  constructor() { }
  
  ngOnInit(): void {
    this.infoCancion;
  }
 

}
