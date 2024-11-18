import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { UsuarioDTO } from "../../../DTOs/UsuarioDTO";
import { Rol } from "../../../DTOs/rol";
import { CommonModule } from "@angular/common";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  contrasenia: string = '';
  confirmarContrasenia: string = '';
  rolSeleccionado: { id: number; tipoRol: Rol } | null = null; // Cambiado para reflejar el formato de rol
  errorMsg: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Método para seleccionar el rol
  seleccionarRol(tipoRol: Rol) {
    this.rolSeleccionado = {
      id: tipoRol === Rol.Arrendador ? 1 : 2, // Asignar ID según el tipo de rol
      tipoRol: tipoRol, // Usar el valor del enum directamente
    };
  }

  // Validación y envío del formulario
  onSubmit() {
    // Validar contraseñas
    if (this.contrasenia !== this.confirmarContrasenia) {
      this.errorMsg = "Las contraseñas no coinciden.";
      return;
    }

    // Validar que un rol esté seleccionado
    if (!this.rolSeleccionado) {
      this.errorMsg = "Debe seleccionar un rol.";
      return;
    }

    // Crear el objeto UsuarioDTO
    const usuario: UsuarioDTO = {
      usuarioId: 0,
      nombre: this.nombre.trim(),
      correo: this.correo.trim(),
      telefono: this.telefono.trim(),
      contrasenia: this.contrasenia,
      confirmarContrasenia: this.confirmarContrasenia,
      rol: this.rolSeleccionado, // Usar el rol seleccionado
      estado: "activo",
      autenticado: false,
    };

    // Llamar al servicio para crear el usuario
    this.usuarioService.crearUsuario(usuario).subscribe({
      next: (response) => {
        // Redirigir al componente de confirmación
        this.router.navigate(['/sesion/usuario-creado'], { queryParams: { correo: this.correo } });
      },
      error: (error) => {
        this.errorMsg = error.error && typeof error.error === 'string'
          ? error.error
          : "Error al crear usuario. Intente nuevamente.";
        console.error('Error al crear usuario:', error);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  protected readonly Rol = Rol;
}
