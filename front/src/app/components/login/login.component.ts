import { Component, OnInit } from '@angular/core';

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

  //Declarar la varible login 
  public login: Usuario;

  //declarar la varible identidad 
  public identidad;

  constructor(
    private usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.login = new Usuario('', '', '', '', '', 'usuario', '')
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
