import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams, HttpProgressEvent,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../environments/environment.development";
import {PropiedadDTO} from "../DTOs/PropiedadDTO";

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }
  constructor(private http:HttpClient) { }

  // Obtener propiedades según filtros
  getPropiedadesUsuario(departamento: string, municipio: string, people: number): Observable<PropiedadDTO[]> {
    let params = new HttpParams();
    if (departamento) params = params.set('departamento', departamento);
    if (municipio) params = params.set('municipio', municipio);
    if (people && people > 0) params = params.set('cant_personas', people.toString());

    return this.http.get<PropiedadDTO[]>(`${environment.SERVER_URL}/api/propiedades/buscar-usuario`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
  }


  //Obtener propiedades por id admin
  getPropiedadesAdmin(adminId: number): Observable<PropiedadDTO[]> {
    return this.http.get<PropiedadDTO[]>(`${environment.SERVER_URL}/api/propiedades/buscar-admin/${adminId}`);
  }


  getPropiedadById(id: number): Observable<PropiedadDTO> {
    return this.http.get<PropiedadDTO>(`${environment.SERVER_URL}/api/propiedades/${id}`);
  }

  // Actualizar propiedad
  updatePropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
    return this.http.put<PropiedadDTO>(`${environment.SERVER_URL}/api/propiedades/${propiedad.propiedadId}`, propiedad, this.httpOptions);
  }

  // Crear propiedad
  crearPropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
    return this.http.post<PropiedadDTO>(`${environment.SERVER_URL}/api/propiedades/crear`, propiedad, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error al crear propiedad:', error);
          return throwError(() => error);
        })
      );
  }
}
