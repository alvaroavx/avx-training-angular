// ===============================
// Ejercicio 1: todos los tipos vistos
// ===============================

// 1. Primitivos básicos
let nombre: string       = "Paciente A";
let edad: number         = 30;
let activo: boolean      = true;

// 2. Arreglos
let listaNombres: string[]      = ["Ana", "Luis", "Maria"];
let listaEdades: Array<number>  = [28, 35, 42];

// 3. Tupla
let coordenadas: [number, number] = [10.123, -70.456];

// 4. Enum
enum EstadoPaciente { 
  Estable, 
  Critico, 
  Recuperado 
}
let estatus: EstadoPaciente = EstadoPaciente.Critico;

// 5. any y unknown
let datoLibre: any    = "puede ser cualquier cosa";
let datoSeguro: unknown = 123;

// 6. null, undefined
let sinValor: null       = null;
let noDefinido: undefined = undefined;

// 7. void (función que no retorna nada)
function logEstado(): void {
  console.log(`Estado actual: ${estatus}`);
}

// 8. object y tipos de objeto
let ficha: { id: number; nombre: string } = { 
  id: 1, 
  nombre: "Paciente A" 
};

// 9. Uniones y literales
let respuesta: "si" | "no" | boolean = "si";
let valorUnion: string | number      = "texto o numero";

// 10. Type alias e interface
type Coordenada = { lat: number; lon: number };
interface Hospitalizado {
  id: number;
  nombre: string;
  edad: number;
  coords?: Coordenada;
}
let hospitalizado: Hospitalizado = {
  id: 2,
  nombre: "Paciente B",
  edad: 45,
  coords: { lat: 50.5, lon: -3.2 }
};

// ----------------------------------
// Función para mostrar resultados en navegador
// ----------------------------------
function render() {
  if (typeof document === "undefined") return; 
  const out = document.createElement("pre");
  out.textContent = JSON.stringify(
    {
      nombre, edad, activo,
      listaNombres, listaEdades,
      coordenadas, estatus,
      datoLibre, datoSeguro,
      sinValor, noDefinido,
      ficha, respuesta, valorUnion, hospitalizado
    },
    null,
    2
  );
  document.body.appendChild(out);
}

// Llamadas de demostración
logEstado();
render();
