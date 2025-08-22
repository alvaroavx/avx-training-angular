import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith, shareReplay } from 'rxjs';
import { EmpleadoService } from '../../core/services/internal/empleado.service';
import { Empleado } from '../../core/models/empleado';
import { EmpleadoCreateComponent } from '../empleados/empleado-create/empleado-create.component';

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, EmpleadoCreateComponent],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosListComponent implements OnInit {
  // Data base
  empleados$!: Observable<Empleado[]>;

  // Filtro reactivo
  filtroCtrl = new FormControl<string>('', { nonNullable: true });

  // Lista filtrada
  empleadosFiltrados$!: Observable<Empleado[]>;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleados$ = this.empleadoService.getEmpleados$().pipe(shareReplay(1));

    this.empleadosFiltrados$ = combineLatest([
      this.empleados$,
      this.filtroCtrl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([list, q]) => {
        const query = q.toLowerCase().trim();
        if (!query) return list;
        return list.filter(e =>
          (e.nombre ?? '').toLowerCase().includes(query) ||
          (e.cargo ?? '').toLowerCase().includes(query)
        );
      })
    );
  }

  trackById(_: number, item: Empleado): number {
    return item.id;
  }
}
