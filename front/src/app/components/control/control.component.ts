import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  constructor() { }

  ngOnInit(): void {
    this.sesion;
    this.color;
  }

}
