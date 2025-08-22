import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContratoService } from '../../../core/services/internal/contrato.service';
import { TipoContrato, ContratoModel } from '../../../core/models/contrato';

@Component({
  selector: 'app-contrato-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contrato-create.component.html',
  styleUrls: ['./contrato-create.component.css']
})
export class ContratoCreateComponent {
  // Enumeración usada para llenar el select de tipo
  tiposContrato = Object.values(TipoContrato);

  // Modelo vinculado al formulario
  contrato = {
    empleadoId: 1, // puede venir como @Input o como ruta
    fechaInicio: '',
    fechaFin: '',
    cargo: '',
    salario: 0,
    tipo: this.tiposContrato[0],
    documentoPdf: ''
  };

  constructor(private contratoService: ContratoService) {}

  onSubmit() {
    if (!this.contrato.cargo || !this.contrato.salario || !this.contrato.fechaInicio) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const nuevoContrato = new ContratoModel(
      Date.now(), // id ficticio
      this.contrato.empleadoId,
      new Date(this.contrato.fechaInicio),
      this.contrato.cargo,
      this.contrato.salario,
      this.contrato.tipo as TipoContrato,
      this.contrato.documentoPdf || undefined,
      this.contrato.fechaFin ? new Date(this.contrato.fechaFin) : undefined
    );

    this.contratoService.getContratos().push(nuevoContrato);
    alert('Contrato agregado correctamente');
  }
}
