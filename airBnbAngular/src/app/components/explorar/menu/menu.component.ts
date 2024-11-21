import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {UsuarioService} from "../../../services/usuario.service";

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
  public esAdmin: boolean = false; // Indica si el usuario es ADMIN o ARRENDADOR
  private usuarioIdS: string | null = null; // ID del usuario extraído de la ruta
  private usuarioId: number = 0; // ID del usuario convert

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    console.log('Inicializando componente MenuComponent');
    // Extraer ID de usuario desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.usuarioIdS = params.get('idU');
      if(this.usuarioIdS!=null){
        this.usuarioId = +this.usuarioIdS
        this.esAdminFun();
      }
    });

  }

  esAdminFun(){
    this.usuarioService.esArrendador(this.usuarioId).subscribe(
      (resultado: boolean) => {
        this.esAdmin = resultado;
        console.log('Resultado del servicio esArrendador:', resultado);
        this.cdr.detectChanges(); // Forzar detección de cambios
      },
      (error) => {
        console.error('Error al obtener si es arrendador:', error);
      }
    );
  }


  irACrearPropiedad() {
    if (this.usuarioId) {
      this.router.navigate([`/explorar/${this.usuarioId}/crear-propiedad`]);
    } else {
      console.error('Usuario ID no está disponible');
    }
  }

  irAVerSolicitudes() {
    if (this.usuarioId) {
      console.log('Enviando ID de arrendador:', this.usuarioId);
      this.router.navigate([`/explorar/${this.usuarioId}/solicitudes`]);
    } else {
      console.error('Usuario ID no está disponible');
    }
  }

}
