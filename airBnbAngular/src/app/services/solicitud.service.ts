import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../DTOs/LoginDTO";
import {Observable} from "rxjs";
import {UsuarioDTO} from "../DTOs/UsuarioDTO";
import {environment} from "../environments/environment.development";
import {SolicitudDTO} from "../DTOs/SolicitudDTO";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(loginDTO: LoginDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${environment.SERVER_URL}/api/usuarios/login`, loginDTO);
  }

  crearSolicitud(solicitud: SolicitudDTO): Observable<SolicitudDTO> {
    return this.http.post<SolicitudDTO>(`${environment.SERVER_URL}/api/solicitudes`, solicitud);
  }

  obtenerSolicitudPorId(id: number): Observable<SolicitudDTO> {
    return this.http.get<SolicitudDTO>(`${environment.SERVER_URL}/api/solicitudes/${id}`);
  }
}
