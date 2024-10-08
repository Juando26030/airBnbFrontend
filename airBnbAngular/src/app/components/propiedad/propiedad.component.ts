import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { PropiedadService } from '../../services/propiedad.service';  // Importamos el servicio
import { CardPropiedadComponent } from '../card-propiedad/card-propiedad.component';
import { PropiedadDTO } from '../../DTOs/PropiedadDTO';

@Component({
  selector: 'app-propiedad',
  standalone: true,
  imports: [NgForOf, CardPropiedadComponent],
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.css']
})
export class PropiedadComponent implements OnInit {
  properties: PropiedadDTO[] = [];  // Aquí almacenaremos las propiedades cargadas dinámicamente

  constructor(private propiedadService: PropiedadService) { }

  ngOnInit(): void {
    // Por defecto no cargamos propiedades, esperamos la búsqueda
  }

  // Este método será llamado cuando el menú emita el evento de búsqueda
  onSearchProperties(searchParams: { location: string, people: number }): void {
    this.propiedadService.getPropiedades(searchParams.location, searchParams.people).subscribe(
      (data: PropiedadDTO[]) => {
        this.properties = data;  // Actualizamos las propiedades con los resultados de la API
      },
      (error) => {
        console.error('Error al cargar propiedades', error);
      }
    );
  }
}
