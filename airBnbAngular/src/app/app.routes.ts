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
  {
    path: 'explorar/:id',
    component: DashboardExplorarComponent,
    children: [
      { path: 'crear-propiedad', component: CrearPropiedadComponent },
      {
        path: 'view-propiedad/:idP',
        component: ViewPropiedadComponent,
        children: [
          { path: 'detalles-reserva', component: DetallesReservaComponent },
          { path: 'pagar-reserva', component: PagarReservaComponent },
          { path: 'pago-confirmado', component: PagoConfirmadoComponent }
        ]
      }
    ]
  },

  // Redireccionamientos
  { path: '', pathMatch: 'full', redirectTo: 'sesion' },
  { path: '**', redirectTo: 'sesion' }  // Ajustado para redirigir correctamente si la ruta no existe
];
