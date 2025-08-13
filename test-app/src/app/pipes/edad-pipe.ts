import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
  standalone: true // si no usas standalone, quítalo y declara el pipe en un módulo
})
export class EdadPipe implements PipeTransform {
  transform(
    value: Date | string | number,
    format: 'string' | 'object' = 'string',
    refDate: Date | string | number = new Date()
  ): string | { anios: number; dias: number } {
    const nacimiento = this.toDate(value);
    const referencia = this.toDate(refDate);
    if (!nacimiento || !referencia) {
      return format === 'object' ? { anios: 0, dias: 0 } : '';
    }

    // Normaliza a mediodía (evita problemas por cambio de hora/DST)
    this.setNoon(nacimiento);
    this.setNoon(referencia);

    // Años completos
    let anios = referencia.getFullYear() - nacimiento.getFullYear();
    const cumpleEsteAnio = this.safeDate(
      referencia.getFullYear(),
      nacimiento.getMonth(),
      nacimiento.getDate()
    );
    if (referencia < cumpleEsteAnio) anios--;

    // Último cumpleaños (maneja 29/feb)
    const yearUltimo = referencia < cumpleEsteAnio
      ? referencia.getFullYear() - 1
      : referencia.getFullYear();
    const ultimoCumple = this.safeDate(
      yearUltimo,
      nacimiento.getMonth(),
      nacimiento.getDate()
    );

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const dias = Math.floor((referencia.getTime() - ultimoCumple.getTime()) / MS_PER_DAY);

    return format === 'object'
      ? { anios, dias }
      : `${anios} años, ${dias} días`;
  }

  // Helpers
  private toDate(d: Date | string | number): Date | null {
    const date = d instanceof Date ? new Date(d) : new Date(d);
    return isNaN(date.getTime()) ? null : date;
  }

  private safeDate(y: number, m: number, d: number): Date {
    // Si 29/feb cae en año no bisiesto, usa 28/feb
    const candidate = new Date(y, m, d);
    if (candidate.getMonth() !== m) return new Date(y, m, 28);
    return candidate;
  }

  private setNoon(date: Date) {
    date.setHours(12, 0, 0, 0);
  }
}
