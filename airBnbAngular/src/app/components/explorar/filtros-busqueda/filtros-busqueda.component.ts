import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-filtros-busqueda',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './filtros-busqueda.component.html',
  styleUrl: './filtros-busqueda.component.css'
})
export class FiltrosBusquedaComponent {
  // Asegúrate de declarar las variables que se utilizan en el template
  departamento: string = '';   // Añadir esta propiedad
  municipio: string = '';      // Añadir esta propiedad
  people: number = 0;

  @Output() searchProperties: EventEmitter<{ departamento: string, municipio: string, people: number }> = new EventEmitter();

  onSearch(): void {
    this.searchProperties.emit({
      departamento: this.departamento,
      municipio: this.municipio,
      people: this.people
    });
  }
}
