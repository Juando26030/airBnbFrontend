// src/app/models/solicitud-dto.ts

import {UsuarioDTO} from "./UsuarioDTO";
import {PropiedadDTO} from "./PropiedadDTO";

export interface SolicitudDTO {
  solicitudId: number;
  arrendatario: UsuarioDTO;
  propiedad: PropiedadDTO;
  fechaInicio: string; // Formato ISO string para Date
  fechaFin: string;    // Formato ISO string para Date
}
