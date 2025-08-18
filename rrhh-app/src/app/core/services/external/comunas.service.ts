import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ComunasService {
  constructor(
    private http: HttpClient
  ) {}
  getComunas() { 
    return this.http.get<any[]>('https://apis.digital.gob.cl/dpa/comunas');
  }
}
