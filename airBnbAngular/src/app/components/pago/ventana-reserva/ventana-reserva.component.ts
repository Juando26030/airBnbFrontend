import { Component, Input } from '@angular/core';
import { PropiedadDTO } from "../../../DTOs/PropiedadDTO";
import { SolicitudDTO } from "../../../DTOs/SolicitudDTO";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-reservation-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventana-reserva.component.html',
  styleUrls: ['./ventana-reserva.component.css']
})
export class VentanaReservaComponent {
  @Input() propiedad!: PropiedadDTO;
  @Input() solicitud!: SolicitudDTO;

  fechaInicioDisplay: string = ''; // Fecha de Check-in en formato dd/mm/yyyy
  fechaFinDisplay: string = '';    // Fecha de Check-out en formato dd/mm/yyyy
  errorMensaje: string = '';



  ngOnInit() {
    // Inicializar las fechas en el formato de visualización si ya tienen valores
    if (this.solicitud.fechaInicio) {
      this.fechaInicioDisplay = this.convertToDisplayFormat(new Date(this.solicitud.fechaInicio));
    }
    if (this.solicitud.fechaFin) {
      this.fechaFinDisplay = this.convertToDisplayFormat(new Date(this.solicitud.fechaFin));
    }
  }

  onFechaInicioChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const fecha = this.parseDate(input.value);

    if (fecha) {
      this.solicitud.fechaInicio = this.convertToBackendFormat(fecha);
      this.fechaInicioDisplay = this.convertToDisplayFormat(fecha);

      // Validar que la fecha de checkout sea igual o posterior a la de checkin
      if (this.solicitud.fechaFin) {
        const fechaFin = new Date(this.solicitud.fechaFin);
        if (fechaFin < fecha) {
          this.errorMensaje = 'La fecha de check-out no puede ser menor a la de check-in.';
          this.solicitud.fechaFin = '';  // Resetear la fecha de fin si es menor
          this.fechaFinDisplay = '';
        } else {
          this.errorMensaje = '';
        }
      }
    } else {
      alert("Ingrese una fecha válida en el formato dd/mm/yyyy");
    }
  }

  onFechaFinChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const fecha = this.parseDate(input.value);

    if (fecha) {
      const fechaInicio = new Date(this.solicitud.fechaInicio);

      // Validar que la fecha de check-out no sea menor a la de check-in
      if (fechaInicio && fecha < fechaInicio) {
        this.errorMensaje = 'La fecha de check-out no puede ser menor a la de check-in.';
        this.fechaFinDisplay = ''; // Resetear display si es menor
        this.solicitud.fechaFin = '';
      } else {
        this.solicitud.fechaFin = this.convertToBackendFormat(fecha);
        this.fechaFinDisplay = this.convertToDisplayFormat(fecha);
        this.errorMensaje = '';
      }
    } else {
      alert("Ingrese una fecha válida en el formato dd/mm/yyyy");
    }
  }

  private convertToBackendFormat(fecha: Date): string {
    return fecha.toISOString();
  }

  private convertToDisplayFormat(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  private parseDate(fechaString: string): Date | null {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = fechaString.match(regex);

    if (match) {
      const dia = parseInt(match[1], 10);
      const mes = parseInt(match[2], 10) - 1;
      const anio = parseInt(match[3], 10);
      const fecha = new Date(anio, mes, dia);

      if (fecha.getDate() === dia && fecha.getMonth() === mes && fecha.getFullYear() === anio) {
        return fecha;
      }
    }
    return null;
  }

  calcularCostosTotales(): number {
    if (this.solicitud.fechaInicio && this.solicitud.fechaFin && this.propiedad) {
      const fechaInicio = new Date(this.solicitud.fechaInicio);
      const fechaFin = new Date(this.solicitud.fechaFin);
      const dias = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24);
      return dias * this.propiedad.valorNoche;
    }
    return 0;
  }
}
