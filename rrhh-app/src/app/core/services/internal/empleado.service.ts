import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, of, catchError } from 'rxjs';
import { Empleado, EstadoEmpleado } from '../../models/empleado';
import { environment } from '../../../../environment/environment';

// Tipo según respuesta real del endpoint /funcionarios
export interface FuncionarioApi {
  COD_FUNCIONARIO: number;
  RUT_FUNCIONARIO: number;
  DV_FUNCIONARIO: string;
  NOM_FUNCIONARIO: string;
  APE_FUNCIONARIO: string;
  FEC_NACIMI: string;   // ISO
  TIP_SEXO: string;
  EST_CIVIL: string;
  NOM_NACIONALIDAD: string;
  NOM_EMAIL: string;
  NUM_TELEFONO: string;
  NOM_DIRECCION: string;
  NOM_COMUNA: string;
  NOM_CIUDAD: string;
  NOM_REGION: string;
  FEC_AUDITA: string;   // ISO
  IND_ESTADO: string;   // 'V' (vigente), otros posibles
  COD_USUARIO: string;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/funcionarios`;

  /**
   * Adapter: FuncionarioApi -> Empleado
   * - id: COD_FUNCIONARIO
   * - nombre: NOM_FUNCIONARIO + APE_FUNCIONARIO
   * - cargo: (no viene en API) => lo dejamos como '—' o el que definas
   * - estado: mapeo de IND_ESTADO
   */
  private toEmpleado = (f: FuncionarioApi): Empleado => {
    const nombre = `${(f.NOM_FUNCIONARIO ?? '').trim()} ${(f.APE_FUNCIONARIO ?? '').trim()}`.trim();

    // Mapeo Estado: asumo 'V' = Activo; si tu API usa otras letras, ajusta aquí.
    const estado: EstadoEmpleado =
      f.IND_ESTADO === 'V' ? EstadoEmpleado.Activo
      // Si distingues licencia / egreso en el API, agrega más casos:
      // : f.IND_ESTADO === 'L' ? EstadoEmpleado.Licencia
      : EstadoEmpleado.Egreso;

    return {
      id: f.COD_FUNCIONARIO,
      nombre: nombre || `Funcionario #${f.COD_FUNCIONARIO}`,
      cargo: '—',          // <-- La API no trae cargo; puedes sustituir por otro valor
      estado
    };
  };

  /** Listado completo desde API */
  getEmpleados$(): Observable<Empleado[]> {
    return this.http.get<FuncionarioApi[]>(this.baseUrl).pipe(
      map(rows => rows.map(this.toEmpleado)),
      catchError(err => {
        console.error('[EmpleadoService] getEmpleados error', err);
        return throwError(() => err);
      })
    );
  }

  /** Detalle por ID (si tu API soporta /funcionarios/:id úsalo; si no, filtramos client-side) */
  getById$(id: number): Observable<Empleado> {
    // Opción A (endpoint RESTful):
    // return this.http.get<FuncionarioApi>(`${this.baseUrl}/${id}`).pipe(
    //   map(this.toEmpleado),
    //   catchError(err => {
    //     console.error('[EmpleadoService] getById error', err);
    //     return throwError(() => err);
    //   })
    // );

    // Opción B (no hay endpoint detalle -> trae todos y filtra)
    return this.getEmpleados$().pipe(
      map(list => {
        const found = list.find(e => e.id === id);
        if (!found) throw new Error('Empleado no encontrado');
        return found;
      }),
      catchError(err => {
        console.error('[EmpleadoService] getById (fallback) error', err);
        return throwError(() => err);
      })
    );
  }

  // --- Opcional: mock local para crear mientras no exista POST en API ---
  private _mock: Empleado[] = [];
  createLocal(empleado: Omit<Empleado, 'id'>) {
    const nuevoId =
      this._mock.length ? Math.max(...this._mock.map(e => e.id)) + 1 : 1;
    const nuevo = { id: nuevoId, ...empleado };
    this._mock.push(nuevo);
    return of(true);
  }
}
