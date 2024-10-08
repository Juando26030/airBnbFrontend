import { Routes } from '@angular/router';
import {CrearUsuarioComponent} from "./components/crear-usuario/crear-usuario.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardExplorarComponent} from "./components/dashboard-explorar/dashboard-explorar.component";
import {DashboardSesionComponent} from "./components/dashboard-sesion/dashboard-sesion.component";

export const routes: Routes = [
  {
    path: 'sesion',
    component: DashboardSesionComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login si la ruta es vacía
    ]
  },
  { path: 'explorar', component: DashboardExplorarComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sesion' },
  { path: '**', redirectTo: 'explorar' }
];

