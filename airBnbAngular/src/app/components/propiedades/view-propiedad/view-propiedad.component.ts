import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropiedadDTO } from '../../../DTOs/PropiedadDTO';
import { SolicitudDTO } from '../../../DTOs/SolicitudDTO';
import { UsuarioDTO } from '../../../DTOs/UsuarioDTO';
import { PropiedadService } from '../../../services/propiedad.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'view-propiedad',
  standalone: true,
  templateUrl: './view-propiedad.component.html',
  styleUrls: ['./view-propiedad.component.css'],
  imports: [NgIf, FormsModule, NgForOf, CommonModule]
})
export class ViewPropiedadComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  usuario: UsuarioDTO | undefined;
  solicitud: SolicitudDTO = {
    solicitudId: 0,
    arrendatario: {} as UsuarioDTO,
    propiedad: {} as PropiedadDTO,
    fechaInicio: '',
    fechaFin: ''
  };

  propiedadId: number = 0;
  usuarioActualId: number = 0;
  nuevaFotoUrl: string = '';
  esArrendador: boolean = false;
  imagenIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscríbete a los parámetros del padre para obtener 'idU'
    this.route.parent?.params.subscribe({
      next: (params: Params) => {
        this.usuarioActualId = +params['idU'] || 0;
        console.log('Después de setear usuarioActualId: ' + this.usuarioActualId);
      },
      error: (err) => console.error('Error obteniendo usuarioActualId:', err)
    });

    // Suscríbete a los parámetros actuales para obtener 'idP'
    this.route.params.subscribe({
      next: (params: Params) => {
        this.propiedadId = +params['idP'] || 0;
        console.log('Propiedad ID: ' + this.propiedadId);

        if (this.propiedadId) {
          this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
            this.propiedad = data;
          });
        }
      },
      error: (err) => console.error('Error obteniendo propiedadId:', err)
    });

    if (this.usuarioActualId) {
      this.usuarioService.obtenerUsuarioPorId(this.usuarioActualId).subscribe((data: UsuarioDTO) => {
        this.usuario = data;
      });
    }
  }

  siguienteImagen() {
    if (this.propiedad?.imagenes && this.propiedad.imagenes.length > 0) {
      this.imagenIndex = (this.imagenIndex + 1) % this.propiedad.imagenes.length;
    }
  }

  anteriorImagen() {
    if (this.propiedad?.imagenes && this.propiedad.imagenes.length > 0) {
      this.imagenIndex = (this.imagenIndex - 1 + this.propiedad.imagenes.length) % this.propiedad.imagenes.length;
    }
  }

  setImagenIndex(index: number) {
    if (this.propiedad?.imagenes && this.propiedad.imagenes.length > 0) {
      this.imagenIndex = index;
    }
  }

  agregarFoto() {
    if (this.propiedad && this.nuevaFotoUrl) {
      this.propiedad.imagenes.push(this.nuevaFotoUrl);
      this.nuevaFotoUrl = '';
    }
  }

  cambiarEstado() {
    if (this.propiedad) {
      this.propiedad.estado = this.propiedad.estado ? 'INACTIVE' : 'ACTIVE';
      this.propiedadService.updatePropiedad(this.propiedad).subscribe(
        () => console.log('Propiedad actualizada'),
        (err) => console.log('Error al actualizar la propiedad', err)
      );
    }
  }

  actualizarPropiedad() {
    if (this.propiedad) {
      this.propiedadService.updatePropiedad(this.propiedad).subscribe(
        () => console.log('Propiedad actualizada'),
        (err) => console.log('Error al actualizar la propiedad', err)
      );
    }
  }

  // view-propiedad.component.ts
  solicitarArriendo() {
    this.router.navigate([
      'explorar',
      this.usuarioActualId,
      'view-propiedad',
      this.propiedadId,
      'detalles-reserva',
    ]);
  }

}
