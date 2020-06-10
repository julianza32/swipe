import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importar modulo de rutas 
import {AppRoutingModule} from './app-routing.module';
//importar modulo formularios
import {FormsModule} from '@angular/forms';
//importar el modulo de httpClientModule
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';


//importar el servicio de usuario
import {UsuarioService} from './services/usuario.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    PerfilUsuarioComponent,
    RegistroComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
