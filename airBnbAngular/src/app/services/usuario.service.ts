import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment.development";

export interface Usuario {
  nombre: string;
  correo: string;
  telefono: string;
  contrasenia: string;
  rol: string;  // "arrendador" o "arrendatario"
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(correo: string, contrasenia: string): Observable<any> {
    const params = { correo, contrasenia };
    return this.http.post(`${environment.SERVER_URL}/login`, null, { params });
  }

  // Método para crear un usuario
  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(environment.SERVER_URL, usuario);
  }
}
