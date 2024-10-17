import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";
import {PropiedadDTO} from "../DTOs/PropiedadDTO";

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private httnpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }
  constructor(private http:HttpClient) { }

  // Obtener propiedades según filtros
  getPropiedades(departamento: string, municipio: string, people: number): Observable<PropiedadDTO[]> {
    let params = new HttpParams();
    if (departamento) params = params.set('departamento', departamento);
    if (municipio) params = params.set('municipio', municipio);
    if (people) params = params.set('cant_personas', people.toString());

    return this.http.get<PropiedadDTO[]>(`${environment.SERVER_URL}/api/propiedades/buscar`, { params });
  }


  getPropiedadById(id: number): Observable<PropiedadDTO> {
    return this.http.get<PropiedadDTO>(`${environment.SERVER_URL}/api/propiedades/${id}`);
  }

  // Actualizar propiedad
  updatePropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
    return this.http.put<PropiedadDTO>(`${environment.SERVER_URL}/api/propiedades/${propiedad.propiedad_id}`, propiedad, this.httnpOptions);
  }

}
