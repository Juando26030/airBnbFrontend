import { Component } from '@angular/core';
import { ReservationWindowComponent } from '../reservation-window/reservation-window.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [ReservationWindowComponent,CommonModule],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.css'
})
export class ConfirmPaymentComponent {
    pageName:String = '/';
    constructor(private router: Router) {}

    showConfirmation = false;

    openConfirmation() {
      this.showConfirmation = true;
    }

    closeConfirmation() {
      this.showConfirmation = false;
    }

    confirm() {
      console.log("Details editing confirmed!");
      this.closeConfirmation();
      this.router.navigate([`${this.pageName}`]);
    }

}
