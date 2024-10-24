import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PropiedadComponent } from "../propiedad/propiedad.component";
import { UsuarioService } from "../../services/usuario.service";
import { PropiedadService } from "../../services/propiedad.service";
import { NgIf } from "@angular/common";
import { FiltrosBusquedaComponent } from "../filtros-busqueda/filtros-busqueda.component";
import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from "../menu/menu.component";

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
  styleUrls: ['./dashboard-explorar.component.css']
})
export class DashboardExplorarComponent implements OnInit {
  @ViewChild(PropiedadComponent) propiedadComponent!: PropiedadComponent;

  public usuarioId!: number;
  public esArrendador: boolean = false; // Bandera para verificar si es arrendador
  public enCrearPropiedad: boolean = false;
  public enVistaPropiedad: boolean = false; // Bandera para controlar si estamos en la vista de propiedad

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el usuarioId de la ruta
    this.route.params.subscribe(params => {
      this.usuarioId = +params['id']; // '+' convierte el string a número

      // Llamar al servicio y suscribirse al resultado
      this.usuarioService.esArrendador(this.usuarioId).subscribe(
        (resultado: boolean) => {
          this.esArrendador = resultado; // Asignar el valor retornado a esArrendador
          console.log('Resultado del servicio esArrendador:', resultado); // Imprimir resultado en consola
        },
        (error) => {
          console.error('Error al obtener si es arrendador:', error);
        }
      );
    });

    // Detectar cambios en la ruta para ocultar o mostrar los componentes
    this.router.events.subscribe(() => {
      // Verifica si la ruta es '/explorar/:id/crear-propiedad'
      this.enCrearPropiedad = this.router.url.includes('crear-propiedad');
      // Verifica si la ruta es '/explorar/:id/view-propiedad/:idP'
      this.enVistaPropiedad = this.router.url.includes('view-propiedad');
    });
  }

  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
