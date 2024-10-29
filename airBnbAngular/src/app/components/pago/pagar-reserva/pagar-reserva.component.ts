// pagar-reserva.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VentanaReservaComponent } from '../ventana-reserva/ventana-reserva.component';
import { DropdownMenuPayComponent } from '../dropdown-menu-pay/dropdown-menu-pay.component';
import { SolicitudDTO } from '../../../DTOs/SolicitudDTO';
import { PropiedadDTO } from '../../../DTOs/PropiedadDTO';
import {CommonModule,NgIf } from "@angular/common";

@Component({
  selector: 'app-pagar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, VentanaReservaComponent, DropdownMenuPayComponent, CommonModule, NgIf],
  templateUrl: './pagar-reserva.component.html',
  styleUrls: ['./pagar-reserva.component.css']
})
export class PagarReservaComponent implements OnInit {
  @Input() solicitud!: SolicitudDTO; // Recibe detalles de la reserva
  @Input() propiedad!: PropiedadDTO; // Recibe detalles de la propiedad
  creditCardForm: FormGroup;
  selectedPaymentMethod: string | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.creditCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
    });

    // Obtener solicitud y propiedad del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { solicitud: SolicitudDTO, propiedad: PropiedadDTO };
    if (state) {
      this.solicitud = state.solicitud;
      this.propiedad = state.propiedad;
      console.log('Detalles de la reserva:', this.solicitud);
    }
  }

  ngOnInit() {}

  submit() {
    if (this.creditCardForm.valid) {
      console.log('Payment details:', this.creditCardForm.value);
      this.router.navigate(['/pago-confirmado']); // Redirige a la confirmación de pago
    } else {
      console.log('Formulario inválido');
      this.creditCardForm.markAllAsTouched();
    }
  }

  onPaymentMethodSelected(method: string) {
    this.selectedPaymentMethod = method;
  }
}
