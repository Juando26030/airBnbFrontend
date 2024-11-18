import {Rol} from "./rol";

export class Auth {
  accessToken: string;
  correo: string;
  rol: Rol;
  usuarioId: number;

  constructor(accessToken: string, username: string, rol: Rol, usuarioId: number) {
    this.accessToken = accessToken;
    this.correo = username;
    this.rol = rol;
    this.usuarioId = usuarioId;
  }
}
