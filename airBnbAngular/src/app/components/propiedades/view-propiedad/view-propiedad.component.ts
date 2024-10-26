import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {Observable, of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {PropiedadDTO} from "../../../DTOs/PropiedadDTO";
import {UsuarioDTO} from "../../../DTOs/UsuarioDTO";
import {PropiedadService} from "../../../services/propiedad.service";
import {UsuarioService} from "../../../services/usuario.service";
import {SolicitudDTO} from "../../../DTOs/SolicitudDTO";
import {SolicitudService} from "../../../services/solicitud.service";
import SwiperCore, {} from 'swiper';
import {Navigation, Pagination} from "swiper/types/modules";

// Importa los módulos necesarios para Swiper
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'view-propiedad',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './view-propiedad.component.html',
  styleUrl: './view-propiedad.component.css'
})
export class ViewPropiedadComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  nuevaFotoUrl: string = '';
  solicitud: SolicitudDTO = {
    solicitudId: 0,
    arrendatario: {} as UsuarioDTO, // Inicializa los campos necesarios
    propiedad: {} as PropiedadDTO,
    fechaInicio: '',
    fechaFin: ''
  };

  propiedadId: number = 0;
  esArrendador: boolean = false;
  rol: string = 'arrendador'; //el admin

  constructor(private route: ActivatedRoute,
              private propiedadService: PropiedadService,
              private usuarioService: UsuarioService,
              private solicitudService: SolicitudService,
              private router: Router) {}

  // Método que se ejecuta al cargar el componente
  ngOnInit() {this.route.params.subscribe(params => { //se suscirbe para obtener params de URL

    this.propiedadId = +params['idP']; // El '+' convierte a número
    // Lógica para cargar la propiedad usando el ID
    this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
      this.propiedad = data; // Asignar los datos de la propiedad a la variable

      // Asignar el valor de esArrendador basado en el rol del usuario
      this.rol = this.usuarioService.getRol();
      if(this.rol === 'arrendador'){
        this.esArrendador = true;
      }
      console.log("EL ROL ES : "+ this.rol)
    });
  });
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


  subirFoto(){
    if (this.propiedad && this.nuevaFotoUrl) {
      this.propiedad.imagenes.push(this.nuevaFotoUrl);
      this.propiedadService.updatePropiedad(this.propiedad).subscribe((data: PropiedadDTO) => {
        console.log('Imagen subida y propiedad actualizada');
      }, or => {
        console.log('Error al subir la imagen');
      });
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

  solicitarArriendo() {
    if (this.propiedad) {
      this.solicitud.propiedad = this.propiedad;
      this.solicitud.arrendatario = this.usuarioService.getUsuarioAutenticado();
    }

    this.solicitudService.crearSolicitud(this.solicitud).subscribe(
      (data: SolicitudDTO) => {
        console.log('Solicitud creada');
        // Redirige a detalles de la reserva
        this.router.navigate([
          `/explorar/${this.route.snapshot.params['id']}/view-propiedad/${this.propiedadId}/detalles-reserva`
        ]);
      },
      (error) => {
        console.log('Error al crear la solicitud', error);
      }
    );
  }
}
