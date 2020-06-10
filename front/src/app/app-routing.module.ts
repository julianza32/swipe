import {  Routes,RouterModule } from '@angular/router';
import {  NgModule } from '@angular/core';

//Importar los componetes 
import {RegistroComponent} from './components/registro/registro.component';
import {LoginComponent} from './components/login/login.component';
import {PerfilUsuarioComponent} from './components/perfil-usuario/perfil-usuario.component';
import {InicioComponent} from './components/inicio/inicio.component';
//Importar rutas con components
const routes : Routes = [
    {path:'', component:InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'registro', component: RegistroComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}