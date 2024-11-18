import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { PropiedadDTO } from '../DTOs/PropiedadDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PropiedadService {
  private httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders() };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.setAuthHeaders();
  }

  /**
   * Configura los encabezados con el token JWT
   */
  private setAuthHeaders(): void {
    const token = this.authService.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  /**
   * Refresca los encabezados para garantizar que siempre se envíe el token actualizado
   */
  private refreshHttpOptions(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Obtener propiedades según filtros
  getPropiedadesUsuario(
    departamento: string,
    municipio: string,
    people: number
  ): Observable<PropiedadDTO[]> {
    let params = new HttpParams();
    if (departamento) params = params.set('departamento', departamento);
    if (municipio) params = params.set('municipio', municipio);
    if (people && people > 0) params = params.set('cant_personas', people.toString());

    return this.http
      .get<PropiedadDTO[]>(`${environment.SERVER_URL}/api/propiedades/buscar-usuario`, {
        params,
        headers: this.refreshHttpOptions().headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener propiedades por ID admin
  getPropiedadesAdmin(adminId: number): Observable<PropiedadDTO[]> {
    return this.http
      .get<PropiedadDTO[]>(
        `${environment.SERVER_URL}/api/propiedades/buscar-admin/${adminId}`,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener propiedad por ID
  getPropiedadById(id: number): Observable<PropiedadDTO> {
    return this.http
      .get<PropiedadDTO>(
        `${environment.SERVER_URL}/api/propiedades/${id}`,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al obtener propiedad:', error);
          return throwError(() => error);
        })
      );
  }

  // Actualizar propiedad
  updatePropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
    return this.http
      .put<PropiedadDTO>(
        `${environment.SERVER_URL}/api/propiedades/${propiedad.propiedadId}`,
        propiedad,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar propiedad:', error);
          return throwError(() => error);
        })
      );
  }

  // Crear propiedad
  crearPropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
    return this.http
      .post<PropiedadDTO>(
        `${environment.SERVER_URL}/api/propiedades/crear`,
        propiedad,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al crear propiedad:', error);
          return throwError(() => error);
        })
      );
  }
}
