import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {PropiedadService} from "../../services/propiedad.service";
import {PropiedadDTO} from "../../DTOs/PropiedadDTO";
import {Observable, of} from "rxjs";

@Component({
  selector: 'view-propiedad',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './view-propiedad.component.html',
  styleUrl: './view-propiedad.component.css'
})
export class ViewPropiedadComponent implements OnInit {
  propiedad: PropiedadDTO | undefined;
  propiedadId: number = 0;

  constructor(private route: ActivatedRoute, private propiedadService: PropiedadService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propiedadId = +params['idP']; // El '+' convierte a número
      // Lógica para cargar la propiedad usando el ID
      this.propiedadService.getPropiedadById(this.propiedadId).subscribe((data: PropiedadDTO) => {
        this.propiedad = data; // Asignar los datos de la propiedad a la variable
      });
    });
  }
}
