import { Component } from '@angular/core';
import {PropiedadDTO} from "../../DTOs/PropiedadDTO";
import {UsuarioDTO} from "../../DTOs/UsuarioDTO";
import {Router} from "@angular/router";
import {PropiedadService} from "../../services/propiedad.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './crear-propiedad.component.html',
  styleUrl: './crear-propiedad.component.css'
})
export class CrearPropiedadComponent {
  propiedad: Partial<PropiedadDTO> = {
    propiedadId: 0,
    arrendadorId: 0,  // Relación con UsuarioDTO
    imagen: '',
    nombre: '',
    departamento: '',
    municipio: '',
    tipoDeIngreso: '',
    descripcion: '',
    cantBanos: 0,
    cantHabitaciones: 0,
    cantPersonas: 0,
    mascotas: false,
    piscina: false,
    asador: false,
    valorNoche: 0,
    visible: false,
    calificacion: 0,
    estado: ''
  };

  errorMsg: string | null = null;

  constructor(private router: Router, private propiedadService: PropiedadService) {}

  onSubmit() {
    if (this.validarFormulario()) {
      console.log('Propiedad creada:', this.propiedad);
      this.propiedadService.crearPropiedad(this.propiedad as PropiedadDTO).subscribe(
        () => this.router.navigate(['/dashboard']),
        (error) => this.errorMsg = 'Error al crear la propiedad'
      );
    } else {
      this.errorMsg = 'Por favor, completa todos los campos correctamente.';
    }
  }

  validarFormulario(): boolean {
    return Object.values(this.propiedad).every(value => value !== '' && value !== null);
  }

  toggleCheckbox(prop: keyof PropiedadDTO): void {
    this.propiedad[prop] = !this.propiedad[prop];
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
