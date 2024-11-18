import {Rol} from "./rol";

export class Auth {
  accessToken: string;
  username: string;
  rol: Rol;

  constructor(accessToken: string, username: string, rol: Rol) {
    this.accessToken = accessToken;
    this.username = username;
    this.rol = rol;
  }
}
