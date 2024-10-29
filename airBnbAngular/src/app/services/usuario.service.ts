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
  login(loginDTO: LoginDTO): Observable<UsuarioDTO> {
    console.log("Entrando a servicio login con: ", loginDTO);
    return this.http.post<UsuarioDTO>(`${environment.SERVER_URL}/api/usuarios/login`, loginDTO);
  }


  // Método para crear un usuario
  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/usuarios`, usuario);
  }

  // Activar usuario
  activarUsuario(id: number): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/usuarios/activar/${id}`);
  }

  esArrendador(usuarioId: number): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/usuarios/tipo-usuario/${usuarioId}`);
  }

  obtenerUsuarioPorId(usuarioId: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${environment.SERVER_URL}/api/usuarios/${usuarioId}`);
  }
}
