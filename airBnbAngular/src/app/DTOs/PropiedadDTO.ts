import { UsuarioDTO } from './UsuarioDTO';

export interface PropiedadDTO {
  propiedadId: number;
  arrendadorId: number;  // Relación con UsuarioDTO
  imagen: string;
  nombre: string;
  departamento: string;
  municipio: string;
  tipoDeIngreso: string;
  descripcion: string;
  cantBanos: number;
  cantHabitaciones: number;
  cantPersonas: number;
  mascotas: boolean;
  piscina: boolean;
  asador: boolean;
  valorNoche: number;
  visible: boolean;
  calificacion: number;
  estado: string;
}
