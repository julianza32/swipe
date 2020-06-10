import { Component, OnInit } from '@angular/core';
//importar el modelo usuario
import {Usuario} from '../../model/usuario';
//Importrar el servicio usuario
import {UsuarioService } from 'src/app/services/usuario.service';
//importar el objeto Router
//ActivatedRoute -> Nos indica una ruta activa
//params -> Una ruta con parametros de Angular ['perfil',nombreArtista] 
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuarioRegistro: Usuario;

  constructor(private usuarioService : UsuarioService,
    private _router: Router
    ){                     
    this.usuarioRegistro= new Usuario('','','','','','usuario','');
  }

  ngOnInit(): void {
  }

  // metodo registrarUsuario()
  registrarUsuario(){
    this.usuarioService.registro(this.usuarioRegistro).subscribe(
      (response:any)=>{
        let usuario = response.usuario;
        this.usuarioRegistro= usuario;

        if(!this.usuarioRegistro._id){
          alert("Error al registrarse");
        }else{
          alert (`Registro Exitoso! inicia sesion con ${this.usuarioRegistro.correo}`);
          this.usuarioRegistro= new Usuario('','','','','','usuario','');
          this._router.navigate(['/login']);
        }
      },error=>{
        var errorMensaje = <any>error;
        if(errorMensaje != null){
          console.log(error);
        }
      });
  }

}

