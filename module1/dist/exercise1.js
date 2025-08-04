"use strict";
// ===============================
// Ejercicio 1: todos los tipos vistos
// ===============================
// 1. Primitivos básicos
let nombre = "Paciente A";
let edad = 30;
let activo = true;
// 2. Arreglos
let listaNombres = ["Ana", "Luis", "Maria"];
let listaEdades = [28, 35, 42];
// 3. Tupla
let coordenadas = [10.123, -70.456];
// 4. Enum
var EstadoPaciente;
(function (EstadoPaciente) {
    EstadoPaciente[EstadoPaciente["Estable"] = 0] = "Estable";
    EstadoPaciente[EstadoPaciente["Critico"] = 1] = "Critico";
    EstadoPaciente[EstadoPaciente["Recuperado"] = 2] = "Recuperado";
})(EstadoPaciente || (EstadoPaciente = {}));
let estatus = EstadoPaciente.Critico;
// 5. any y unknown
let datoLibre = "puede ser cualquier cosa";
let datoSeguro = 123;
// 6. null, undefined
let sinValor = null;
let noDefinido = undefined;
// 7. void (función que no retorna nada)
function logEstado() {
    console.log(`Estado actual: ${estatus}`);
}
// 8. object y tipos de objeto
let ficha = {
    id: 1,
    nombre: "Paciente A"
};
// 9. Uniones y literales
let respuesta = "si";
let valorUnion = "texto o numero";
let hospitalizado = {
    id: 2,
    nombre: "Paciente B",
    edad: 45,
    coords: { lat: 50.5, lon: -3.2 }
};
// ----------------------------------
// Función para mostrar resultados en navegador
// ----------------------------------
function render() {
    if (typeof document === "undefined")
        return;
    const out = document.createElement("pre");
    out.textContent = JSON.stringify({
        nombre, edad, activo,
        listaNombres, listaEdades,
        coordenadas, estatus,
        datoLibre, datoSeguro,
        sinValor, noDefinido,
        ficha, respuesta, valorUnion, hospitalizado
    }, null, 2);
    document.body.appendChild(out);
}
// Llamadas de demostración
logEstado();
render();
