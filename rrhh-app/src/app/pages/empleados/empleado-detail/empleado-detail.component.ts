import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../core/services/internal/empleado.service';
import { Empleado } from '../../../core/models/empleado';
import { ContratoService } from '../../../core/services/internal/contrato.service';
import { Contrato } from '../../../core/models/contrato';
import { AsistenciaService } from '../../../core/services/internal/asistencia.service';
import { Asistencia, EstadoAsistencia, AsistenciaModel } from '../../../core/models/asistencia';
import { LiquidacionService } from '../../../core/services/internal/liquidacion.service';
import { Liquidacion } from '../../../core/models/liquidacion';
import { AsistenciaCreateComponent } from '../../asistencias/asistencia-create/asistencia-create.component';

@Component({
  selector: 'app-empleado-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './empleado-detail.component.html',
  styleUrl: './empleado-detail.component.css'
})

export class EmpleadoDetailComponent implements OnInit {

  public id: number = 0;
  public empleado: Empleado | null = null;
  public contratos: Contrato[] = [];
  public liquidaciones: Liquidacion[] = [];
  public asistencias: Asistencia[] = [];
  public EstadoAsistencia = EstadoAsistencia;
  formAsistencia!: FormGroup;
  cargando = false;


  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private contratoService: ContratoService,
    private liquidacionService: LiquidacionService,
    private asistenciaService: AsistenciaService,
    private fb: FormBuilder, 
  ) {}

  registrarAsistencia() {
    if (this.formAsistencia.invalid || !this.empleado) return;

    const nueva = new AsistenciaModel(
      this.asistencias.length + 1,
      this.empleado.id,
      this.formAsistencia.value.fecha!,
      this.formAsistencia.value.estado!,
      this.formAsistencia.value.horaEntrada || undefined
    );

    this.asistenciaService.create(nueva); // Necesitas crear este método si no lo tienes
    this.asistencias.push(nueva);
    this.formAsistencia.reset({ estado: EstadoAsistencia.Presente });
  }

  ngOnInit(): void {
    this.formAsistencia = this.fb.group({
      fecha: [null, Validators.required],
      horaEntrada: [''],
      estado: [EstadoAsistencia.Presente, Validators.required]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.empleado = this.empleadoService.getById(this.id);

    if (this.empleado) {
      this.contratos = this.contratoService.getByEmpleadoId(this.id);
      //this.liquidaciones = this.liquidacionService.getByEmpleadoId$(this.id);
      this.asistencias = this.asistenciaService.getByEmpleadoId(this.id);
    }
  }
}


