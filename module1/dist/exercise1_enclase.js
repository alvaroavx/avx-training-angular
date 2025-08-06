"use strict";
// 1. Primitivos básicos
let nombre2 = "Paciente A";
let edad2 = 30;
let activo2 = true;
// 2. Arreglos
let listaNombres2 = ["Ana", "Luis", "Maria"];
let listaEdades2 = [28, 35, 42];
// 3. Tupla
let coordenadas2 = [10.123, -70.456];
let direcciones = ["Alameda", 255];
// 4. Enum
var EstadoPaciente2;
(function (EstadoPaciente2) {
    EstadoPaciente2[EstadoPaciente2["Estable"] = 0] = "Estable";
    EstadoPaciente2[EstadoPaciente2["Critico"] = 1] = "Critico";
    EstadoPaciente2[EstadoPaciente2["Recuperado"] = 2] = "Recuperado";
    EstadoPaciente2[EstadoPaciente2["Saludable"] = 3] = "Saludable";
})(EstadoPaciente2 || (EstadoPaciente2 = {}));
let estatus2 = EstadoPaciente2.Saludable;
function render2() {
    if (typeof document === "undefined")
        return;
    const out = document.createElement("pre");
    out.textContent = JSON.stringify({
        nombre2, edad2, activo2,
        listaNombres2, listaEdades2,
        coordenadas2, direcciones, estatus2
    }, null, 2);
    document.body.appendChild(out);
}
// Llamadas de demostración
render2();
