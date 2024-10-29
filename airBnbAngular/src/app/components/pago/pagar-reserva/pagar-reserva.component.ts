// pagar-reserva.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VentanaReservaComponent } from '../ventana-reserva/ventana-reserva.component';
import { DropdownMenuPayComponent } from '../dropdown-menu-pay/dropdown-menu-pay.component';

@Component({
  selector: 'app-pagar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, VentanaReservaComponent, DropdownMenuPayComponent],
  templateUrl: './pagar-reserva.component.html',
  styleUrls: ['./pagar-reserva.component.css']
})
export class PagarReservaComponent {
  creditCardForm: FormGroup;
  selectedPaymentMethod: string | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.creditCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
    });
  }

  submit() {
    if (this.creditCardForm.valid) {
      console.log('Payment details:', this.creditCardForm.value);
      this.router.navigate(['/pago-confirmado']);  // Redirige a la confirmación de pago
    } else {
      console.log('Form is invalid');
      this.creditCardForm.markAllAsTouched();
    }
  }

  onPaymentMethodSelected(method: string) {
    this.selectedPaymentMethod = method;
  }
}
