import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SolicitudDTO } from '../../../DTOs/SolicitudDTO';
import { PropiedadDTO } from '../../../DTOs/PropiedadDTO';
import { PagoDTO } from '../../../DTOs/PagoDTO';
import { SolicitudService } from '../../../services/solicitud.service';
import { PagoService } from '../../../services/pago.service';
import { CommonModule, NgIf } from "@angular/common";
import { VentanaReservaComponent } from '../ventana-reserva/ventana-reserva.component';
import { DropdownMenuPayComponent } from '../dropdown-menu-pay/dropdown-menu-pay.component';


@Component({
  selector: 'app-pagar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf, DropdownMenuPayComponent, VentanaReservaComponent],
  templateUrl: './pagar-reserva.component.html',
  styleUrls: ['./pagar-reserva.component.css']
})
export class PagarReservaComponent implements OnInit {
  solicitud: SolicitudDTO | undefined;
  creditCardForm: FormGroup;
  selectedPaymentMethod: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Para obtener parámetros de la ruta
    private solicitudService: SolicitudService, // Para cargar la solicitud
    private pagoService: PagoService // Para realizar el pago
  ) {
    this.creditCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
    });
  }

  ngOnInit() {
    // Obtener solicitudId desde los parámetros de la ruta
    this.route.params.subscribe((params: Params) => {
      const solicitudId = +params['idS']; // 'idP' es el nombre del parámetro en la ruta
      console.log('Solicitud ID recibido:', solicitudId);

      if (solicitudId) {
        // Llamar al servicio para obtener los detalles de la solicitud
        this.solicitudService.obtenerSolicitudPorId(solicitudId).subscribe({
          next: (data: SolicitudDTO) => {
            this.solicitud = data;
            console.log('Detalles de la solicitud:', this.solicitud);
          },
          error: (err) => {
            console.error('Error al cargar la solicitud:', err);
          }
        });
      }
    });
  }

  pagar() {

    if (!this.solicitud) {
      console.error('No se encontró información de la solicitud');
      return;
    }

    // Obtener valores del formulario
    const { cardNumber, cvv, expirationDate } = this.creditCardForm.value;

    // Construir el objeto PagoDTO
    const pago: PagoDTO = {
      solicitud: this.solicitud,
      monto: this.calcularMonto(), // Lógica personalizada para calcular el monto
      fechaPago: this.formatDate(new Date().toString()), // Fecha actual formateada
      cardNumber: Number(cardNumber.replace(/\s/g, '')), // Quitar espacios y convertir a número
      cvv: Number(cvv),
      expDate: this.formatDate(expirationDate)
    };

    console.log('Realizando pago con los siguientes detalles:', pago);

    // Llamar al servicio para realizar el pago
    this.pagoService.crearPago(pago).subscribe({
      next: (response) => {
        console.log('Pago realizado con éxito:', response);
        //TODO HACER QUE NAVEGUE A UNA RUTA DE PAGO REALIZADO
        this.router.navigate(['/pago-confirmado'], { state: { pago: response } });
      },
      error: (error) => {
        console.error('Error al realizar el pago:', error);
        alert('Hubo un problema al procesar el pago. Por favor, intente nuevamente.');
      }
    });
  }

  calcularMonto(): number {
    // TODO CALCULAR EL MONTO DE LA SOLICITUD
    return 0;
  }

  calcularDias(): number {
    if (this.solicitud?.fechaInicio && this.solicitud?.fechaFin) {
      const inicio = new Date(this.solicitud.fechaInicio);
      const fin = new Date(this.solicitud.fechaFin);
      return Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split(".")[0] + 'Z'; // Elimina los milisegundos
  }


  onPaymentMethodSelected(method: string) {
    this.selectedPaymentMethod = method;
  }
}
