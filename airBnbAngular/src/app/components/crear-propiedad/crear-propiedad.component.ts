import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Importa NgForm para trabajar con formularios
import { PropiedadDTO } from "../../DTOs/PropiedadDTO";
import { Router, ActivatedRoute } from "@angular/router"; // Importamos ActivatedRoute para acceder a los parámetros de la URL
import { PropiedadService } from "../../services/propiedad.service";
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
  @ViewChild('propiedadForm') propiedadForm!: NgForm; // Referencia al formulario

  propiedad: PropiedadDTO = {
    propiedadId: 0,
    arrendadorId: 0,  // Aquí asignaremos el ID desde la URL
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
    estado: 'ACTIVO'
  };

  errorMsg: string | null = null;
  private arrendadorId: number = 0;

  constructor(
    private router: Router,
    private propiedadService: PropiedadService,
    private route: ActivatedRoute // Inyectamos ActivatedRoute para acceder a los parámetros de la URL
  ) {}

  ngOnInit() {
    // Intentamos obtener el id de la ruta padre (si existe) o directamente de la ruta actual
    const parentRoute = this.route.parent ? this.route.parent : this.route;

    parentRoute.params.subscribe(params => {  // Suscripción a los parámetros de la ruta
      this.arrendadorId = +params['id'];  // El '+' convierte el string a número
      if (!isNaN(this.arrendadorId)) {  // Verifica que no sea NaN
        this.propiedad.arrendadorId = this.arrendadorId; // Asignar el ID del arrendador a la propiedad
        console.log('Arrendador ID:', this.arrendadorId);
      } else {
        console.error('El ID del arrendador no es válido');
      }
    });
  }

  onSubmit() {
    // Validación automática usando la referencia del formulario
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
