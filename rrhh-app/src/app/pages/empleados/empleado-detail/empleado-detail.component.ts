import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { Empleado, EmpleadoModel } from '../../../core/models/empleado';
import { ContratoService } from '../../../core/services/contrato.service';
import { Contrato, ContratoModel } from '../../../core/models/contrato';
import { AsistenciaService } from '../../../core/services/asistencia.service';
import { Asistencia, AsistenciaModel } from '../../../core/models/asistencia';
import {LiquidacionService } from '../../../core/services/liquidacion.service';
import { Liquidacion, LiquidacionModel } from '../../../core/models/liquidacion';

@Component({
  selector: 'app-empleado-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './empleado-detail.component.html',
  styleUrl: './empleado-detail.component.css'
})

export class EmpleadoDetailComponent implements OnInit {

  public id: number = 0;
  public empleado: Empleado | null = null;
  public contratos: Contrato[] = [];
  public liquidaciones: Liquidacion[] = [];
  public asistencias: Asistencia[] = [];

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private contratoService: ContratoService,
    private liquidacionService: LiquidacionService,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.empleado = this.empleadoService.getById(this.id);

    if (this.empleado) {
      this.contratos = this.contratoService.getByEmpleadoId(this.id);
      this.liquidaciones = this.liquidacionService.getByEmpleadoId(this.id);
      this.asistencias = this.asistenciaService.getByEmpleadoId(this.id);
    }
  }
}
