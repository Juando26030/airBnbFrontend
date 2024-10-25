import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";  // Importa Router
import { PropiedadService } from "../../../services/propiedad.service";
import { PropiedadDTO } from "../../../DTOs/PropiedadDTO";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'view-propiedad',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './view-propiedad.component.html',
  styleUrls: ['./view-propiedad.component.css']
})
export class ViewPropiedadComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  propiedadId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private router: Router  // Inyecta el Router aquí
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propiedadId = +params['idP'];  // El '+' convierte a número
      this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
        this.propiedad = data;
      });
    });
  }

  // Función para redirigir a otra página
  goToPage(pageName: string) {
    this.router.navigate([pageName]);  // Usa el Router para navegar a la página
  }

  cambiarEstado() {
    if (this.propiedad) {
      this.propiedad.estado = this.propiedad.estado ? 'ACTIVE' : 'INACTIVE';
      this.propiedadService.updatePropiedad(this.propiedad).subscribe(
        (data: PropiedadDTO) => {
          console.log('Propiedad actualizada');
        },
        error => {
          console.log('Error al actualizar la propiedad');
        }
      );
    }
  }
}
