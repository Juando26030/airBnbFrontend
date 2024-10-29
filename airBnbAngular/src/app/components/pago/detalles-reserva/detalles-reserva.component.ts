import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PropiedadDTO} from "../../../DTOs/PropiedadDTO";
import {UsuarioDTO} from "../../../DTOs/UsuarioDTO";
import {SolicitudDTO} from '../../../DTOs/SolicitudDTO';
import {PropiedadService} from "../../../services/propiedad.service";
import {UsuarioService} from "../../../services/usuario.service";
import {VentanaReservaComponent} from "../ventana-reserva/ventana-reserva.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-detalles-reserva',
  standalone: true,
  templateUrl: './detalles-reserva.component.html',
  imports: [
    VentanaReservaComponent,
    NgIf
  ],
  styleUrls: ['./detalles-reserva.component.css']
})
export class DetallesReservaComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  usuario: UsuarioDTO | undefined;
  solicitud: SolicitudDTO;
  propiedadId: number = 0;
  usuarioActualId: number = 0;
  errorMensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Crear una nueva instancia de SolicitudDTO
    this.solicitud = {
      solicitudId: 0,
      arrendatario: {} as UsuarioDTO,
      propiedad: {} as PropiedadDTO,
      huespedes: 1,
      fechaInicio: '',
      fechaFin: ''
    };
  }

  ngOnInit() {
    this.route.parent?.params.subscribe((params: Params) => {
      this.usuarioActualId = +params['idU'] || 0;
    });

    this.route.params.subscribe((params: Params) => {
      this.propiedadId = +params['idP'] || 0;
      if (this.propiedadId) {
        this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
          this.propiedad = data;
          this.solicitud.propiedad = data;
        });
      }
    });

    if (this.usuarioActualId) {
      this.usuarioService.obtenerUsuarioPorId(this.usuarioActualId).subscribe((data: UsuarioDTO) => {
        this.usuario = data;
        this.solicitud.arrendatario = data;
      });
    }
  }

  incrementarHuespedes() {
    if (this.solicitud.huespedes < (this.propiedad?.cantPersonas || 1)) {
      this.solicitud.huespedes++;
      this.errorMensaje = '';
    } else {
      this.errorMensaje = `Máximo de personas: ${this.propiedad?.cantPersonas}`;
      setTimeout(() => this.errorMensaje = '', 3000);
    }
  }

  decrementarHuespedes() {
    if (this.solicitud.huespedes > 1) {
      this.solicitud.huespedes--;
    }
  }

  // Método para calcular el total de días y costos basado en las fechas seleccionadas
  calcularCostosTotales(): number {
    const fechaInicio = new Date(this.solicitud.fechaInicio);
    const fechaFin = new Date(this.solicitud.fechaFin);
    const dias = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24);
    return dias * (this.propiedad?.valorNoche || 0);
  }

  goToPagarReserva() {
    this.router.navigate([
      'explorar',
      this.usuarioActualId,
      'view-propiedad',
      this.propiedadId,
      'pagar-reserva',
    ]);
  }
}
