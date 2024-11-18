import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PagoDTO} from "../DTOs/PagoDTO";
import {SolicitudDTO} from "../DTOs/SolicitudDTO";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(private http: HttpClient) {}

  crearPago(pago: PagoDTO): Observable<PagoDTO> {
    return this.http.post<PagoDTO>(`${environment.SERVER_URL}/api/pagos`, pago);
  }
}
