export enum EstadoLiquidacion {
    Pagado = 'Pagado',
    Pendiente = 'Pendiente',
    Rechazado = 'Rechazado'
}

export interface Liquidacion {
    id: number;
    empleadoId: number;
    mes: number;  // 1-12
    anio: number;
    sueldoBase: number;
    impuestos: number;
    pagoTotal: number;
    estado: EstadoLiquidacion;
}


export class LiquidacionModel implements Liquidacion {
    constructor(
        public id: number,
        public empleadoId: number,
        public mes: number,  // 1-12
        public anio: number,
        public sueldoBase: number,
        public impuestos: number,
        public pagoTotal: number,
        public estado: EstadoLiquidacion
    ) {}
}
