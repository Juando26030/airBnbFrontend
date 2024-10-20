import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import {NgIf} from "@angular/common";
import {LoginDTO} from "../../DTOs/LoginDTO";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasenia: string = '';
  errorMsg: string | null = null;
  loginDTO: LoginDTO = {} as LoginDTO;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (!this.correo || !this.contrasenia) {
      this.errorMsg = "Todos los campos son obligatorios.";
      return; // Detenemos el proceso si los campos están vacíos
    }
    this.loginDTO.contrasenia = this.contrasenia;
    this.loginDTO.correo = this.correo;
    this.usuarioService.login(this.loginDTO).subscribe({
      next: (response) => {
        if (response.autenticado) {
          this.router.navigate(['/explorar']); // Usuario autenticado, redirigimos
        }
      },
      error: (error) => {
        // Mensajes de error específicos según el estado
        if (error.status === 403) {
          this.errorMsg = "Debes autenticar tu cuenta a través del correo electrónico.";
        } else if (error.status === 401) {
          this.errorMsg = "Usuario o contraseña no válidos.";
        } else {
          this.errorMsg = "Error desconocido. Por favor, intenta nuevamente.";
        }
      }
    });
  }
}
