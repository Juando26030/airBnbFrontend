import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { CardPropiedadComponent } from '../card-propiedad/card-propiedad.component';

@Component({
  selector: 'app-propiedad',
  standalone: true,
  imports: [
    NgForOf,
    CardPropiedadComponent
  ],
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.css']
})
export class PropiedadComponent {
  properties = [
    {
      title: 'Apartamento 1 super chevere',
      beds: 1,
      baths: 1,
      wifi: true,
      description: 'Vista a la montaña | 1 piso | Estacionamiento / Parking',
      availableDate: '28 Nov 2023',
      price: 'COP 400k/noche',
      image: 'https://via.placeholder.com/150' // Reemplazar con URL real
    },
    {
      title: 'Apartamento 2 super chevere',
      beds: 2,
      baths: 1,
      wifi: true,
      description: 'Vista al mar | 2 piso | Estacionamiento',
      availableDate: '15 Dic 2023',
      price: 'COP 450k/noche',
      image: 'https://via.placeholder.com/150' // Reemplazar con URL real
    },
    {
      title: 'Apartamento 3 super chevere',
      beds: 3,
      baths: 2,
      wifi: false,
      description: 'Vista al jardín | 3 piso | Sin Estacionamiento',
      availableDate: '01 Ene 2024',
      price: 'COP 500k/noche',
      image: 'https://via.placeholder.com/150' // Reemplazar con URL real
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
