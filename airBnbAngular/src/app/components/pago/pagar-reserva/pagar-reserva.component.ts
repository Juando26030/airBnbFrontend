import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownMenuPayComponent } from '../dropdown-menu-pay/dropdown-menu-pay.component';
import {VentanaReservaComponent} from "../ventana-reserva/ventana-reserva.component";

@Component({
  selector: 'app-pay-reservation',
  standalone: true,
  imports: [VentanaReservaComponent, ReactiveFormsModule, CommonModule, DropdownMenuPayComponent],
  templateUrl: './pagar-reserva.component.html',
  styleUrl: './pagar-reserva.component.css'
})


export class PagarReservaComponent {
  creditCardForm: FormGroup;
  isChecked = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.creditCardForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      cvv: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{3,4}$')],
      ],
      expirationDate: [
        '',
        [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')],
      ],
    });
  }

  submit() {
    if (this.creditCardForm.valid) {
      console.log('Payment details:', this.creditCardForm.value);
      this.router.navigate(['/pago-confirmado']);  // Redirige si el formulario es válido
    } else {
      console.log('Form is invalid');
      this.creditCardForm.markAllAsTouched();  // Marca todos los campos como tocados para mostrar los errores
    }
  }


  selectedPaymentMethod: string | undefined;

  onPaymentMethodSelected(method: string) {
    this.selectedPaymentMethod = method;
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
  }

  goToPage(pageName:string){

    this.router.navigate([`${pageName}`]);
  }

}
