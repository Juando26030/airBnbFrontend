import { Component } from '@angular/core';
import { ReservationWindowComponent } from '../reservation-window/reservation-window.component';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownMenuPayComponent } from '../dropdown-menu-pay/dropdown-menu-pay.component';

@Component({
  selector: 'app-pay-reservation',
  standalone: true,
  imports: [ReservationWindowComponent, ReactiveFormsModule, CommonModule, DropdownMenuPayComponent],
  templateUrl: './pay-reservation.component.html',
  styleUrl: './pay-reservation.component.css'
})


export class PayReservationComponent {
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
      console.log(this.creditCardForm.value);
    } else {
      console.log('Form is invalid');
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
