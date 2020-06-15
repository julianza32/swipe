import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Renderer2, Directive } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') menu;
  @Directive({selector:'[lista]'}) lista: ElementRef;


  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    let color = JSON.parse(localStorage.getItem('Tema'));
    if (!color) {
       this.renderer.setStyle(this.menu.nativeElement,'background', 'rgb(222, 222, 222)');
       this.renderer.setStyle(this.lista.nativeElement,'color',"black");
    } else {
      this.renderer.setStyle(this.menu.nativeElement,'background', color);
    }
  }
  ngOnInit(): void {
  }

}
