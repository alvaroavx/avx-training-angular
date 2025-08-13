import { Routes } from '@angular/router';

export const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },

  // ejemplo simple cargando componentes standalone
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)},
  { path: 'pacientes', loadComponent: () => import('./components/paciente/paciente.component').then(m => m.PacienteComponent)},
  { path: 'ficha', loadComponent: () => import('./components/ficha/ficha.component').then(m => m.FichaComponent)},
  { path: 'ficha/:id', loadComponent: () => import('./components/ficha/ficha.component').then(m => m.FichaComponent) },

  // comodín 404
  { path: '**', redirectTo: '' }
];
