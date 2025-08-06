import { Component, AfterViewInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EstadoPaciente, PacienteModel } from '../../models/paciente.model';
//import { HighlightCriticalDirective } from '../directives/highlight-critical.directive';
import { HighlightCriticalOnlineDirective } from '../../directives/highlight-critical-online.directive';
import { PacienteService }  from '../../services/paciente.service';

declare var $: any;

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, HighlightCriticalOnlineDirective],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements AfterViewInit  {
  // Exponer enum al template
  public EstadoPaciente = EstadoPaciente;
  public pacientes: PacienteModel[];

  visitados = new Set<number>();
  toggleVisitado(p: PacienteModel) {
    if(this.visitados.has(p.id)) {
      this.visitados.delete(p.id);
    } else {
      this.visitados.add(p.id);
    }
  }
  isVisitado(p: PacienteModel): boolean {
    return this.visitados.has(p.id)
  }

  ngAfterViewInit(): void {
    /*$('#pacientesTable').DataTable({
      paging:   true,
      searching:true,
      ordering: true
    });*/
  }

  constructor(private service: PacienteService) {
    this.pacientes = this.service.getPacientes();
  }
}

