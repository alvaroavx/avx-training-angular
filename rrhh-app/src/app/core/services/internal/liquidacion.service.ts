import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LiquidacionModel, EstadoLiquidacion, Liquidacion } from '../../models/liquidacion';

@Injectable({ providedIn: 'root' })
export class LiquidacionService {
  private http = inject(HttpClient);

  // Toggle simple para comenzar a consumir API sin perder el mock
  private useApi = true;

  private readonly baseUrl = `${environment.apiUrl}/liquidaciones`;

  private liquidaciones: LiquidacionModel[] = [
    { id: 1, empleadoId: 1, mes: 12, anio: 2024, sueldoBase: 1500000, impuestos: 300000, pagoTotal: 1200000, estado: EstadoLiquidacion.Pagado },
    { id: 2, empleadoId: 2, mes: 12, anio: 2024, sueldoBase: 1200000, impuestos: 240000, pagoTotal: 960000, estado: EstadoLiquidacion.Pendiente }
  ];

  /** Listado completo */
  getLiquidaciones$(): Observable<Liquidacion[]> {
    if (!this.useApi) return of(this.liquidaciones);
    return this.http.get<Liquidacion[]>(this.baseUrl).pipe(
      catchError(this.handleError('getLiquidaciones'))
    );
  }

  /** Paginado/filtrado opcional */
  search$(params?: { empleadoId?: number; mes?: number; anio?: number; page?: number; size?: number }): Observable<Liquidacion[]> {
    if (!this.useApi) {
      let data = [...this.liquidaciones];
      if (params?.empleadoId != null) data = data.filter(l => l.empleadoId === params.empleadoId);
      if (params?.mes != null)        data = data.filter(l => l.mes === params.mes);
      if (params?.anio != null)       data = data.filter(l => l.anio === params.anio);
      return of(data);
    }

    let httpParams = new HttpParams();
    if (params?.empleadoId != null) httpParams = httpParams.set('empleadoId', params.empleadoId);
    if (params?.mes != null)        httpParams = httpParams.set('mes', params.mes);
    if (params?.anio != null)       httpParams = httpParams.set('anio', params.anio);
    if (params?.page != null)       httpParams = httpParams.set('page', params.page);
    if (params?.size != null)       httpParams = httpParams.set('size', params.size);

    return this.http.get<Liquidacion[]>(this.baseUrl, { params: httpParams }).pipe(
      catchError(this.handleError('search'))
    );
  }

  /** Por ID */
  getById$(id: number): Observable<Liquidacion> {
    if (!this.useApi) {
      const found = this.liquidaciones.find(l => l.id === id);
      return found ? of(found) : throwError(() => new Error('No existe'));
    }
    return this.http.get<Liquidacion>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError('getById'))
    );
  }

  /** Por empleado */
  getByEmpleadoId$(empleadoId: number): Observable<Liquidacion[]> {
    if (!this.useApi) return of(this.liquidaciones.filter(l => l.empleadoId === empleadoId));
    return this.http.get<Liquidacion[]>(`${this.baseUrl}`, { params: { empleadoId } as any }).pipe(
      catchError(this.handleError('getByEmpleadoId'))
    );
  }

  /** Crear */
  create$(payload: Omit<Liquidacion, 'id'>): Observable<Liquidacion> {
    if (!this.useApi) {
      const nuevoId = this.liquidaciones.length ? Math.max(...this.liquidaciones.map(e => e.id)) + 1 : 1;
      const nueva = { id: nuevoId, ...payload } as LiquidacionModel;
      this.liquidaciones.push(nueva);
      return of(nueva);
    }
    return this.http.post<Liquidacion>(this.baseUrl, payload).pipe(
      catchError(this.handleError('create'))
    );
  }

  /** Actualizar */
  update$(id: number, payload: Partial<Liquidacion>): Observable<Liquidacion> {
    if (!this.useApi) {
      const idx = this.liquidaciones.findIndex(l => l.id === id);
      if (idx === -1) return throwError(() => new Error('No existe'));
      this.liquidaciones[idx] = { ...this.liquidaciones[idx], ...payload };
      return of(this.liquidaciones[idx]);
    }
    return this.http.put<Liquidacion>(`${this.baseUrl}/${id}`, payload).pipe(
      catchError(this.handleError('update'))
    );
  }

  /** Eliminar */
  delete$(id: number): Observable<void> {
    if (!this.useApi) {
      this.liquidaciones = this.liquidaciones.filter(l => l.id !== id);
      return of(void 0);
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError('delete'))
    );
  }

  // --- Helpers ---
  private handleError(ctx: string) {
    return (err: any) => {
      console.error(`[LiquidacionService] ${ctx} error`, err);
      return throwError(() => err);
    };
  }
}
