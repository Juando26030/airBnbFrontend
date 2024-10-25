import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {VentanaReservaComponent} from "../ventana-reserva/ventana-reserva.component";

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [VentanaReservaComponent,CommonModule],
  templateUrl: './pago-confirmado.component.html',
  styleUrl: './pago-confirmado.component.css'
})
export class PagoConfirmadoComponent {
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
