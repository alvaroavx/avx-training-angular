import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Paciente, PacienteVIP } from '../models/paciente.model';

@Component({
  standalone: true,
  selector: 'app-paciente-listado',
  imports: [CommonModule],
  templateUrl: './paciente-listado.html',
  styleUrl: './paciente-listado.css'
})

export class PacienteListado implements OnInit {
  pacientes: Paciente[] = [
    new Paciente(1, 'Ana Pérez', new Date(1985,4,20)),
    new Paciente(1, "Ana Perez", new Date(1985, 4, 20), "Hipertension"),
    new PacienteVIP(2, "Luis Gomez", new Date(1970, 9, 5), "Critico"),
    new Paciente(3, "Carlos Ruiz", new Date(1992, 11, 1)),
    new PacienteVIP(4, "Marcela Diaz", new Date(1980, 0, 15), "Basico", "Diabetes"),
  ];
  ngOnInit(): void {
    // lógica al iniciar el componente
  }
}
