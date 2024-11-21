import {Component, Input} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-usuario-creado',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './usuario-creado.component.html',
  styleUrl: './usuario-creado.component.css'
})
export class UsuarioCreadoComponent {
  correo: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo']; // Recibir el correo del nuevo usuario
    });
  }
}
