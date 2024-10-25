import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UsuarioService} from "../../../services/usuario.service";
import {UsuarioDTO} from "../../../DTOs/UsuarioDTO";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
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

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    // Validar que las contraseñas coincidan
    if (this.contrasenia !== this.confirmarContrasenia) {
      this.errorMsg = "Las contraseñas no coinciden.";
      return;
    }

    // Validar que al menos un rol esté seleccionado
    if (!this.arrendador && !this.arrendatario) {
      this.errorMsg = "Debe seleccionar al menos un rol.";
      return;
    }

    // Crear el objeto de usuario conforme a la estructura de UsuarioDTO
    const usuario: UsuarioDTO = {
      usuarioId: 0, // Este campo lo puedes omitir o poner un valor temporal, será manejado por el backend
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      contrasenia: this.contrasenia,
      confirmarContrasenia: this.confirmarContrasenia, // Asegúrate de que se envíe este campo
      rol: this.arrendador ? 'arrendador' : 'arrendatario',
      estado: 'PENDIENTE', // Asignar estado inicial, por ejemplo, 'PENDIENTE'
      autenticado: false // El usuario no está autenticado inicialmente
    };

    // Llamar al servicio para crear el usuario
    this.usuarioService.crearUsuario(usuario).subscribe({
      next: (response) => {
        // Redirigir al componente de usuario creado si el usuario se crea correctamente
        this.router.navigate(['/sesion/usuario-creado'], { queryParams: { correo: this.correo } });
      },
      error: (error) => {
        this.errorMsg = "Error al crear usuario. Verifique si el correo ya está registrado.";
        console.error('Error al crear usuario:', error);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
