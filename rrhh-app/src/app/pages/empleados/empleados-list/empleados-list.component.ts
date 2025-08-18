import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../core/services/internal/empleado.service';
import { Empleado } from '../../../core/models/empleado';
import { EmpleadoCreateComponent } from '../empleado-create/empleado-create.component';

@Component({
  selector: 'app-empleados-list',
  imports: [CommonModule, RouterLink, FormsModule, EmpleadoCreateComponent],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css'
})

export class EmpleadosListComponent {
  public filtro = '';
  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.empleados = this.empleadoService.getEmpleados();
  }
}
