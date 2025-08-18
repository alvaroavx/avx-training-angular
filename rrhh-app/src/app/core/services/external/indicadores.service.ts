import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface MindicadorResponse {
  uf: { version: string; codigo: string; nombre: string; unidad_medida: string; fecha: string; valor: number };
  dolar: { version: string; codigo: string; nombre: string; unidad_medida: string; fecha: string; valor: number };
}

@Injectable({
  providedIn: 'root'
})

export class IndicadoresService {
  constructor(private http: HttpClient) {}

  obtenerUF(): Observable<number> {
    return this.http.get<MindicadorResponse>('https://mindicador.cl/api').pipe(
      map(res => res.uf.valor)
    );
  }
  obtenerDolar(): Observable<number> {
    return this.http.get<MindicadorResponse>('https://mindicador.cl/api').pipe(
      map(res => res.dolar.valor)
    );
  }
}
