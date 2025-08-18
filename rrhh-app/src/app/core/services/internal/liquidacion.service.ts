import { Injectable } from '@angular/core';
import { LiquidacionModel, EstadoLiquidacion } from '../../models/liquidacion';

@Injectable({
  providedIn: 'root'
})

export class LiquidacionService {
  private liquidaciones: LiquidacionModel[] = [
    { id: 1, empleadoId: 1, mes: 12, anio: 2024, sueldoBase: 1500000, impuestos: 300000, pagoTotal: 1200000, estado: EstadoLiquidacion.Pagado },
    { id: 2, empleadoId: 2, mes: 12, anio: 2024, sueldoBase: 1200000, impuestos: 240000, pagoTotal: 960000, estado: EstadoLiquidacion.Pendiente }
  ];

  getLiquidaciones() {
    return this.liquidaciones;
  }

  getByEmpleadoId(empleadoId: number) {
    return this.liquidaciones.filter(l => l.empleadoId === empleadoId);
  }
}
