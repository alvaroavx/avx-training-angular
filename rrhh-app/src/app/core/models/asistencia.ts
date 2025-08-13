export enum EstadoAsistencia {
  Presente    = 'Presente',
  Atrasado  = 'Atrasado',
  Ausente    = 'Ausente'
}

export interface Asistencia {
    id: number;
    empleadoId: number;
    fecha: Date;
    horaEntrada?: string; // "08:30"
    estado: EstadoAsistencia;
}

export class AsistenciaModel implements Asistencia {
    constructor(
        public id: number,
        public empleadoId: number,
        public fecha: Date,
        public estado: EstadoAsistencia,
        public horaEntrada?: string, // "08:30"
    ) {}
}