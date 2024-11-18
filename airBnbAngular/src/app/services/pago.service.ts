import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PagoDTO} from "../DTOs/PagoDTO";
import {SolicitudDTO} from "../DTOs/SolicitudDTO";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  crearPago(pago: PagoDTO): Observable<PagoDTO> {
    return this.http.post<PagoDTO>(`${environment.SERVER_URL}/api/pagos`, pago, { headers: this.headers });
  }
}
