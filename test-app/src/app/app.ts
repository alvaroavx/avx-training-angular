// src/app/app.ts
import { Component, signal }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { PacienteComponent }      from './components/paciente/paciente.component';
import { FichaComponent }         from './components/ficha/ficha.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PacienteComponent,
    FichaComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('test-app');
}
