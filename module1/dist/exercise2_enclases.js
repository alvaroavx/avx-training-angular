"use strict";
// ===============================
// Ejercicio 2: Ficha de un paciente usando interfaces, clases y herencias
// ===============================
// 2. Clase base
class Paciente2 {
    constructor(id, nombre, apellido, fechaNacimiento, diagnostico) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.diagnostico = diagnostico;
    }
    getEdad() {
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
class PacienteVIP2 extends Paciente2 {
    constructor(id, nombre, apellido, fechaNacimiento, nivelAtencion, diagnostico) {
        super(id, nombre, apellido, fechaNacimiento, diagnostico);
        this.nivelAtencion = nivelAtencion;
    }
    getEtiqueta() {
        return `Paciente ${this.nombre} ${this.apellido} nacido en ${this.fechaNacimiento}: (${this.nivelAtencion})`;
    }
}
// 4. Prueba rápida
// Instanciacion de clases
const p1_ = new Paciente2(1, "Ana", "Perez", new Date(1985, 4, 20), "Hipertension");
const p2_ = new Paciente2(3, "Carlos", "Ruiz", new Date(1992, 11, 1));
console.log(`1) Edad de ${p1_.nombre}:`, p1_.getEdad());
console.log(`3) Edad de ${p2_.apellido}:`, p2_.getEdad());
const vip1_ = new PacienteVIP2(2, "Luis", "Gomez", new Date(1970, 9, 5), "Critico");
const vip2_ = new PacienteVIP2(4, "Marcela", "Diaz", new Date(1980, 0, 15), "Basico", "Diabetes");
console.log(`2) ${vip1_.getEtiqueta()}  Edad:`, vip1_.getEdad());
console.log(`4) ${vip2_.getEtiqueta()}  Edad:`, vip2_.getEdad());
