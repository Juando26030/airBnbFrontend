import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropiedadComponent } from "../propiedad/propiedad.component";
import { UsuarioService } from "../../services/usuario.service";
import { NgIf } from "@angular/common";
import {FiltrosBusquedaComponent} from "../filtros-busqueda/filtros-busqueda.component";
import {FooterComponent} from "../footer/footer.component";
import {PropiedadService} from "../../services/propiedad.service";

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

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private propiedadService: PropiedadService) {}

  ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id'));

      // Puedes usar el ID del usuario para hacer una petición, o para lógica adicional
      console.log("ID del usuario:", this.usuarioId);
    });

    // Mostrar o no los filtros en función del rol
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario.rol === 'arrendatario') {
      this.mostrarFiltros = true;
    } else {
      this.mostrarFiltros = false;
    }
  }

  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }) {
    this.propiedadComponent.onSearchProperties(searchParams);
  }
}
