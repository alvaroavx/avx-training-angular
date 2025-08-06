// 1. Primitivos básicos
let nombre2: string       = "Paciente A";
let edad2: number         = 30;
let activo2: boolean      = true;

// 2. Arreglos
let listaNombres2: string[]      = ["Ana", "Luis", "Maria"];
let listaEdades2: Array<number>  = [28, 35, 42];

// 3. Tupla
let coordenadas2: [number, number] = [10.123, -70.456];
let direcciones: [string, number] = ["Alameda", 255]

// 4. Enum
enum EstadoPaciente2 { 
  Estable, //0
  Critico, // 1
  Recuperado, // 2
  Saludable, // 3
}
let estatus2: EstadoPaciente2 = EstadoPaciente2.Saludable;

function render2() {
  if (typeof document === "undefined") return; 
  const out = document.createElement("pre");
  out.textContent = JSON.stringify(
    {
      nombre2, edad2, activo2,
      listaNombres2, listaEdades2,
      coordenadas2, direcciones, estatus2
    },
    null,
    2
  );
  document.body.appendChild(out);
}

// Llamadas de demostración
render2();
