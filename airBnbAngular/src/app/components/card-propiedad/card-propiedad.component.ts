import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import * as os from "os";
import {Router, RouterLink} from "@angular/router";
import {PropiedadDTO} from "../../DTOs/PropiedadDTO";

@Component({
  selector: 'app-card-propiedad',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
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

  @Input() properties: PropiedadDTO[] = [];
  @Input() idP: number = 0;

  constructor(private router: Router) {}

  viewPropiedad(idP : number){
    this.router.navigate(['/view-propiedad', idP]); //angular mete ese id en la ruta pa pasarlo
  }
}
