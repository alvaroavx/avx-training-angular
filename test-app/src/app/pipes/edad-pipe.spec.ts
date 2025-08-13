import { EdadPipe } from './edad-pipe';

describe('EdadPipe', () => {
  let pipe: EdadPipe;

  beforeEach(() => {
    pipe = new EdadPipe();
  });

  it('debe calcular correctamente la edad en años y días (caso bueno)', () => {
    // Ejemplo: nacimiento 1 enero 2000, referencia 15 enero 2025
    const nacimiento = new Date(2000, 0, 1);
    const referencia = new Date(2025, 0, 15);

    const resultado = pipe.transform(nacimiento, 'object', referencia);

    expect(resultado).toEqual({ anios: 25, dias: 14 });
  });

  it('debe manejar valores no válidos devolviendo vacío o ceros (caso malo)', () => {
    const resultadoString = pipe.transform('fecha-invalida', 'string');
    expect(resultadoString).toBe('');

    const resultadoObj = pipe.transform('fecha-invalida', 'object');
    expect(resultadoObj).toEqual({ anios: 0, dias: 0 });
  });
});
