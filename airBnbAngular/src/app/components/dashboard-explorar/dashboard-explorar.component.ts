import {Component, ViewChild} from '@angular/core';
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
  // Usamos ViewChild para acceder a 'propiedadComponent'
  @ViewChild(PropiedadComponent) propiedadComponent!: PropiedadComponent;

  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    // Llamamos al método del componente de propiedades para realizar la búsqueda
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
