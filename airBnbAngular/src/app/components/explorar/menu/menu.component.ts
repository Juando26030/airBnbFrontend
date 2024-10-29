import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; // Inject ActivatedRoute

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public esArrendador: boolean = false;
  private arrendadorId: string | null = null; // Store the extracted ID from the route

  constructor(private router: Router, private route: ActivatedRoute) {} // Inject ActivatedRoute

  ngOnInit() {
    // Verifica si estamos en un entorno de navegador
    if (typeof window !== 'undefined' && localStorage) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.esArrendador = usuario.rol === 'arrendador';
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }

    // Extract 'id' from the route parameters
    this.route.paramMap.subscribe(params => {
      this.arrendadorId = params.get('idU');
    });
  }

  irACrearPropiedad() {
    if (this.arrendadorId) {
      this.router.navigate([`/explorar/${this.arrendadorId}/crear-propiedad`]);
    } else {
      console.error('Arrendador ID no está disponible');
    }
  }
}
