export enum EstadoEmpleado {
  Activo    = 'Activo',
  Licencia  = 'Licencia',
  Egreso    = 'Egreso'
}

export interface Empleado { 
    id: number; 
    nombre: string; 
    cargo: string; 
    estado: EstadoEmpleado;
}

export class EmpleadoModel implements Empleado {
  constructor(
    public id: number,
    public nombre: string,
    public cargo: string,
    public estado: EstadoEmpleado
  ) {}
}