import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegionesService {
  constructor(
    private http: HttpClient
  ) {}
  getRegiones() { 
    return this.http.get<any[]>('https://apis.digital.gob.cl/dpa/regiones');
  }
}
