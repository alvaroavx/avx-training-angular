import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'empleados', loadComponent: () => import('./pages/empleados/empleados.component').then(m => m.EmpleadosListComponent) },
  { path: 'empleados/:id', loadComponent: () => import('./pages/empleados/empleado-detail/empleado-detail.component').then(m => m.EmpleadoDetailComponent) },
  { path: 'contratos', loadComponent: () => import('./pages/contratos/contratos.component').then(m => m.ContratosComponent) },
  { path: 'asistencias', loadComponent: () => import('./pages/asistencias/asistencias.component').then(m => m.AsistenciasComponent) },
  { path: 'liquidaciones', loadComponent: () => import('./pages/liquidaciones/liquidaciones.component').then(m => m.LiquidacionesComponent) },
  { path: '**', redirectTo: '' }
];