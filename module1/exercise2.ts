// ===============================
// Ejercicio 2: Ficha de un paciente usando interfaces, clases y herencias
// ===============================

// 1. Interface
interface FichaPaciente {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  diagnostico?: string; // opcional
}

// 2. Clase base
class Paciente implements FichaPaciente {
  constructor(
    public id: number,
    public nombre: string,
    public fechaNacimiento: Date,
    public diagnostico?: string
  ) {}

  getEdad(): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}

// 3. Subclase con herencia
class PacienteVIP extends Paciente {
  constructor(
    id: number,
    nombre: string,
    fechaNacimiento: Date,
    public nivelAtencion: "Basico" | "Urgente" | "Critico",
    diagnostico?: string
  ) {
    super(id, nombre, fechaNacimiento, diagnostico);
  }

  getEtiqueta(): string {
    return `Paciente ${this.nombre} (${this.nivelAtencion})`;
  }
}

// 4. Prueba rápida
const p1 = new Paciente(1, "Ana Perez", new Date(1985, 4, 20), "Hipertension");
const vip1 = new PacienteVIP(2, "Luis Gomez", new Date(1970, 9, 5), "Critico");
const p2 = new Paciente(3, "Carlos Ruiz", new Date(1992, 11, 1));
const vip2 = new PacienteVIP(4, "Marcela Diaz", new Date(1980, 0, 15), "Basico", "Diabetes");

console.log(`1) Edad de ${p1.nombre}:`, p1.getEdad());
console.log(`2) ${vip1.getEtiqueta()}  Edad:`, vip1.getEdad());
console.log(`3) Edad de ${p2.nombre}:`, p2.getEdad());
console.log(`4) ${vip2.getEtiqueta()}  Edad:`, vip2.getEdad());

// ===============================================
// Ejemplo 2: Animal / Perro (Mascotas)
// ===============================================

// 1. Interface
interface Animal {
  nombre: string;
  especie: string;
  sonido(): string;
}

// 2. Clase base
class Mascota implements Animal {
  constructor(
    public nombre: string,
    public especie: string
  ) {}

  sonido(): string {
    return "—";
  }
}

// 3. Subclase con herencia
class Perro extends Mascota {
  constructor(nombre: string, public raza: string) {
    super(nombre, "Canino");
  }

  sonido(): string {
    return "Guau!";
  }

  getDescripcion(): string {
    return `${this.nombre} es un ${this.raza} (${this.especie}) y dice ${this.sonido()}`;
  }
}

// 4. Prueba rápida
const perro1 = new Perro("Max", "Labrador");
const perro2 = new Perro("Luna", "Bulldog");
const perro3 = new Perro("Rocky", "Beagle");
const perro4 = new Perro("Bella", "Poodle");

console.log("1)", perro1.getDescripcion());
console.log("2)", perro2.getDescripcion());
console.log("3)", perro3.getDescripcion());
console.log("4)", perro4.getDescripcion());