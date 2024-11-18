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
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'view-propiedad',
  standalone: true,
  templateUrl: './view-propiedad.component.html',
  styleUrls: ['./view-propiedad.component.css'],
  imports: [NgIf, FormsModule, NgForOf, CommonModule]
})
export class ViewPropiedadComponent implements OnInit, AfterViewInit {
  propiedad: PropiedadDTO | undefined;
  usuario: UsuarioDTO | undefined;
  errorMensaje: string = '';
  solicitud: SolicitudDTO = {
    huespedes: 1,
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

  estado:boolean = false;

  @ViewChild('autoResize') textarea!: ElementRef;

  ngAfterViewInit() {
    this.adjustHeight(); // Initial height adjustment if needed
  }

  adjustHeight(): void {
    const textarea = this.textarea.nativeElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  }

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit() {

      // Verifica si estamos en un entorno de navegador
      if (typeof window !== 'undefined' && localStorage) {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        this.esArrendador = usuario.rol === 'arrendador';
      } else {
        console.warn('localStorage no está disponible en este entorno.');
      }

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
      this.estado = this.propiedad.estado ? true : false;
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


  solicitarArriendo() {
    this.usuarioService.obtenerUsuarioPorId(this.usuarioActualId).subscribe({
      next: (usuario: UsuarioDTO) => {
        // Construir la solicitud
        this.solicitud.arrendatario = usuario;
        // Verificar si 'propiedad' está definida antes de asignar
        if (this.propiedad) {
          this.solicitud.propiedad = this.propiedad;
          this.solicitud.huespedes = this.solicitud.huespedes || 1; // Número de huéspedes por defecto
          // Convertir las fechas al formato adecuado
          this.solicitud.fechaInicio = this.solicitud.fechaInicio ? this.formatDate(this.solicitud.fechaInicio) : new Date().toISOString(); // Fecha de inicio
          this.solicitud.fechaFin = this.solicitud.fechaFin ? this.formatDate(this.solicitud.fechaFin) : new Date().toISOString(); // Fecha de fin
        }
        // Llamar al servicio para crear la solicitud
        this.solicitudService.crearSolicitud(this.solicitud).subscribe({
          next: (data: SolicitudDTO) => {
            console.log('Solicitud creada exitosamente:', data);
            //Navegar al componente de pago
            this.router.navigate([
              'explorar',
              this.usuarioActualId,
              'view-propiedad',
              data.solicitudId, //mas bien mandar el id de la solicitud
              'pagar-reserva',
            ]);
          },
          error: (err) => {
            console.error('Error al crear la solicitud:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el usuario actual:', err);
      }
    });
  }


  // Método para formatear la fecha a 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''
  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split(".")[0] + 'Z'; // Elimina los milisegundos
  }


  //lo del incrementar huespedes
  incrementarHuespedes() {
    if (this.solicitud.huespedes < (this.propiedad?.cantPersonas || 1)) {
      this.solicitud.huespedes++;
      this.errorMensaje = '';
    } else {
      this.errorMensaje = `Máximo de personas: ${this.propiedad?.cantPersonas}`;
      setTimeout(() => this.errorMensaje = '', 3000);
    }
  }

  decrementarHuespedes() {
    if (this.solicitud.huespedes > 1) {
      this.solicitud.huespedes--;
    }
  }

}
