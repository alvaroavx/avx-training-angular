import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, map, startWith, combineLatest } from 'rxjs';
import { EmpleadoService } from '../../core/services/internal/empleado.service';
import { Empleado } from '../../core/models/empleado';

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadosListComponent implements OnInit {
  public filtro = '';
  empleados$!: Observable<Empleado[]>;
  // Opcional: filtro reactivo
  empleadosFiltrados$!: Observable<Empleado[]>;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleados$ = this.empleadoService.getEmpleados$();

    // Si quieres filtrar por nombre/cargo con el input "filtro":
    // (para hacerlo reactivo habría que convertir el filtro a observable; aquí lo dejo simple)
    this.empleadosFiltrados$ = this.empleados$.pipe(
      map(list => {
        const q = (this.filtro || '').toLowerCase().trim();
        if (!q) return list;
        return list.filter(e =>
          e.nombre.toLowerCase().includes(q) ||
          e.cargo.toLowerCase().includes(q)
        );
      })
    );
  }

  // Si quieres que el filtro sea "en vivo", podemos migrar `filtro` a un FormControl y recombinar.
}
