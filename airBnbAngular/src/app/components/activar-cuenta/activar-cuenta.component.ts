import { Component } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {
  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Obtener el ID del usuario de la URL
    this.usuarioService.activarUsuario(id).subscribe({
      next: () => {
        this.router.navigate(['/sesion/login']); // Redirigir al login después de la activación
      },
      error: (error) => {
        console.error('Error en la activación:', error);
      }
    });
  }
}
