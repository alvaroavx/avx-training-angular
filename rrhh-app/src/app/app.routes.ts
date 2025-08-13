import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'empleados', loadComponent: () => import('./pages/empleados/empleados-list/empleados-list.component').then(m => m.EmpleadosListComponent) },
  { path: 'empleados/:id', loadComponent: () => import('./pages/empleados/empleado-detail/empleado-detail.component').then(m => m.EmpleadoDetailComponent) },
  { path: '**', redirectTo: '' }
];