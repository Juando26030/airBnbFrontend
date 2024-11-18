import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo: string = '';
  contrasenia: string = '';
  loading: boolean = false; // Indicador de carga
  errorMsg: string | null = null;

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService) {}

  goHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (!this.correo || !this.contrasenia) {
      alert('Por favor, ingrese su correo y contraseña');
      return;
    }

    this.loading = true;

    this.authService.login(this.correo, this.contrasenia).subscribe(
      (data) => {
        this.loading = false;
        // Redirigir a la ruta "explorar" con el ID del usuario
        this.router.navigate([`/explorar/${data.usuarioId}`]);
      },
      (error) => {
        this.loading = false;
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    );
  }

}
