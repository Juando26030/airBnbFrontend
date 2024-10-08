export interface UsuarioDTO {
  usuario_id: number;
  nombre: string;
  correo: string;
  telefono: string;
  contrasenia: string;
  confirmarContrasenia: string; // Campo de confirmación de contraseña
  rol: string; // Tipo de usuario
  estado: string;
  autenticado: boolean; // Indica si el usuario está autenticado
}
