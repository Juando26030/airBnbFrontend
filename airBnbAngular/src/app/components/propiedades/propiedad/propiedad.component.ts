import { Component, OnInit, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { PropiedadService } from '../../../services/propiedad.service';
import { CardPropiedadComponent } from '../card-propiedad/card-propiedad.component';
import { PropiedadDTO } from '../../../DTOs/PropiedadDTO';

@Component({
  selector: 'app-propiedad',
  standalone: true,
  imports: [NgForOf, CardPropiedadComponent],
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.css']
})
export class PropiedadComponent implements OnInit {
  @Input() usuarioId!: number;
  properties: PropiedadDTO[] = [];

  // Imagen predeterminada en caso de que no haya imágenes en `property.imagenes`
  defaultImage: string = '/assets/default-image.jpg';

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    if (this.usuarioId) {
      this.cargarPropiedadesAlternativas();
    }
  }

  onSearchProperties(searchParams: { departamento: string, municipio: string, people: number }): void {
    this.propiedadService.getPropiedadesUsuario(
      searchParams.departamento,
      searchParams.municipio,
      searchParams.people
    ).subscribe(
      (data: PropiedadDTO[]) => this.properties = data,
      (error) => console.error('Error al cargar propiedades', error)
    );
  }

  cargarPropiedadesAlternativas(): void {
    this.propiedadService.getPropiedadesAdmin(this.usuarioId).subscribe(
      (data: PropiedadDTO[]) => this.properties = data,
      (error) => console.error('Error al cargar propiedades alternativas', error)
    );
}
}