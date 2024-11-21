import {Component, OnInit} from '@angular/core';
import {SolicitudDTO} from "../../../DTOs/SolicitudDTO";
import {ActivatedRoute} from "@angular/router";
import {SolicitudService} from "../../../services/solicitud.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit {
  solicitudes: SolicitudDTO[] = [];
  arrendadorId!: number;

  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    console.log('Inicializando componente SolicitudesComponent');
    // Obtener el ID del usuario (arrendador) desde la URL usando el parámetro correcto
    this.arrendadorId = Number(this.route.snapshot.parent?.paramMap.get('idU'));
    console.log('ID del arrendador:', this.arrendadorId);
    // Cargar las solicitudes
    this.loadSolicitudes();
  }


  loadSolicitudes(): void {
    console.log('Cargando solicitudes del arrendador:', this.arrendadorId);
    this.solicitudService.getSolicitudesByArrendadorId(this.arrendadorId).subscribe({
      next: (data) => {
        this.solicitudes = data;
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      error: (err) => {
        console.log('Error al cargar las solicitudes', err);
        console.error('Error al cargar las solicitudes', err);
      },
    });
  }
}
