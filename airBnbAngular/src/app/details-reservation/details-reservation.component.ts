import { Component } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DropdownMenuComponent],
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent  {
  paymentMethods = [
    { name: "Tarjeta" },
    { name: "Transferencia Bancaria" },
  ];

}