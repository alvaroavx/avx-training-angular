import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';               // ← importa FormsModule
import { PacienteService }  from '../../services/paciente.service';
import { EstadoPaciente, PacienteModel } from '../../models/paciente.model';
import { HighlightCriticalOnlineDirective } from '../../directives/highlight-critical-online.directive';

@Component({
  standalone: true,
  selector: 'app-ficha',
  imports: [CommonModule, FormsModule, HighlightCriticalOnlineDirective],
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent {
  public EstadoPaciente = EstadoPaciente;

  pacientes: PacienteModel[];
  pacienteSeleccionado!: PacienteModel;  // la variable para ngModel

  favorito = false;
  toggleFavorito() {
    this.favorito = !this.favorito;
  }

  constructor(private service: PacienteService) {
    this.pacientes = this.service.getPacientes();
  }
}