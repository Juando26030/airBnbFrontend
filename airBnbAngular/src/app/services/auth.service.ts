import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from "../environments/environment.development";
import { Rol } from "../DTOs/rol";
import { Auth } from "../DTOs/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  rol: Rol | null = null;
  correo: string | null = null;
  usuarioId: number | null = null;

  private baseUrl = `${environment.SERVER_URL}/autenticacion`;
  private registerUrl = `${environment.SERVER_URL}/usuarios`;

  constructor(private http: HttpClient) {
    if (this.isBrowser()) {
      this.token = localStorage.getItem('auth_token');
      this.rol = localStorage.getItem('auth_role') as Rol | null;
      this.correo = localStorage.getItem('correo');
      this.usuarioId = Number(localStorage.getItem('usuarioId'));
    }
  }

  // Verificar si se está ejecutando en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public register(user: any): Observable<any> {
    return this.http.post(`${this.registerUrl}`, user, { observe: 'response' }).pipe(
      tap((response) => {
        console.log('Usuario registrado exitosamente', response);
      }),
      map((response) => response.body || {}), // Manejar caso de respuesta vacía
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error(error.message || 'Error al registrar usuario.'));
      })
    );
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.refresh().toPromise();
      return true;
    } catch {
      return false;
    }
  }

  public login(correo: string, contrasenia: string): Observable<Auth> {
    console.log('Iniciando proceso de login en AuthService');

    return this.http.post<Auth>(`${this.baseUrl}/login`, { correo, contrasenia }).pipe(
      tap((data) => {
        console.log('Respuesta recibida del servidor:', data);

        // Asignación y almacenamiento de token, rol, correo e ID de usuario
        this.token = data.accessToken;
        this.rol = data.rol;
        this.correo = data.correo;
        this.usuarioId = data.usuarioId;

        if (this.isBrowser()) {
          localStorage.setItem('auth_token', this.token);
          localStorage.setItem('auth_role', this.rol);
          localStorage.setItem('correo', this.correo);
          localStorage.setItem('usuarioId', this.usuarioId.toString());
        }

        // Verificación de datos almacenados
        console.log('Token guardado:', this.token);
        console.log('Rol asignado:', this.rol);
        console.log('Correo guardado:', this.correo);
        console.log('Id de usuario guardado:', this.usuarioId);
      })
    );
  }

  public logout(): void {
    console.log('Cerrando sesión y eliminando datos de autenticación');
    this.token = null;

    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_role');
      localStorage.removeItem('correo');
      localStorage.removeItem('usuarioId');
    }
  }

  public getToken(): string {
    return this.token!;
  }

  public refresh(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .post<Auth>(`${this.baseUrl}/refresh`, {}, { headers })
      .pipe(
        tap((data) => {
          this.token = data.accessToken;
          if (this.isBrowser()) {
            localStorage.setItem('auth_token', this.token);
          }
          console.log('Token actualizado en refresh:', this.token);
        }),
        map((data) => data.accessToken)
      );
  }
}
