import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importar modulo de rutas 
import {AppRoutingModule} from './app-routing.module';
//importar modulo formularios
import {FormsModule} from '@angular/forms';
//importar el modulo de httpClientModule
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//importar el servicios de usuario y canciones
import {UsuarioService} from './services/usuario.service';
import {CancionService} from './services/cancion.service';
// importar componentes
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LateralCancionComponent } from './components/lateral-cancion/lateral-cancion.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { ControlComponent } from './components/control/control.component';
import { RegistroCancionComponent } from './components/registro-cancion/registro-cancion.component';
import { ActualizarCancionComponent } from './components/actualizar-cancion/actualizar-cancion.component';
import { AdmintabComponent } from './components/admintab/admintab.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    PerfilUsuarioComponent,
    RegistroComponent,
    InicioComponent,
    LateralCancionComponent,
    CancionComponent,
    ControlComponent,
    RegistroCancionComponent,
    ActualizarCancionComponent,
    AdmintabComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,HttpClientModule
  ],
  providers: [
    UsuarioService, CancionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
