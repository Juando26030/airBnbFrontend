import { Component } from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {PropiedadComponent} from "../propiedad/propiedad.component";
import {FooterComponent} from "../footer/footer.component";
import {FiltrosBusquedaComponent} from "../filtros-busqueda/filtros-busqueda.component";

@Component({
  selector: 'app-dashboard-explorar',
  standalone: true,
  imports: [
    MenuComponent,
    PropiedadComponent,
    FooterComponent,
    FiltrosBusquedaComponent
  ],
  templateUrl: './dashboard-explorar.component.html',
  styleUrl: './dashboard-explorar.component.css'
})
export class DashboardExplorarComponent {

}
