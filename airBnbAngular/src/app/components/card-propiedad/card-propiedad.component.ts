import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import * as os from "os";

@Component({
  selector: 'app-card-propiedad',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-propiedad.component.html',
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
  protected readonly os = os;
}
