import { Injectable } from '@angular/core';
import { ContratoModel, TipoContrato } from '../../models/contrato';

@Injectable({
  providedIn: 'root'
})

export class ContratoService {
  private contratos: ContratoModel[] = [
    { id: 1, empleadoId: 1, fechaInicio: new Date(2023, 0, 15), cargo: 'Desarrolladora', salario: 1500000, tipo: TipoContrato.Indefinido, documentoPdf: 'contrato_ana.pdf' },
    { id: 2, empleadoId: 2, fechaInicio: new Date(2024, 3, 1), cargo: 'Soporte', salario: 1200000, tipo: TipoContrato.PlazoFijo, fechaFin: new Date(2025, 2, 31) }
  ];

  getContratos() {
    return this.contratos;
  }

  getByEmpleadoId(empleadoId: number) {
    return this.contratos.filter(c => c.empleadoId === empleadoId);
  }
}
