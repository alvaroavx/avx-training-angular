import { Injectable } from '@angular/core';
import { Empleado, EstadoEmpleado } from '../../models/empleado';
import { of } from 'rxjs';

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
  
  create(empleado: any) {
    // Genera un nuevo ID incrementando el último (simple para mock)
    const nuevoId = this.empleados.length
      ? Math.max(...this.empleados.map(e => e.id)) + 1
      : 1;

    const nuevoEmpleado = {
      id: nuevoId,
      ...empleado
    };

    this.empleados.push(nuevoEmpleado);

    console.log('Empleado agregado:', nuevoEmpleado);
    return of(true);
  }
}
