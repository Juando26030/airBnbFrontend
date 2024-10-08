import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

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
  @Input() title: string = '';
  @Input() beds: number = 0;
  @Input() baths: number = 0;
  @Input() wifi: boolean = false;
  @Input() description: string = '';
  @Input() availableDate: string = '';
  @Input() price: string = '';
  @Input() image: string = '';
}
