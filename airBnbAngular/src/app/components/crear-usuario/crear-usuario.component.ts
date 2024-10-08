import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})

export class CrearUsuarioComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  arrendador: boolean = false;
  arrendatario: boolean = false;
  contrasenia: string = '';
  confirmarContrasenia: string = '';
  errorMsg: string | null = null;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.contrasenia !== this.confirmarContrasenia) {
      this.errorMsg = "Las contraseñas no coinciden.";
      return;
    }

    if (!this.arrendador && !this.arrendatario) {
      this.errorMsg = "Debe seleccionar al menos un rol.";
      return;
    }

    // Aquí puedes realizar la llamada HTTP a la API para crear el usuario.
    console.log('Nombre:', this.nombre);
    console.log('Correo:', this.correo);
    console.log('Teléfono:', this.telefono);
    console.log('Rol:', this.arrendador ? 'Arrendador' : '', this.arrendatario ? 'Arrendatario' : '');
    console.log('Contraseña:', this.contrasenia);

    // Lógica adicional después de la creación del usuario...
    this.router.navigate(['/sesion/login']);
  }
}
