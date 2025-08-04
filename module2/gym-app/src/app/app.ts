/*import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gym-app');
}
*/
// src/app/app.ts
import { Component, signal }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { PacienteListado } from './paciente-listado/paciente-listado';

@Component({
  selector: 'app-root',
  standalone: true,                  // ← lo convertimos en standalone
  imports: [                         
    CommonModule,                    // ← para *ngFor, *ngIf, etc.
    PacienteListado        // ← tu componente de lista
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']           // ← ojo: debe ser "styleUrls"
})
export class App {
  protected readonly title = signal('gym-app');
}
