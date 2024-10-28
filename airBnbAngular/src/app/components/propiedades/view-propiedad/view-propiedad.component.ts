import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Observable, of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {PropiedadDTO} from "../../../DTOs/PropiedadDTO";
import {SolicitudDTO} from "../../../DTOs/SolicitudDTO";
import {UsuarioDTO} from "../../../DTOs/UsuarioDTO";
import {PropiedadService} from "../../../services/propiedad.service";
import {UsuarioService} from "../../../services/usuario.service";
import {SolicitudService} from "../../../services/solicitud.service";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-propiedad',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './view-propiedad.component.html',
  styleUrl: './view-propiedad.component.css'
})
export class ViewPropiedadComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  usuario: UsuarioDTO | undefined;
  solicitud: SolicitudDTO = {
    solicitudId: 0,
    arrendatario: {} as UsuarioDTO, // Inicializa los campos necesarios
    propiedad: {} as PropiedadDTO,
    fechaInicio: '',
    fechaFin: ''
  };

  propiedadId: number = 0;
  nuevaFotoUrl: string = ''; // Enlaza con el campo de texto de la URL de la nueva foto
  usuarioActualId: number = 0;  // ID del usuario autenticado
  esArrendador: boolean = false;
  rol: string = 'arrendador'; //el admin
  imagenIndex: number = 0; // índice de la imagen actual en el carrusel

  constructor(private route: ActivatedRoute,
              private propiedadService: PropiedadService,
              private usuarioService: UsuarioService,
              private solicitudService: SolicitudService,
              private router: Router) {}

  // Método que se ejecuta al cargar el componente
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propiedadId = +params['idP'] || 0;
      this.usuarioActualId = +params['id'] || 0;  // Convierte a número o establece 0 si es `NaN`

      // Verificar si los IDs son válidos
      if (this.propiedadId) {
        this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
          this.propiedad = data;
        });
      }

      if (this.usuarioActualId) {
        this.usuarioService.obtenerUsuarioPorId(this.usuarioActualId).subscribe((data: UsuarioDTO) => {
          this.usuario = data;
        });
      }
    });
  }


  // Navegación en el carrusel
  // Navegación en el carrusel
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
      if (this.propiedad.estado) {
        console.log('Propiedad disponible');

        this.propiedad.estado = 'ACTIVE';
        this.propiedadService.updatePropiedad(this.propiedad).subscribe((data: PropiedadDTO) => {
          console.log('Propiedad actualizada');
          //console.log(this.propiedad)
        }, or => {
          console.log('Error al actualizar la propiedad');
        });
      } else {
        console.log('Propiedad no disponible');

        this.propiedad.estado = 'INACTIVE';
        this.propiedadService.updatePropiedad(this.propiedad).subscribe((data: PropiedadDTO) => {
          console.log('Propiedad actualizada');
          //console.log(this.propiedad)
        }, or => {
          console.log('Error al actualizar la propiedad');
        });
      }
    }
  }

  actualizarPropiedad(){
    if (this.propiedad) {
      // this.propiedad toma TODOS los cambios realizados en el formulario
      this.propiedadService.updatePropiedad(this.propiedad).subscribe((data: PropiedadDTO) => {
        console.log('Propiedad actualizada');
      }, or => {
        console.log('Error al actualizar la propiedad');
      });
    }
  }

  // Redirige directamente a la página de detalles de reserva
  solicitarArriendo() {
    this.router.navigate(['/explorar', this.usuarioActualId, 'view-propiedad', this.propiedadId, 'detalles-reserva']);
  }
}
