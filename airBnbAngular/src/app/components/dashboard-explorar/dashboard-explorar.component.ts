import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { PropiedadComponent } from "../propiedad/propiedad.component";
import { UsuarioService } from "../../services/usuario.service";
import { PropiedadService } from "../../services/propiedad.service";
import { NgIf } from "@angular/common";
import { FiltrosBusquedaComponent } from "../filtros-busqueda/filtros-busqueda.component";
import { FooterComponent } from "../footer/footer.component";
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-dashboard-explorar',
  standalone: true,
  imports: [
    PropiedadComponent,
    NgIf,
    FiltrosBusquedaComponent,
    FooterComponent,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-explorar.component.html',
  styleUrl: './dashboard-explorar.component.css'
})
export class DashboardExplorarComponent implements OnInit {
  @ViewChild(PropiedadComponent) propiedadComponent!: PropiedadComponent;

  public mostrarFiltros: boolean = false;
  public usuarioId!: number;
  public esArrendador: boolean = false; // Bandera para verificar si es arrendador
  public esArrendatario: boolean = false;  // Bandera para diferenciar el rol
  enCrearPropiedad: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private propiedadService: PropiedadService,
              private router: Router) {}

  ngOnInit(): void {
    // Obtener el usuarioId de la ruta
    this.route.params.subscribe(params => {
      this.usuarioId = +params['id'];  // '+' convierte el string a número
    });

    // Detectar cambios en la ruta para ocultar o mostrar los componentes
    this.router.events.subscribe(() => {
      // Verifica si la ruta es '/explorar/:id/crear-propiedad'
      this.enCrearPropiedad = this.router.url.includes('crear-propiedad');
    });
  }


  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
