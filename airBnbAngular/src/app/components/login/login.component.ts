import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  contrasenia: string = '';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Navegar a la página principal
  }

  onSubmit() {
    if (this.correo && this.contrasenia) {
      // Aquí puedes hacer la llamada HTTP a tu API
      console.log('Correo:', this.correo);
      console.log('Contraseña:', this.contrasenia);
      // Lógica adicional para iniciar sesión...
    }
  }
}
