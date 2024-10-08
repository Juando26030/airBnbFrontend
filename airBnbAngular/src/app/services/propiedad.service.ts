import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  getPropiedades(ubicacion: string, cant_personas: number): Observable<PropiedadDTO[]> {
    return this.http.get<PropiedadDTO[]>(`${environment.SERVER_URL}/api/propiedades/buscar`, {
      params: {
        ubicacion: ubicacion,
        cant_personas: cant_personas.toString() // Convertimos el número a string para los query params
      }
    });
  }

}
