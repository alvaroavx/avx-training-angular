export enum EstadoPaciente {
  ListoParaAlta = 'Listo para alta',
  Estable        = 'Estable',
  Regular        = 'Regular',
  Grave          = 'Grave',
  Critico        = 'Crítico'
}

export interface FichaPaciente {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  diagnostico?: string;
  email: string;
  telefono: string;
  habitacion: string;
  proximaCita: Date;
  medicamentos: string[];
  estado: EstadoPaciente; 
}

export class PacienteModel implements FichaPaciente {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public fechaNacimiento: Date,
    public diagnostico: string | undefined,
    public email: string,
    public telefono: string,
    public habitacion: string,
    public proximaCita: Date,
    public medicamentos: string[],
    public estado: EstadoPaciente
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

  getEtiqueta(): string {
    return `Paciente: ${this.nombre} ${this.apellido} tiene ${this.getEdad()} años`;
  }
  
  /**  
   * Retorna un resumen de contacto, habitación, próxima cita y medicación
   */
  getResumenDatos(): string {
    const meds = this.medicamentos.length
      ? this.medicamentos.join(', ')
      : 'sin medicación';
    const cita = this.proximaCita.toLocaleDateString();
    return `Contacto: ${this.email} / ${this.telefono}. ` +
           `Habitación: ${this.habitacion}. ` +
           `Próx. Cita: ${cita}. ` +
           `Medicamentos: ${meds}.`;
  }
}