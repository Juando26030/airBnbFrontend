import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./components/sesion/login/login.component";
import {MenuComponent} from "./components/explorar/menu/menu.component";
import {CardPropiedadComponent} from "./components/propiedades/card-propiedad/card-propiedad.component";
import {PropiedadComponent} from "./components/propiedades/propiedad/propiedad.component";
import {FooterComponent} from "./components/explorar/footer/footer.component";
import {DashboardSesionComponent} from "./components/sesion/dashboard-sesion/dashboard-sesion.component";
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MenuComponent, CardPropiedadComponent, PropiedadComponent, FooterComponent, DashboardSesionComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'airBnbAngular';
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // List of routes where the footer should be hidden
      const hideFooterRoutes = ['/sesion/login', '/sesion/crear-usuario', '/sesion/usuario-creado'];
      this.showFooter = !hideFooterRoutes.includes(this.router.url);
    });
  }
}
