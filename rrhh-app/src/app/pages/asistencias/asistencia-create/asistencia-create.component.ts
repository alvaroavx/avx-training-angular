import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AsistenciaService } from '../../../core/services/internal/asistencia.service';
import { EstadoAsistencia, AsistenciaModel } from '../../../core/models/asistencia';

@Component({
  standalone: true,
  selector: 'app-asistencia-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asistencia-create.component.html',
  styleUrls: ['./asistencia-create.component.css'],
})

export class AsistenciaCreateComponent {

  form!: FormGroup;
  EstadoAsistencia = EstadoAsistencia;

  constructor(
    private fb: FormBuilder, 
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      empleadoId: [null, Validators.required],
      fecha: [null, Validators.required],
      horaEntrada: [''],
      estado: [EstadoAsistencia.Presente, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const nuevaAsistencia = this.form.value;
    console.log('Asistencia enviada:', nuevaAsistencia);

    // Aquí podrías llamar a un método create() si lo agregas en el servicio
    alert('Asistencia registrada');
    this.form.reset({ estado: EstadoAsistencia.Presente });

    this.asistenciaService.create(nuevaAsistencia as AsistenciaModel);
  }
}
