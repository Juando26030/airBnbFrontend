import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { UsuarioDTO } from '../DTOs/UsuarioDTO';
import { LoginDTO } from '../DTOs/LoginDTO';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
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
    console.log('Entrando a servicio login con: ', loginDTO);
    return this.http.post<UsuarioDTO>(
      `${environment.SERVER_URL}/api/usuarios/login`,
      loginDTO
    );
  }

  // Crear usuario
  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http
      .post(
        `${environment.SERVER_URL}/api/usuarios`,
        usuario,
        this.refreshHttpOptions() // Utilizamos refreshHttpOptions() aquí
      )
      .pipe(
        catchError((error) => {
          console.error('Error al crear el usuario:', error);
          return throwError(() => error);
        })
      );
  }


  // Activar usuario
  activarUsuario(id: number): Observable<any> {
    return this.http
      .get(`${environment.SERVER_URL}/api/usuarios/activar/${id}`, this.refreshHttpOptions())
      .pipe(
        catchError((error) => {
          console.error('Error al activar el usuario:', error);
          return throwError(() => error);
        })
      );
  }

  // Verificar si es arrendador
  esArrendador(usuarioId: number): Observable<any> {
    return this.http
      .get(`${environment.SERVER_URL}/api/usuarios/tipo-usuario/${usuarioId}`, this.refreshHttpOptions())
      .pipe(
        catchError((error) => {
          console.error('Error al verificar tipo de usuario:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener usuario por ID
  obtenerUsuarioPorId(usuarioId: number): Observable<UsuarioDTO> {
    return this.http
      .get<UsuarioDTO>(
        `${environment.SERVER_URL}/api/usuarios/${usuarioId}`,
        this.refreshHttpOptions()
      )
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el usuario:', error);
          return throwError(() => error);
        })
      );
  }
}
