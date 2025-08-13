export enum TipoContrato {
    Indefinido  = 'Indefinido',
    PlazoFijo  = 'Plazo fijo',
    Honorarios  = 'Honorarios',
}

export interface Contrato {
    id: number;
    empleadoId: number;       // Relación con Empleado
    fechaInicio: Date;
    fechaFin?: Date;
    cargo: string;
    salario: number;
    tipo: TipoContrato;
    documentoPdf?: string;    // ruta o nombre de archivo PDF
}

export class ContratoModel implements Contrato {
    constructor(
        public id: number,
        public empleadoId: number,       // Relación con Empleado
        public fechaInicio: Date,
        public cargo: string,
        public salario: number,
        public tipo: TipoContrato,
        public documentoPdf?: string,
        public fechaFin?: Date
      ) {}
}
