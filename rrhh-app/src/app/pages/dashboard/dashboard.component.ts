import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  cards = [
    { titulo: 'Empleados activos', valor: 12 },
    { titulo: 'Contratos vigentes', valor: 11 },
    { titulo: 'Liq. pendientes', valor: 3 },
    { titulo: 'Asistencias hoy', valor: 10 },
  ];
}
