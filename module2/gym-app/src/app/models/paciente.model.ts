
export interface FichaPaciente {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  diagnostico?: string; // opcional
}

export class Paciente implements FichaPaciente {
  constructor(
    public id: number,
    public nombre: string,
    public fechaNacimiento: Date,
    public diagnostico?: string
  ) {}

  getEdad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}

export class PacienteVIP extends Paciente {
  constructor(
    id: number,
    nombre: string,
    fechaNacimiento: Date,
    public nivelAtencion: "Basico" | "Urgente" | "Critico",
    diagnostico?: string
  ) {
    super(id, nombre, fechaNacimiento, diagnostico);
  }

  getEtiqueta(): string {
    return `Paciente ${this.nombre} (${this.nivelAtencion})`;
  }
}