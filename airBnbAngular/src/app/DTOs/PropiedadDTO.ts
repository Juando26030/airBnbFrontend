import { UsuarioDTO } from './UsuarioDTO';

export interface PropiedadDTO {
  propiedad_id: number;
  arrendador_id: UsuarioDTO;  // Relación con UsuarioDTO
  imagen: string;
  nombre: string;
  departamento: string;
  municipio: string;
  tipo_de_ingreso: string;
  descripcion: string;
  cant_banos: number;
  cant_habitaciones: number;
  mascotas: boolean;
  piscina: boolean;
  asador: boolean;
  valor_noche: number;
  visible: boolean;
  calificacion: number;
  estado: string;
}
