// persona.model.spec.ts
// Ajusta la ruta según tu estructura:
import {
  PersonaModel,
  EstadoEmpleado,
  TipoContrato,
  Jornada,
  ModalidadTrabajo,
  Moneda,
  Direccion,
  ContactoEmergencia,
} from './persona.model';

describe('PersonaModel', () => {
  // Fijamos "hoy" para que las pruebas sean deterministas.
  // Usaremos 13 de agosto de 2025 (mes 7, porque Date usa 0-index).
  const MOCK_TODAY = new Date(2025, 7, 13);

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(MOCK_TODAY);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  function buildPersona(overrides: Partial<PersonaModel> = {}) {
    const dir: Direccion = {
      calle: 'Av. Siempre Viva',
      numero: '742',
      comuna: 'San Felipe',
      ciudad: 'San Felipe',
      region: 'Valparaíso',
      pais: 'Chile',
    };

    const ce: ContactoEmergencia = {
      nombre: 'María Pérez',
      parentesco: 'Madre',
      telefono: '+56 9 1111 2222',
    };

    // Fecha de nacimiento: 14/08/1990 → un día después del MOCK_TODAY, así edad = 34.
    const persona = new PersonaModel(
      1,                          // id
      '12345678K',                // rut (sin formato, lo formatea el método)
      'Nicolás',                  // nombres
      'Vargas',                   // apellidos
      'nicolas@empresa.cl',       // email laboral
      'nico.personal@mail.com',   // email personal
      '+56 9 9999 0000',          // móvil
      undefined,                  // fijo
      dir,                        // dirección
      new Date(1990, 7, 14),      // fechaNacimiento (14-08-1990)
      'LEG-0001',                 // legajo
      'Desarrollador',            // cargo
      'TI',                       // departamento
      99,                         // supervisorId
      new Date(2020, 0, 10),      // fechaIngreso (10-01-2020)
      undefined,                  // fechaEgreso
      TipoContrato.Indefinido,    // tipoContrato
      Jornada.Completa,           // jornada
      ModalidadTrabajo.Hibrido,   // modalidad
      1_000_000,                  // sueldoBase
      Moneda.CLP,                 // moneda
      EstadoEmpleado.Activo,      // estado
      ['Salud', 'Colación'],      // beneficios
      ['Angular', 'TS', 'RRHH'],  // skills
      [{ nombre: 'Scrum Master' }], // certificaciones
      ce,                         // contacto emergencias
      15,                         // vacaciones acumuladas
      5                           // vacaciones tomadas
    );

    // Aplica overrides si se requieren para algún test puntual
    Object.assign(persona, overrides);
    return persona;
  }

  it('should create an instance', () => {
    const p = buildPersona();
    expect(p).toBeTruthy();
  });

  it('getNombreCompleto debe concatenar nombres y apellidos', () => {
    const p = buildPersona({ nombres: 'Ana María', apellidos: 'Pérez Soto' });
    expect(p.getNombreCompleto()).toBe('Ana María Pérez Soto');
  });

  it('getIniciales debe devolver las iniciales en mayúsculas', () => {
    const p = buildPersona({ nombres: 'ana', apellidos: 'perez' });
    expect(p.getIniciales()).toBe('AP');
  });

  it('getEdad debe calcular la edad respecto de la fecha mockeada', () => {
    const p = buildPersona(); // 14-08-1990, hoy 13-08-2025 → 34
    expect(p.getEdad()).toBe(34);
  });

  it('getDiasHastaCumple debe devolver días correctos al próximo cumpleaños', () => {
    const p = buildPersona(); // Cumple 14-08, hoy 13-08-2025 → 1 día
    expect(p.getDiasHastaCumple()).toBe(1);
  });

  it('getAntiguedad debe retornar años y meses desde fechaIngreso', () => {
    const p = buildPersona({
      fechaIngreso: new Date(2020, 0, 10) // 10-01-2020 → al 13-08-2025: 5 años, 7 meses
    });
    const ant = p.getAntiguedad();
    expect(ant.anios).toBe(5);
    expect(ant.meses).toBe(7);
  });

  it('getSueldoAnual debe ser 12 * sueldoBase', () => {
    const p = buildPersona({ sueldoBase: 800_000 });
    expect(p.getSueldoAnual()).toBe(9_600_000);
  });

  it('getVacacionesDisponibles debe descontar tomados de acumulados (no negativo)', () => {
    const p = buildPersona({ vacacionesDiasAcumulados: 10, vacacionesDiasTomados: 7 });
    expect(p.getVacacionesDisponibles()).toBe(3);
    const q = buildPersona({ vacacionesDiasAcumulados: 5, vacacionesDiasTomados: 10 });
    expect(q.getVacacionesDisponibles()).toBe(0);
  });

  it('tomarVacaciones debe incrementar tomados sin pasar el máximo disponible', () => {
    const p = buildPersona({ vacacionesDiasAcumulados: 15, vacacionesDiasTomados: 5 });
    expect(p.getVacacionesDisponibles()).toBe(10);
    p.tomarVacaciones(7);
    expect(p.vacacionesDiasTomados).toBe(12);
    expect(p.getVacacionesDisponibles()).toBe(3);
    // Intentar tomar más de lo disponible
    p.tomarVacaciones(10);
    expect(p.vacacionesDiasTomados).toBe(15); // solo pudo usar 3 adicionales
    expect(p.getVacacionesDisponibles()).toBe(0);
  });

  it('contratoVigente debe ser true si no hay fechaEgreso o es futura', () => {
    const p1 = buildPersona({ fechaEgreso: undefined }); // vigente
    const p2 = buildPersona({ fechaEgreso: new Date(2026, 0, 1) }); // futura
    const p3 = buildPersona({ fechaEgreso: new Date(2025, 6, 1) }); // pasada (julio 2025)
    expect(p1.contratoVigente()).toBeTrue();
    expect(p2.contratoVigente()).toBeTrue();
    expect(p3.contratoVigente()).toBeFalse();
  });

  it('estaOperativo debe ser true solo si Activo y contrato vigente', () => {
    const p = buildPersona({ estado: EstadoEmpleado.Activo, fechaEgreso: undefined });
    expect(p.estaOperativo()).toBeTrue();

    const suspendido = buildPersona({ estado: EstadoEmpleado.Suspendido, fechaEgreso: undefined });
    expect(suspendido.estaOperativo()).toBeFalse();

    const egresado = buildPersona({ estado: EstadoEmpleado.Activo, fechaEgreso: new Date(2025, 6, 1) });
    expect(egresado.estaOperativo()).toBeFalse();
  });

  it('formatRut debe formatear a XX.XXX.XXX-Y si recibe dígitos y dv', () => {
    const p = buildPersona({ rut: '12345678K' });
    expect(p.formatRut()).toBe('12.345.678-K');
  });

  it('getResumenRRHH debe contener nombre, cargo, departamento, ingreso y estado', () => {
    const p = buildPersona({
      nombres: 'Nicolás',
      apellidos: 'Vargas',
      cargo: 'Desarrollador',
      departamento: 'TI',
      estado: EstadoEmpleado.Activo,
      sueldoBase: 1_000_000,
      moneda: Moneda.CLP,
      fechaIngreso: new Date(2020, 0, 10),
    });
    const resumen = p.getResumenRRHH();
    expect(resumen).toContain('Nicolás Vargas');
    expect(resumen).toContain('Desarrollador');
    expect(resumen).toContain('TI');
    expect(resumen).toContain('Ingreso: 10-08-2020'); // Ojo: toLocaleDateString() depende de locale
    expect(resumen).toContain('Estado: Activo');
    expect(resumen).toContain('CLP 1,000,000'); // también puede variar por locale
  });
});
