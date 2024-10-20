import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../DTOs/UsuarioDTO';
import { LoginDTO } from '../DTOs/LoginDTO';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(loginDTO: LoginDTO): Observable<any> {
    // Envía loginDTO en el cuerpo de la solicitud
    return this.http.post(`${environment.SERVER_URL}/api/usuarios/login`, loginDTO);
  }

  // Método para crear un usuario
  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/usuarios`, usuario);
  }

  // Activar usuario
  activarUsuario(id: number): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/usuarios/activar/${id}`);
  }
}
