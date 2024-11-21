import { Routes } from '@angular/router';
import { CrearUsuarioComponent } from "./components/sesion/crear-usuario/crear-usuario.component";
import { LoginComponent } from "./components/sesion/login/login.component";
import { DashboardExplorarComponent } from "./components/explorar/dashboard-explorar/dashboard-explorar.component";
import { DashboardSesionComponent } from "./components/sesion/dashboard-sesion/dashboard-sesion.component";
import { UsuarioCreadoComponent } from "./components/sesion/usuario-creado/usuario-creado.component";
import { ActivarCuentaComponent } from "./components/sesion/activar-cuenta/activar-cuenta.component";
import { ViewPropiedadComponent } from "./components/propiedades/view-propiedad/view-propiedad.component";
import { CrearPropiedadComponent } from "./components/propiedades/crear-propiedad/crear-propiedad.component";

// Nuevas importaciones de componentes
import { DetallesReservaComponent } from "./components/pago/detalles-reserva/detalles-reserva.component";
import { PagarReservaComponent } from "./components/pago/pagar-reserva/pagar-reserva.component";
import { PagoConfirmadoComponent } from "./components/pago/pago-confirmado/pago-confirmado.component";
import { VentanaReservaComponent } from "./components/pago/ventana-reserva/ventana-reserva.component";
import {SolicitudesComponent} from "./components/explorar/solicitudes/solicitudes.component";
import {authGuard} from "./guards/auth.guard";
import {rolGuard} from "./guards/rol.guard";
import {Rol} from "./DTOs/rol";

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
  { path: 'activar/:id',
    component: ActivarCuentaComponent,
    canActivate: [authGuard, rolGuard],
    data: { roles: [Rol.Arrendador, Rol.Arrendatario] },
  }, // Ruta de activación

  // Modificación para aceptar el ID del usuario como parámetro
  {
    path: 'explorar/:idU',
    component: DashboardExplorarComponent,
    canActivate: [authGuard, rolGuard],
    data: { roles: [Rol.Arrendador, Rol.Arrendatario] },
    children: [
      {
        path: 'crear-propiedad',
        component: CrearPropiedadComponent,
        canActivate: [authGuard, rolGuard],
        data: { roles: [Rol.Arrendador] },
      },
      {
        path: 'view-propiedad/:idP',
        component: ViewPropiedadComponent,
        canActivate: [authGuard, rolGuard],
        data: { roles: [Rol.Arrendador, Rol.Arrendatario] },
      },
      {
        path: 'view-propiedad/:idP/detalles-reserva',
        component: DetallesReservaComponent,
        canActivate: [authGuard, rolGuard],
        data: { roles: [Rol.Arrendador, Rol.Arrendatario] },
      },
      {
        path: 'view-propiedad/:idS/pagar-reserva', //se manda el id de la solicitud
        component: PagarReservaComponent,
        canActivate: [authGuard, rolGuard],
        data: { roles: [Rol.Arrendatario] },
      },
      { path: 'solicitudes', component: SolicitudesComponent,
        canActivate: [authGuard, rolGuard],
        data: { roles: [Rol.Arrendador] },}
    ],
  },

  { path: 'pago-confirmado', component: PagoConfirmadoComponent,
    canActivate: [authGuard, rolGuard],
    data: { roles: [Rol.Arrendatario] },}, // Ruta de confirmación de pago

  // Redireccionamientos
  { path: '', pathMatch: 'full', redirectTo: 'sesion' },
  { path: '**', redirectTo: 'sesion' }  // Ajustado para redirigir correctamente si la ruta no existe
];
