import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  Observable, of, Subject, combineLatest,
  map, filter, distinctUntilChanged, switchMap, startWith, shareReplay, catchError
} from 'rxjs';

import { EmpleadoService } from '../../../core/services/internal/empleado.service';
import { Empleado } from '../../../core/models/empleado';

import { ContratoService } from '../../../core/services/internal/contrato.service';
import { Contrato } from '../../../core/models/contrato';

import { AsistenciaService } from '../../../core/services/internal/asistencia.service';
import { Asistencia, EstadoAsistencia, AsistenciaModel } from '../../../core/models/asistencia';

import { LiquidacionService } from '../../../core/services/internal/liquidacion.service';
import { Liquidacion } from '../../../core/models/liquidacion';

@Component({
  selector: 'app-empleado-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoDetailComponent {
  // Exponer enum al template
  public EstadoAsistencia = EstadoAsistencia;

  // --- Inyección con `inject()` (evita TS2729) ---
  private readonly route = inject(ActivatedRoute);
  private readonly empleadoService = inject(EmpleadoService);
  private readonly contratoService = inject(ContratoService);
  private readonly liquidacionService = inject(LiquidacionService);
  private readonly asistenciaService = inject(AsistenciaService);
  private readonly fb = inject(FormBuilder);

  // Formulario de nueva asistencia
  formAsistencia: FormGroup = this.fb.group({
    fecha: [null, Validators.required],
    horaEntrada: [''],
    estado: [EstadoAsistencia.Presente, Validators.required]
  });

  // Trigger para recargar asistencias luego de crear una nueva
  private readonly refrescarAsistencias$ = new Subject<void>();

  // ID desde la ruta
  readonly id$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    filter(id => !Number.isNaN(id)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  // Streams de datos
  readonly empleado$: Observable<Empleado | null> = this.id$.pipe(
    switchMap(id => this.empleadoService.getById$(id).pipe(
      catchError(() => of(null)) // si no existe el empleado
    ))
  );

  readonly contratos$: Observable<Contrato[]> = this.id$.pipe(
    // Servicio síncrono en tu código original: lo envolvemos en map/of
    map(id => this.contratoService.getByEmpleadoId(id)),
    shareReplay(1)
  );

  readonly liquidaciones$: Observable<Liquidacion[]> = this.id$.pipe(
    // Este servicio, según tu comentario, expone un método observable getByEmpleadoId$
    switchMap(id => this.liquidacionService.getByEmpleadoId$(id).pipe(
      catchError(() => of<Liquidacion[]>([]))
    )),
    shareReplay(1)
  );

  readonly asistencias$: Observable<Asistencia[]> = this.id$.pipe(
    switchMap(id =>
      this.refrescarAsistencias$.pipe(
        startWith(void 0), // primera carga
        map(() => this.asistenciaService.getByEmpleadoId(id)) // servicio síncrono
      )
    ),
    shareReplay(1)
  );

  // ViewModel combinado para simplificar el template
  readonly vm$ = combineLatest({
    id: this.id$,
    empleado: this.empleado$,
    contratos: this.contratos$,
    liquidaciones: this.liquidaciones$,
    asistencias: this.asistencias$
  }).pipe(shareReplay(1));

  registrarAsistencia(vm: { id: number; empleado: Empleado | null }) {
    if (this.formAsistencia.invalid || !vm.empleado) return;

    const nueva = new AsistenciaModel(
      Date.now(), // ID local; reemplaza por el del backend si aplica
      vm.empleado.id,
      this.formAsistencia.value.fecha!,
      this.formAsistencia.value.estado!,
      this.formAsistencia.value.horaEntrada || undefined
    );

    // Si create() fuera async (Observable/Promise), espera y luego refresca
    this.asistenciaService.create(nueva);
    this.formAsistencia.reset({ estado: EstadoAsistencia.Presente, fecha: null, horaEntrada: '' });

    // Recargar lista (OnPush + async se actualiza solo)
    this.refrescarAsistencias$.next();
  }
}
