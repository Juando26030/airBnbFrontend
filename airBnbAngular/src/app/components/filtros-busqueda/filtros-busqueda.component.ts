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

  location: string = '';
  people: number = 0;
  onSearch(): void {
    if (this.location && this.people) {
      // Emitimos los valores al componente de propiedades
      this.searchProperties.emit({ location: this.location, people: this.people });
    }
  }

  @Output() searchProperties: EventEmitter<{ location: string, people: number }> = new EventEmitter();
}
