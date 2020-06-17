import { AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

//Importar el modelo 
import { Usuario } from '../../model/usuario'
//Importar el servicio
import { UsuarioService } from '../../services/usuario.service';
//Importar el manejador de rutas
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('Clogin') Login;  
@ViewChild('container') Container;  

  //Declarar la varible login 
  public login: Usuario;

  //declarar la varible identidad 
  public identidad;

  constructor(
    private usuarioService: UsuarioService,
    private _router: Router,
    private renderer : Renderer2
  ) {
    this.login = new Usuario('', '', '', '', '', 'usuario', '')
  }

  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  ngAfterViewInit() {
    if (!this.sesion) {
      this.renderer.setStyle(this.Container.nativeElement, 'background', 'rgb(222, 222, 222)');
      this.renderer.setStyle(this.Login.nativeElement, 'color', "#312f3b");
      this.renderer.setStyle(this.Login.nativeElement, 'box-shadow', "15px 15px 30px #666666, -15px -15px 30px #ffffff");
      document.querySelectorAll('button')[0].style.boxShadow="15px 15px 30px #666666, -15px -15px 30px #ffffff";       
      document.querySelectorAll('button')[0].style.color = "#312f3b";       
      document.querySelectorAll('button')[0].style.background = "#dedede";
    
    }
  }
  









  ngOnInit(): void {
  }
  //-- Metodo loginUsuario que consumira el servicio iniciarSesion ---
  loginUsuario() {
    this.usuarioService.iniciarSesion(this.login).subscribe(
      (response: any) => {
        let usuario = response.usuario;
        this.login = usuario;
        if(this.login){
          let usuarioLogueado = new Usuario(
            this.login._id,
            this.login.nombre,
            this.login.apellido,
            this.login.correo,
            this.login.contrasena,
            this.login.rol,
            this.login.imagen
          );

          //Crear el objeto de localStorage 
          localStorage.setItem('sesion',JSON.stringify(usuarioLogueado));
          // consumir el servicio obtnerNombreUsuario
          this.identidad = this.usuarioService.obtenerNombreUsuario();
          alert(`Hola ${this.identidad.nombre} !! Bienvenid@`);
          //Redireccion al perfil
          this._router.navigate(['/perfil']);
        }else{
          alert('Usuario no identificado');
        }
        //Cierre validacion de usuario loguedo 
      },error =>{
        if(error != null){
          console.log(error);
        }
      }

    );
  }
  //-- Fin metodo




















}
