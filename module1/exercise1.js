// ===============================
// Ejercicio 1: todos los tipos vistos
// ===============================
// 1. Primitivos básicos
var nombre = "Paciente A";
var edad = 30;
var activo = true;
// 2. Arreglos
var listaNombres = ["Ana", "Luis", "Maria"];
var listaEdades = [28, 35, 42];
// 3. Tupla
var coordenadas = [10.123, -70.456];
// 4. Enum
var EstadoPaciente;
(function (EstadoPaciente) {
    EstadoPaciente[EstadoPaciente["Estable"] = 0] = "Estable";
    EstadoPaciente[EstadoPaciente["Critico"] = 1] = "Critico";
    EstadoPaciente[EstadoPaciente["Recuperado"] = 2] = "Recuperado";
})(EstadoPaciente || (EstadoPaciente = {}));
var estatus = EstadoPaciente.Critico;
// 5. any y unknown
var datoLibre = "puede ser cualquier cosa";
var datoSeguro = 123;
// 6. null, undefined
var sinValor = null;
var noDefinido = undefined;
// 7. void (función que no retorna nada)
function logEstado() {
    console.log("Estado actual: ".concat(estatus));
}
// 8. object y tipos de objeto
var ficha = {
    id: 1,
    nombre: "Paciente A"
};
// 9. Uniones y literales
var respuesta = "si";
var valorUnion = "texto o numero";
var hospitalizado = {
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
    var out = document.createElement("pre");
    out.textContent = JSON.stringify({
        nombre: nombre,
        edad: edad,
        activo: activo,
        listaNombres: listaNombres,
        listaEdades: listaEdades,
        coordenadas: coordenadas,
        estatus: estatus,
        datoLibre: datoLibre,
        datoSeguro: datoSeguro,
        sinValor: sinValor,
        noDefinido: noDefinido,
        ficha: ficha,
        respuesta: respuesta,
        valorUnion: valorUnion,
        hospitalizado: hospitalizado
    }, null, 2);
    document.body.appendChild(out);
}
// Llamadas de demostración
logEstado();
render();
