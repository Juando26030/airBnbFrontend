import { Routes } from '@angular/router';
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardExplorarComponent } from "./components/dashboard-explorar/dashboard-explorar.component";
import { DashboardSesionComponent } from "./components/dashboard-sesion/dashboard-sesion.component";
import { UsuarioCreadoComponent } from "./components/usuario-creado/usuario-creado.component";
import { ActivarCuentaComponent } from "./components/activar-cuenta/activar-cuenta.component";
import { ViewPropiedadComponent } from "./components/view-propiedad/view-propiedad.component";

export const routes: Routes = [
  {
    path: 'sesion',
    component: DashboardSesionComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: 'usuario-creado', component: UsuarioCreadoComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'activar/:id', component: ActivarCuentaComponent }, // Ruta de activación

  // Modificación para aceptar el ID del usuario como parámetro
  { path: 'explorar/:id', component: DashboardExplorarComponent },

  { path: 'view-propiedad/:idP', component: ViewPropiedadComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sesion' },
  { path: '**', redirectTo: 'explorar' }  // Aquí es opcional si rediriges a explorar, ajusta según tu necesidad
];
