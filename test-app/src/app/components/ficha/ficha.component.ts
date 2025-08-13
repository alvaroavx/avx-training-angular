import { Component, OnInit  }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; // importa routers

import { PacienteService }  from '../../services/paciente.service';
import { EstadoPaciente, PacienteModel } from '../../models/paciente.model';
import { HighlightCriticalOnlineDirective } from '../../directives/highlight-critical-online.directive';
import { EdadPipe } from '../../pipes/edad-pipe';

@Component({
  standalone: true,
  selector: 'app-ficha',
  imports: [CommonModule, 
    FormsModule, 
    HighlightCriticalOnlineDirective,
    EdadPipe],
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  constructor(
    private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pacientes = this.service.getPacientes();
  }

  public EstadoPaciente = EstadoPaciente;

  pacientes: PacienteModel[] = [];
  pacienteId: number | null = null; // <-- se inicializa desde la ruta

  get selected(): PacienteModel | null {
    return this.pacientes.find(p => p.id === this.pacienteId) ?? null;
  }

  // obtiene el id si es que viene
  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const idStr = pm.get('id');
      const id = idStr ? Number(idStr) : null;
      this.pacienteId = Number.isFinite(id) ? id : null;

      // (Opcional) Si viene un id que no existe, volver a /ficha
      if (this.pacienteId && !this.selected) {
        this.router.navigate(['/ficha']);
      }
    });
  }

  onChangeId(id: number | null) {
    this.pacienteId = id;
    this.router.navigate(id ? ['/ficha', id] : ['/ficha']);
  }

  favorito = false;
  toggleFavorito() {
    this.favorito = !this.favorito;
  }

  
}