import { AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('contenedor') contenedor;
  //Declarar la variable usuariActulizar
  public usuarioActualizar: Usuario;
  //Declaraa la variable archivoSubir de tipo File
  public archivoSubir: File;
  //Declarar la variable identidad
  public identidad;
  //declarar la variable de url
  public url: String;

  //public usuarioActualizar : Usuario;
  public rutaImagen;

  constructor(
    private usuarioService: UsuarioService,
    private _routes: Router,
    private renderer: Renderer2
  ) {
    this.url = usuarioService.url;
  }
  ngAfterViewInit() {

    let color = JSON.parse(localStorage.getItem('Tema'));
    let i, x, y;


    //Condicional para saber si hay un tema guadardado 
    if (color) {
      this.renderer.setStyle(this.contenedor.nativeElement, 'background', color.fondo);
      this.renderer.setStyle(this.contenedor.nativeElement, 'box-shadow', color.sombra);

      y = document.querySelectorAll(".contenido, .imagenPerfil, button");
      for (i = 0; i < y.length; i++) {
        y[i].style.boxShadow = color.sombra;
      }
      //traemos todos los componentes del formulario para darles el estilo
      x = document.querySelectorAll(".input-field, input[type='text'], input[type='email'], input[type='password'], .contenedor, button");
      for (i = 0; i < x.length; i++) {
        x[i].style.color = color.fLetra;
        x[i].style.background = color.fondo;
      }
    } else {
      y = document.querySelectorAll(".contenido, .imagenPerfil, button");
      for (i = 0; i < y.length; i++) {
        y[i].style.boxShadow = "15px 15px 30px #666666, -15px -15px 30px #ffffff";
      }
      //traemos todos los componentes del formulario para darles el estilo
      x = document.querySelectorAll(".input-field, input[type='text'], input[type='email'], input[type='password'], .contenedor, button");
      for (i = 0; i < x.length; i++) {
        x[i].style.color = "#312f3b";
        x[i].style.background = "#dedede";
      }
    }
  }


  //medoto subirArchivo
  subirArchivo(fileInput: any) {
    this.archivoSubir = <File>fileInput.target.files[0];
  }
  //metodo actualizarUsuario
  actualizarUsuario() {
    this.usuarioService.editarUsuario(this.usuarioActualizar._id, this.usuarioActualizar).subscribe(
      (response: any) => {
        if (response.usuario) {
          alert(`Tus datos han sido actulizados satisfactoriamente!!`);
          localStorage.setItem('sesion', JSON.stringify(this.usuarioActualizar));

          //Validacion de la carga de la imagen
          if (!this.archivoSubir) {
            alert('No hay ninguna imagen');
          } else {
            alert(`Tu imagen es: ${this.archivoSubir.name}`);
            this.usuarioService.cargarImagenUsuario(this.archivoSubir, this.usuarioActualizar._id).subscribe(
              (result: any) => {
                this.usuarioActualizar.imagen = result.imagen;
                localStorage.setItem('sesion', JSON.stringify(this.usuarioActualizar));

                let rutaImagen = this.url + 'obtenerImagen/' + this.usuarioActualizar.imagen;
                console.log(rutaImagen);
                //document.getElementById('mostrarImagen').setAttribute('src',rutaImagen);
                document.getElementById('imgUsuario').setAttribute('src', rutaImagen);
              }
            );
          }

        } else {
          alert(`No se pudo actualizar los datos :(`);
        }
      }, error => {
        if (error != null) {
          console.log(error);
        }
      }
    )
  }

  cerrarCuenta(id) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn waves-effect waves-light red darken-1',
        cancelButton: 'btn waves-effect waves-light light-green darken-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Despues tendras que crear una nueva cuenta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarla!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(id).subscribe(
          (response: any) => {

            if (response.usuario) {
              swalWithBootstrapButtons.fire(
                'Borrada!',
                'Tu cuenta ha sido Eliminada.',
                'success'
              )
              localStorage.removeItem('sesion');
              this.identidad = null;
              this._routes.navigate(['/']);
            } else {
              alert(response.message);
            }

          }, error => {
            if (error != null) {
              console.log(error);

            }
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu cuenta no ha sido eliminada :)',
          'error'
        )
      }
    })
  }

  cerrarSesion() {
    localStorage.removeItem('sesion');
    //localStorage.removeItem('Tema');
    this.identidad = null;
    this._routes.navigate(['/']);
    this.refresh()
    // this._routes.navigate(['/']);
  }

  cambiarTema(fondo, fLetra, fSombra) {
    let i, x, y, f;
    //Guardamos en un objeto, los paramtros pasados por la funcion de los botones  

    let tema = {
      "fondo": fondo,
      "fLetra": fLetra,
      "sombra": fSombra
    }
    //Guardamos el objeto en un localStorage
    localStorage.setItem('Tema', JSON.stringify(tema));
    //traemos el selector de la barra de menu
    document.getElementsByTagName('nav')[0].style.background = tema.fondo;

    if (tema.fLetra === "#dedede") {
      //traemos el logo de la barra del menu
      document.querySelectorAll(".logo")[0].setAttribute("src", "../../assets/img/logoBlancoPrueba.png");
    } else {
      //traemos el logo de la barra del menu
      document.querySelectorAll(".logo")[0].setAttribute("src", "../../assets/img/logoPrueba.png");
    }
    //traemos los links del menu 
    f = document.querySelectorAll(".links");
    for (i = 0; i < f.length; i++) {
      f[i].style.color = tema.fLetra;
    }
    //traemos el selector de body para añadirle el color
    document.getElementsByTagName('body')[0].style.background = tema.fondo;

    //traemos los componentes que queremos cambiar el color y las sombras de perfil-usuario
    y = document.querySelectorAll(".contenido, .imagenPerfil, button");
    for (i = 0; i < y.length; i++) {
      y[i].style.boxShadow = fSombra;
      // y[i].style.background = tema.fondo;
    }
    //traemos todos los componentes del formulario para darles el estilo
    x = document.querySelectorAll(".input-field, input[type='text'], input[type='email'], input[type='password'], .contenedor, button");
    for (i = 0; i < x.length; i++) {
      x[i].style.color = tema.fLetra;
      x[i].style.background = tema.fondo;
    }

  }
  refresh(): void {
    window.location.reload();
  }
  ngOnInit(): void {
    console.log(this.rutaImagen);
    let sesion = JSON.parse(localStorage.getItem('sesion'));
    if (!sesion) {
      this._routes.navigate(['/']);
    }

    this.usuarioActualizar = JSON.parse(localStorage.getItem('sesion'));
    this.identidad = this.usuarioService.obtenerNombreUsuario();
    this.rutaImagen = this.url + 'obtenerImagen/' + this.usuarioActualizar.imagen;
  }
}
