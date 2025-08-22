import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Liquidacion } from '../../core/models/liquidacion';
import { LiquidacionService } from '../../core/services/internal/liquidacion.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-liquidaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiquidacionesComponent implements OnInit {

  liquidaciones$!: Observable<Liquidacion[]>;
  cargando = false;

  constructor(private liquidacionService: LiquidacionService) {}

  ngOnInit(): void {
    // Si tu servicio es síncrono:
    this.cargando = true;
    
    this.liquidaciones$ = this.liquidacionService.getLiquidaciones$().pipe(
      finalize(() => this.cargando = false)
    );

    // Si tu servicio retorna Observable, usa esto en lugar de lo anterior:
    // this.cargando = true;
    // this.liquidacionService.getLiquidaciones$().subscribe({
    //   next: (data) => this.liquidaciones = data,
    //   error: (e) => console.error(e),
    //   complete: () => this.cargando = false
    // });
  }

  // Recomendado para performance en *ngFor
  trackById(_: number, item: Liquidacion): number {
    return item.id;
  }

  // Handlers para los botones del template
  onCrear(): void {
    // TODO: navegar a formulario o abrir modal
    console.log('Crear nueva liquidación');
  }

  onVer(liq: Liquidacion): void {
    // TODO: navegar a /liquidaciones/:id o abrir detalle
    console.log('Ver liquidación', liq);
  }

  onEditar(liq: Liquidacion): void {
    // TODO: navegar a /liquidaciones/editar/:id
    console.log('Editar liquidación', liq);
  }

  /*onEliminar(liq: Liquidacion): void {
    // TODO: confirmar y llamar a servicio para eliminar
    const ok = confirm(`¿Eliminar la liquidación #${liq.id}?`);
    if (!ok) return;

    try {
      this.liquidacionService.delete(liq.id);
      this.liquidaciones = this.liquidaciones.filter(l => l.id !== liq.id);
      console.log('Eliminada', liq.id);
    } catch (e) {
      console.error('Error al eliminar', e);
      alert('No se pudo eliminar la liquidación.');
    }
  }*/
}
