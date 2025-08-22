import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ComunasService } from '../../core/services/external/comunas.service';
import { RegionesService } from '../../core/services/external/regiones.service';
import { IndicadoresService } from '../../core/services/external/indicadores.service';
import { ContratosComponent } from '../contratos/contratos.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  constructor(
    private comunasService: ComunasService,
    private regionesService: RegionesService,
    private indicadoresService: IndicadoresService
  ) {}

  comunas: any[] = [];
  regiones: any[] = [];
  ufHoy: number | null = null;
  dolarHoy: number | null = null;

  cards = [
    { titulo: 'Empleados activos', valor: 12 },
    { titulo: 'Contratos vigentes', valor: 11 },
    { titulo: 'Liq. pendientes', valor: 3 },
    { titulo: 'Asistencias hoy', valor: 10 },
  ];

  ngOnInit() {
    this.comunasService.getComunas().subscribe(comunas => {
      this.comunas = comunas;
    });
    this.regionesService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    });
    this.indicadoresService.obtenerUF().subscribe(value => this.ufHoy = value);
    this.indicadoresService.obtenerDolar().subscribe(value => this.dolarHoy = value);
  }
}
