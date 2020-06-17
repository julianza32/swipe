import { Component, OnInit } from '@angular/core';
//importar el modelo usuario
import { Usuario } from '../../model/usuario';
//Importrar el servicio usuario
import { UsuarioService } from 'src/app/services/usuario.service';
//importar el objeto Router
//ActivatedRoute -> Nos indica una ruta activa
//params -> Una ruta con parametros de Angular ['perfil',nombreArtista] 
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuarioRegistro: Usuario;
  public sesion = JSON.parse(localStorage.getItem('sesion'));
  public color = JSON.parse(localStorage.getItem('Tema'));

  constructor(private usuarioService: UsuarioService,
    private _routes: Router
  ) {
    this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '');
  }

  ngOnInit(): void {
    this.sesion;
    this.color;
    if(this.sesion){
      this._routes.navigate(['/']);
    }
  }

  // metodo registrarUsuario()
  registrarUsuario() {
    this.usuarioService.registro(this.usuarioRegistro).subscribe(
      (response: any) => {
        if (response.usuario) {
          let usuario = response.usuario;
          this.usuarioRegistro = usuario;

          if (!this.usuarioRegistro._id) {
            alert("Error al registrarse");
          } else {
            alert(`Registro Exitoso! inicia sesion con ${this.usuarioRegistro.correo}`);
            this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '');
            this._routes.navigate(['/login']);
          }
        } else {
          alert(response.message);
        }



      }, error => {
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          console.log(error);
        }
      });
  }

}

