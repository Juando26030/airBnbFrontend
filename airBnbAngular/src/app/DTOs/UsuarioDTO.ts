import {Rol} from "./rol";

export interface UsuarioDTO {
  usuarioId: number;
  nombre: string;
  correo: string;
  telefono: string;
  contrasenia: string;
  confirmarContrasenia: string;
  rol: {
    id: number;
    tipoRol: Rol;
  }; // Cambiado para reflejar el formato esperado por el back-end
  estado: string;
  autenticado: boolean;
}
