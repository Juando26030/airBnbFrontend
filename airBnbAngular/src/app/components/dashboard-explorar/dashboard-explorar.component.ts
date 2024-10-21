import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropiedadComponent } from "../propiedad/propiedad.component";
import { UsuarioService } from "../../services/usuario.service";
import { PropiedadService } from "../../services/propiedad.service";
import { NgIf } from "@angular/common";
import { FiltrosBusquedaComponent } from "../filtros-busqueda/filtros-busqueda.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-dashboard-explorar',
  standalone: true,
  imports: [
    PropiedadComponent,
    NgIf,
    FiltrosBusquedaComponent,
    FooterComponent
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

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private propiedadService: PropiedadService) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.esArrendador = usuario.rol === 'arrendador';
      this.mostrarFiltros = usuario.rol === 'arrendatario';
    } else {
      console.warn('localStorage no está disponible.');
    }

    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id'));
      console.log("ID del usuario:", this.usuarioId);
    });
  }


  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
