import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from '../DTOs/LoginDTO';
import {catchError, Observable, throwError} from 'rxjs';
import { UsuarioDTO } from '../DTOs/UsuarioDTO';
import { environment } from '../environments/environment.development';
import { SolicitudDTO } from '../DTOs/SolicitudDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtiene las opciones de encabezados con el token JWT actualizado
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

  // Método para iniciar sesión
  login(loginDTO: LoginDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(
      `${environment.SERVER_URL}/api/usuarios/login`,
      loginDTO
    );
  }

  // Crear solicitud
  crearSolicitud(solicitud: SolicitudDTO): Observable<SolicitudDTO> {
    return this.http
      .post<SolicitudDTO>(
        `${environment.SERVER_URL}/api/solicitudes`,
        solicitud,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al crear la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener solicitud por ID
  obtenerSolicitudPorId(id: number): Observable<SolicitudDTO> {
    return this.http
      .get<SolicitudDTO>(
        `${environment.SERVER_URL}/api/solicitudes/${id}`,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  getSolicitudesByArrendadorId(arrendadorId: number): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(`${environment.SERVER_URL}/api/solicitudes/de-arrendador/${arrendadorId}`, this.refreshHttpOptions());
  }
}
