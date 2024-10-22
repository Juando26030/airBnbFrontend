import { Component } from '@angular/core';
import { ReservationWindowComponent } from '../reservation-window/reservation-window.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DropdownMenuComponent, ReservationWindowComponent],
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent {
  paymentMethods = [
    { name: "Tarjeta" },
    { name: "Transferencia Bancaria" },
  ];
  constructor(private router: Router) { }

  goToPage(pageName:string){

    this.router.navigate([`${pageName}`]);
  }
}
