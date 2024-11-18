import {SolicitudDTO} from "./SolicitudDTO";

export interface PagoDTO {
  solicitud: SolicitudDTO;
  monto: number;
  fechaPago: string; // Formato ISO string para Date

  cardNumber: number;
  cvv: number;
  expDate: string; // Formato ISO string para Date
}
