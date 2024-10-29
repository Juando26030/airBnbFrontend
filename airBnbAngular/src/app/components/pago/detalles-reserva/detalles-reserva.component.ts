import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {VentanaReservaComponent} from "../ventana-reserva/ventana-reserva.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VentanaReservaComponent],
  templateUrl: './detalles-reserva.component.html',
  styleUrls: ['./detalles-reserva.component.css']
})
export class DetallesReservaComponent {
  paymentMethods = [
    { name: "Tarjeta" },
    { name: "Transferencia Bancaria" },
  ];
  constructor(private router: Router) { }

  // detalles-reserva.component.ts
  goToPage(pageName: string) {
    this.router.navigate([pageName]);
  }


}
