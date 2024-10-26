import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PropiedadDTO } from "../../../DTOs/PropiedadDTO";
import { Router, ActivatedRoute } from "@angular/router";
import { PropiedadService } from "../../../services/propiedad.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  templateUrl: './crear-propiedad.component.html',
  styleUrls: ['./crear-propiedad.component.css'],
  imports: [
    NgIf,
    FormsModule
  ]
})
export class CrearPropiedadComponent implements OnInit {
  @ViewChild('propiedadForm') propiedadForm!: NgForm;

  propiedad: PropiedadDTO = {
    propiedadId: 0,
    arrendadorId: 0,
    imagenes: [],
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
    estado: 'ACTIVO'
  };

  nuevaImagen: string = ''; // Nueva URL de imagen que el usuario agrega
  errorMsg: string | null = null;
  private arrendadorId: number = 0;

  constructor(
    private router: Router,
    private propiedadService: PropiedadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const parentRoute = this.route.parent ? this.route.parent : this.route;

    parentRoute.params.subscribe(params => {
      this.arrendadorId = +params['id'];
      if (!isNaN(this.arrendadorId)) {
        this.propiedad.arrendadorId = this.arrendadorId;
        console.log('Arrendador ID:', this.arrendadorId);
      } else {
        console.error('El ID del arrendador no es válido');
      }
    });
  }

  addImage() {
    if (this.nuevaImagen.trim()) {
      this.propiedad.imagenes.push(this.nuevaImagen.trim());
      this.nuevaImagen = ''; // Limpiar el input
    } else {
      this.errorMsg = 'La URL de la imagen no puede estar vacía.';
    }
  }

  removeImage(index: number) {
    this.propiedad.imagenes.splice(index, 1);
  }

  onSubmit() {
    if (this.propiedadForm.form.valid) {
      console.log('Propiedad creada:', this.propiedad);
      this.propiedadService.crearPropiedad(this.propiedad).subscribe(
        () => this.router.navigate(['/dashboard']),
        (error) => this.errorMsg = 'Error al crear la propiedad'
      );
    } else {
      this.errorMsg = 'Por favor, completa todos los campos correctamente.';
    }
  }

  toggleCheckbox(prop: 'mascotas' | 'piscina' | 'asador' | 'visible'): void {
    this.propiedad[prop] = !this.propiedad[prop];
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
