import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {VentanaReservaComponent} from "../ventana-reserva/ventana-reserva.component";
import {PropiedadDTO} from "../../../DTOs/PropiedadDTO";
import {UsuarioDTO} from "../../../DTOs/UsuarioDTO";
import {PropiedadService} from "../../../services/propiedad.service";
import {UsuarioService} from "../../../services/usuario.service";
import {SolicitudService} from "../../../services/solicitud.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VentanaReservaComponent],
  templateUrl: './detalles-reserva.component.html',
  styleUrls: ['./detalles-reserva.component.css']
})
export class DetallesReservaComponent implements OnInit {
  paymentMethods = [
    { name: "Tarjeta" },
    { name: "Transferencia Bancaria" },
  ];

  propiedad: PropiedadDTO | undefined;
  usuario: UsuarioDTO | undefined;
  propiedadId: number = 0;
  usuarioActualId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudService,
    private router: Router) { }

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

  // detalles-reserva.component.ts
  goToPagarReserva() {
    this.router.navigate([
      'explorar',
      this.usuarioActualId,
      'view-propiedad',
      this.propiedadId,
      'pagar-reserva',
    ]);
  }



}
