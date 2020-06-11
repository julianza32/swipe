import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';
import { from } from 'rxjs';
import {Router,ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  //Declarar la variable usuariActulizar
  public usuarioActualizar: Usuario;
  //Declaraa la variable archivoSubir de tipo File
  public archivoSubir : File;
  //Declarar la variable identidad
  public identidad;
  //declarar la variable de url
  public url : String;

  //public usuarioActualizar : Usuario;
 public rutaImagen;


  constructor(
    private usuarioService : UsuarioService,
    private _routes:Router
    ) {
      this.url= usuarioService.url
     }

  ngOnInit(): void {
    this.usuarioActualizar=JSON.parse(localStorage.getItem('sesion'));
    this.identidad = this.usuarioService.obtenerNombreUsuario();
    this.rutaImagen = this.url+'obtenerImagen/'+this.usuarioActualizar.imagen; 
  }

  //medoto subirArchivo
  subirArchivo(fileInput:any){
    this.archivoSubir=<File>fileInput.target.files[0];
  }
  //metodo actualizarUsuario
  actualizarUsuario(){
     this.usuarioService.editarUsuario(this.usuarioActualizar._id, this.usuarioActualizar).subscribe(
       (response: any)=>{
        if(response.usuario){
          alert(`Tus datos han sido actulizados satisfactoriamente!!`);
          localStorage.setItem('sesion',JSON.stringify(this.usuarioActualizar));
        
        //Validacion de la carga de la imagen
        if(!this.archivoSubir){
          alert('No hay ninguna imagen');
        }else{
          alert(`Tu imagen es: ${this.archivoSubir.name}`);
          this.usuarioService.cargarImagenUsuario(this.archivoSubir, this.usuarioActualizar._id).subscribe(
            (result: any)=>{
              this.usuarioActualizar.imagen = result.imagen;
              localStorage.setItem('sesion', JSON.stringify(this.usuarioActualizar));

              let rutaImagen= this.url+'obtenerImagen/'+this.usuarioActualizar.imagen;
              console.log(rutaImagen);
                 //document.getElementById('mostrarImagen').setAttribute('src',rutaImagen);
              document.getElementById('imgUsuario').setAttribute('src',rutaImagen);
            }
          )
        }
        
        }else{
          alert(`No se pudo actualizar los datos :(`)
        }
       },error=>{
         if(error != null){
           console.log(error);
         }
       }
     )
  }

  cerrarCuenta(id)
  {
    this.usuarioService.eliminarUsuario(id).subscribe(
      (response:any)=>{

        if(response.usuario)
        {
          alert(response.message);
            localStorage.removeItem('sesion');
            this.identidad = null;
            this._routes.navigate(['/']);
        }else{
          alert(response.message);
        }

      },error=>{
        if(error!=null)
        {
          console.log(error);
          
        }
      });

  }

  cerrarSesion()
  {
    localStorage.removeItem('sesion');
    this.identidad = null;
    this._routes.navigate(['/']);
  }
}
