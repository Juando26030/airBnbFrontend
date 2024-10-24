import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropiedadDTO } from "../../DTOs/PropiedadDTO";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card-propiedad',
  standalone: true,
  templateUrl: './card-propiedad.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './card-propiedad.component.css'
})
export class CardPropiedadComponent {
  @Input() nombre: string = '';
  @Input() habitaciones: number = 0;
  @Input() banos: number = 0;
  @Input() mascotas: boolean = false;
  @Input() descripcion: string = '';
  @Input() disponibilidad: string = '';
  @Input() precio: number = 0;
  @Input() imagen: string = '';

  @Input() properties: PropiedadDTO[] = [];
  @Input() idP: number = 0;
  @Input() usuarioId: number = 0; // Añade este Input para recibir el ID del usuario

  constructor(private router: Router) {}

  viewPropiedad(idP: number) {
    this.router.navigate([`/explorar/${this.usuarioId}/view-propiedad`, idP]);
  }
}
