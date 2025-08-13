// Enums de apoyo para RRHH
export enum EstadoEmpleado {
  Activo = 'Activo',
  Licencia = 'En licencia',
  Suspendido = 'Suspendido',
  Egreso = 'Egreso'
}
export enum TipoContrato {
  Indefinido = 'Indefinido',
  PlazoFijo = 'Plazo fijo',
  Honorarios = 'Honorarios',
  Practica = 'Práctica'
}
export enum Jornada {
  Completa = 'Completa',
  Parcial = 'Parcial',
  Turnos = 'Turnos'
}
export enum ModalidadTrabajo {
  Presencial = 'Presencial',
  Remoto = 'Remoto',
  Hibrido = 'Híbrido'
}
export enum Moneda {
  CLP = 'CLP',
  USD = 'USD',
  EUR = 'EUR'
}
// Tipos de apoyo
export interface Direccion {
  calle: string;
  numero?: string;
  comuna?: string;
  ciudad?: string;
  region?: string;
  pais?: string;
}
export interface ContactoEmergencia {
  nombre: string;
  parentesco: string;
  telefono: string;
}
export interface Certificacion {
  nombre: string;
  fechaExpiracion?: Date;
}
// Interfaz principal
export interface Persona {
  id: number;
  rut: string;                         // Chile: RUT/RUN (string para mantener formato)
  nombres: string;
  apellidos: string;
  emailLaboral: string;
  emailPersonal?: string;
  telefonoMovil?: string;
  telefonoFijo?: string;
  direccion?: Direccion;

  fechaNacimiento: Date;

  // Datos laborales
  legajo?: string;                      // Nº interno/legajo
  cargo: string;
  departamento?: string;
  supervisorId?: number;
  fechaIngreso: Date;
  fechaEgreso?: Date;
  tipoContrato: TipoContrato;
  jornada: Jornada;
  modalidad: ModalidadTrabajo;

  // Compensaciones
  sueldoBase: number;
  moneda: Moneda;

  // Estado y RRHH
  estado: EstadoEmpleado;
  beneficios?: string[];               // Seguro, colación, transporte…
  skills?: string[];
  certificaciones?: Certificacion[];

  // Gestión
  contactoEmergencia?: ContactoEmergencia;
  vacacionesDiasAcumulados?: number;   // acumulados a la fecha
  vacacionesDiasTomados?: number;      // tomados históricamente
}

// Implementación con métodos útiles
export class PersonaModel implements Persona {
  constructor(
    public id: number,
    public rut: string,
    public nombres: string,
    public apellidos: string,
    public emailLaboral: string,
    public emailPersonal: string | undefined,
    public telefonoMovil: string | undefined,
    public telefonoFijo: string | undefined,
    public direccion: Direccion | undefined,
    public fechaNacimiento: Date,
    public legajo: string | undefined,
    public cargo: string,
    public departamento: string | undefined,
    public supervisorId: number | undefined,
    public fechaIngreso: Date,
    public fechaEgreso: Date | undefined,
    public tipoContrato: TipoContrato,
    public jornada: Jornada,
    public modalidad: ModalidadTrabajo,
    public sueldoBase: number,
    public moneda: Moneda,
    public estado: EstadoEmpleado,
    public beneficios: string[] | undefined,
    public skills: string[] | undefined,
    public certificaciones: Certificacion[] | undefined,
    public contactoEmergencia: ContactoEmergencia | undefined,
    public vacacionesDiasAcumulados: number | undefined,
    public vacacionesDiasTomados: number | undefined
  ) {}

  /** Nombre completo "Nombres Apellidos" */
  getNombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`.trim();
  }

  /** Iniciales, p. ej. "NV" */
  getIniciales(): string {
    const n = this.nombres?.[0] ?? '';
    const a = this.apellidos?.[0] ?? '';
    return (n + a).toUpperCase();
  }

  /** Edad (en años) calculada desde la fecha de nacimiento */
  getEdad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  /** Días hasta el próximo cumpleaños */
  getDiasHastaCumple(): number {
    const hoy = new Date();
    const proximo = new Date(hoy.getFullYear(), this.fechaNacimiento.getMonth(), this.fechaNacimiento.getDate());
    if (proximo < hoy) proximo.setFullYear(hoy.getFullYear() + 1);
    const ms = proximo.getTime() - hoy.getTime();
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
  }

  /** Antigüedad: retorna {años, meses} desde la fecha de ingreso (o hasta la fecha de egreso si existe) */
  getAntiguedad(): { anios: number; meses: number } {
    const fin = this.fechaEgreso ?? new Date();
    let anios = fin.getFullYear() - this.fechaIngreso.getFullYear();
    let meses = fin.getMonth() - this.fechaIngreso.getMonth();
    if (fin.getDate() < this.fechaIngreso.getDate()) meses--;
    if (meses < 0) {
      anios--;
      meses += 12;
    }
    return { anios: Math.max(anios, 0), meses: Math.max(meses, 0) };
  }

  /** Salario anual simple (12 * sueldoBase). Ajusta si pagas gratificación u otros bonos aparte. */
  getSueldoAnual(): number {
    return this.sueldoBase * 12;
  }

  /** Vacaciones disponibles = acumulados - tomados (no negativo) */
  getVacacionesDisponibles(): number {
    const acc = this.vacacionesDiasAcumulados ?? 0;
    const tom = this.vacacionesDiasTomados ?? 0;
    return Math.max(acc - tom, 0);
  }

  /** Marca consumo de días de vacaciones (actualiza tomados) */
  tomarVacaciones(dias: number = 1): void {
    const disponibles = this.getVacacionesDisponibles();
    const usar = Math.min(disponibles, Math.max(dias, 0));
    this.vacacionesDiasTomados = (this.vacacionesDiasTomados ?? 0) + usar;
  }

  /** ¿Contrato vigente a una fecha? (true si no hay egreso o egreso es futuro) */
  contratoVigente(aFecha: Date = new Date()): boolean {
    return !this.fechaEgreso || this.fechaEgreso >= aFecha;
  }

  /** ¿Empleado operativo? (Activo y con contrato vigente) */
  estaOperativo(): boolean {
    return this.estado === EstadoEmpleado.Activo && this.contratoVigente();
  }

  /** Resumen legible para listados (RRHH) */
  getResumenRRHH(): string {
    const { anios, meses } = this.getAntiguedad();
    const antig = `${anios}a ${meses}m`;
    return `${this.getNombreCompleto()} · ${this.cargo} · ${this.departamento ?? '—'} · ` +
           `Ingreso: ${this.fechaIngreso.toLocaleDateString()} · Antigüedad: ${antig} · ` +
           `Estado: ${this.estado} · Sueldo: ${this.moneda} ${this.sueldoBase.toLocaleString()}`;
  }

  /** (Simple) Formatea RUT a XX.XXX.XXX-Y si viene sin puntos/guión */
  formatRut(): string {
    const clean = this.rut.replace(/\D/g, '');
    if (clean.length < 8) return this.rut; // no intentar si es raro
    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1);
    const conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${conPuntos}-${dv}`;
  }
}
