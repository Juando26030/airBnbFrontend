import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PropiedadComponent } from "../../propiedades/propiedad/propiedad.component";
import { UsuarioService } from "../../../services/usuario.service";
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
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-explorar.component.html',
  styleUrls: ['./dashboard-explorar.component.css']
})
export class DashboardExplorarComponent implements OnInit {
  @ViewChild(PropiedadComponent) propiedadComponent!: PropiedadComponent;

  public usuarioId!: number;
  public esArrendador: boolean = false;
  public enCrearPropiedad: boolean = false;
  public enVistaPropiedad: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // Forzar detección de cambios
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = +params['idU'];

      this.usuarioService.esArrendador(this.usuarioId).subscribe(
        (resultado: boolean) => {
          this.esArrendador = resultado;
          console.log('Resultado del servicio esArrendador:', resultado);
          this.cdr.detectChanges(); // Forzar detección de cambios
        },
        (error) => {
          console.error('Error al obtener si es arrendador:', error);
        }
      );
    });

    this.router.events.subscribe(() => {
      this.enCrearPropiedad = this.router.url.includes('crear-propiedad');
      this.enVistaPropiedad = this.router.url.includes('view-propiedad');
    });
  }

  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
