import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent {
  paymentMethods = [
    { name: "Tarjeta" },
    { name: "Transferencia Bancaria" },
  ];

}