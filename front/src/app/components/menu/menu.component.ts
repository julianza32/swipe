import { AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') menu;
  @ViewChild('inicio') inicio;
  @ViewChild('login') login;
  @ViewChild('registro') registro;
  @ViewChild('registroCancion') registroCancion;


  public url: String;

  constructor(usuarioService: UsuarioService, private renderer: Renderer2) {
    this.url = usuarioService.url
  }
  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  public logo;
  public imgUsu;
  public user;
  public cambioDetectado: boolean;

  ngAfterViewInit() {
    if (!this.sesion) {
      this.renderer.setStyle(this.menu.nativeElement, 'background', 'rgb(222, 222, 222)');
      this.renderer.setStyle(this.inicio.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.login.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.registro.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.registroCancion.nativeElement, 'color', "#312f3b");
      this.logo = "../../assets/img/logoPrueba.png";

    } else if (!this.color) {

      this.renderer.setStyle(this.menu.nativeElement, 'background', 'rgb(222, 222, 222)');
      this.renderer.setStyle(this.inicio.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.login.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.registro.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.registroCancion.nativeElement, 'color', "#312f3b");
      this.logo = "../../assets/img/logoPrueba.png";
    } else {
      this.renderer.setStyle(this.menu.nativeElement, 'background', this.color.fondo);
      this.renderer.setStyle(this.inicio.nativeElement, 'color', this.color.fLetra);
      this.renderer.setStyle(this.login.nativeElement, 'color', this.color.fLetra);
      this.renderer.setStyle(this.registro.nativeElement, 'color', this.color.fLetra);
      this.renderer.setStyle(this.registroCancion.nativeElement, 'color', this.color.fLetra);
      if (this.color.fLetra === "#dedede") {
        this.logo = "../../assets/img/logoBlancoPrueba.png";
      } else {
        this.logo = "../../assets/img/logoPrueba.png";
      }
    }



    if (this.sesion) {
      this.renderer.setStyle(this.login.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.registro.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.registroCancion.nativeElement, 'display', 'none');
      this.imgUsu = this.url + 'obtenerImagen/' + this.sesion.imagen;
      this.user = this.sesion.nombre;
      if (this.sesion.rol === "administrador" || this.sesion.rol === "Administrador") {
        this.renderer.setStyle(this.registroCancion.nativeElement, 'display', 'block');
      }
    } else {
      this.renderer.setStyle(this.registroCancion.nativeElement, 'display', 'none');
    }
  }
  

  ngOnInit(): void {
    this.imgUsu;
  }


  ngDoCheck() {
    if (this.sesion) {
      if (this.user !== this.sesion.nombre) {
        this.cambioDetectado = true;
        //alert(this.cambioDetectado);
      }
    }
  }
}
