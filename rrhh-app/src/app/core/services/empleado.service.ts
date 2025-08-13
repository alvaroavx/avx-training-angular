import { Injectable } from '@angular/core';
import { Empleado, EstadoEmpleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {
  public EstadoEmpleado = EstadoEmpleado;

  empleados: Empleado[] = [
      { id:1, nombre:'Ana Pérez', cargo:'Desarrolladora', estado: EstadoEmpleado.Activo},
      { id:2, nombre:'Luis Gómez', cargo:'Soporte', estado: EstadoEmpleado.Egreso },
      { id:3, nombre:'Carlos Villagrán', cargo:'Jefatura', estado: EstadoEmpleado.Licencia }
    ];

  getEmpleados() { 
    return this.empleados;
  }

  getById(id:number) { 
    return this.getEmpleados().find(e => e.id===id) ?? null; 
  }
}
