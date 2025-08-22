import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ContratoCreateComponent } from './contrato-create/contrato-create.component';
import { ContratoService } from '../../core/services/internal/contrato.service';
import { Contrato } from '../../core/models/contrato';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [CommonModule, ContratoCreateComponent],
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent {

  contratos: Contrato[] = [];

  constructor(
    private contratoService: ContratoService
  ) {}

  ngOnInit() {
    this.contratos = this.contratoService.getContratos();
  }
}
