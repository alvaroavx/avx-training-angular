import { Injectable } from '@angular/core';
import { AsistenciaModel, EstadoAsistencia } from '../../models/asistencia';

@Injectable({
  providedIn: 'root'
})

export class AsistenciaService {
  private asistencias: AsistenciaModel[] = [
    { id: 1, empleadoId: 1, fecha: new Date(2025, 0, 3), horaEntrada: '08:25', estado: EstadoAsistencia.Presente },
    { id: 2, empleadoId: 1, fecha: new Date(2025, 0, 4), horaEntrada: '08:45', estado: EstadoAsistencia.Atrasado },
    { id: 3, empleadoId: 2, fecha: new Date(2025, 0, 3), estado: EstadoAsistencia.Ausente }
  ];

  getAsistencias() {
    return this.asistencias;
  }

  getByEmpleadoId(empleadoId: number) {
    return this.asistencias.filter(a => a.empleadoId === empleadoId);
  }

  create(asistencia: AsistenciaModel) {
    asistencia.id = this.asistencias.length + 1;
    this.asistencias.push(asistencia);
  }
  
}
