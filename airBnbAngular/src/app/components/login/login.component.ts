import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import {NgIf} from "@angular/common";
import {LoginDTO} from "../../DTOs/LoginDTO";
import {UsuarioDTO} from "../../DTOs/UsuarioDTO";

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
  usuarioDTO: UsuarioDTO = {} as UsuarioDTO;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (!this.correo || !this.contrasenia) {
      this.errorMsg = "Todos los campos son obligatorios.";
      return;
    }

    this.loginDTO.contrasenia = this.contrasenia;
    this.loginDTO.correo = this.correo;

    this.usuarioService.login(this.loginDTO).subscribe({
      next: (response) => {
        if (response.autenticado) {
          // Guardar el usuario en localStorage para acceder a su rol
          localStorage.setItem('usuario', JSON.stringify(response));

          console.log("El usuario id: "+response.usuarioId);
          console.log("El usuario rol: "+response.rol);

          // Redirigir al componente "explorar" con el ID del usuario
          this.router.navigate(['/explorar', response.usuarioId]);
        }
      },
      error: (error) => {
        this.errorMsg = "Error en el inicio de sesión. Por favor, intente nuevamente.";
      }
    });
  }

}
