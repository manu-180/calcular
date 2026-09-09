// Verificación de pluriempleo y sucesión de siniestros bajo los arts. 13 y 14 del Decreto 491/97.
// Correr con: npx tsx scripts/check_pluriempleo_art.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. Que se elija la ART por ingreso base cuando el desempate legal usa remuneración cotizada.
//   2. Que la prestación se calcule sobre un solo empleo cuando corresponden varios ingresos base.
//   3. Que dos incapacidades se sumen linealmente en vez de aplicar capacidad restante.
//   4. Que la última ART pague el porcentaje de la última lesión en vez del incremento real.
//   5. Que se invente el porcentaje conjunto de la tabla cuando el usuario no lo aportó.

import {
  PLURIEMPLEO_FUENTES,
  REGLAS_PLURIEMPLEO,
  REGLAS_SUCESION,
  SITUACIONES_ART_45,
  VIGENCIA_PLURIEMPLEO,
} from "../src/data/pluriempleo-art";
import {
  calcularSucesion,
  resolverPluriempleo,
  type EmpleoPluriempleo,
  type EntradaPluriempleo,
  type EntradaSucesion,
} from "../src/lib/pluriempleo-art";

let fallas = 0;
let asserts = 0;
function check(nombre: string, condicion: boolean, detalle?: unknown) {
  asserts++;
  if (condicion) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const empleo = (
  nombre: string,
  remuneracionMesAnterior: number,
  ingresoBase: number,
  presenciaAgenteRiesgo: boolean,
  trabajabaAlMomento: boolean,
): EmpleoPluriempleo => ({
  nombre,
  remuneracionMesAnterior,
  ingresoBase,
  presenciaAgenteRiesgo,
  trabajabaAlMomento,
});

const fabrica = empleo("Fábrica", 900_000, 1_800_000, true, false);
const estudio = empleo("Estudio", 1_500_000, 700_000, true, false);
const reparto = empleo("Reparto", 800_000, 500_000, false, true);

const porRiesgo = resolverPluriempleo({
  empleos: [fabrica, reparto],
  atribuibleAMasDeUnEmpleo: false,
});
check("un solo agente de riesgo determina responsable", porRiesgo.responsable?.nombre === "Fábrica");
check("el criterio es agente de riesgo", porRiesgo.criterio === "agente-de-riesgo");
check("el empleo con agente aporta a la base", porRiesgo.empleosQueAportanBase.some((e) => e.nombre === "Fábrica"));
check("el empleo donde trabajaba aporta a la base", porRiesgo.empleosQueAportanBase.some((e) => e.nombre === "Reparto"));
check("la base suma los dos empleos alcanzados", porRiesgo.baseTotal === 2_300_000, porRiesgo.baseTotal);
check("la base no queda limitada al responsable", porRiesgo.baseTotal !== fabrica.ingresoBase);
check("la obligada puede repetir del otro empleo responsable", porRiesgo.repeticion.map((e) => e.nombre).join() === "Reparto");
check("la salida siempre tiene avisos", porRiesgo.avisos.length > 0);

const porRemuneracion = resolverPluriempleo({
  empleos: [fabrica, estudio],
  atribuibleAMasDeUnEmpleo: true,
});
check("atribuible a varios elige mayor remuneración cotizada", porRemuneracion.responsable?.nombre === "Estudio");
check("no confunde remuneración con ingreso base", porRemuneracion.responsable?.ingresoBase === 700_000);
check("gana aunque tenga el ingreso base más bajo", porRemuneracion.responsable?.ingresoBase! < fabrica.ingresoBase);
check("el criterio es mayor remuneración", porRemuneracion.criterio === "mayor-remuneracion");
check("los dos trabajos con riesgo integran la base", porRemuneracion.empleosQueAportanBase.length === 2);
check("la base plural suma 2,5 millones", porRemuneracion.baseTotal === 2_500_000, porRemuneracion.baseTotal);
check("la repetición excluye a la obligada", !porRemuneracion.repeticion.some((e) => e.nombre === "Estudio"));
check("la repetición incluye al otro responsable", porRemuneracion.repeticion.map((e) => e.nombre).join() === "Fábrica");

const empate = resolverPluriempleo({
  empleos: [
    empleo("Uno", 1_000_000, 400_000, true, false),
    empleo("Dos", 1_000_000, 600_000, true, false),
  ],
  atribuibleAMasDeUnEmpleo: true,
});
check("un empate exacto deja responsable nulo", empate.responsable === null);
check("un empate exacto queda indeterminado", empate.criterio === "indeterminado");
check("un empate produce aviso bloqueante", empate.avisos.some((a) => a.tono === "bloqueante"));
check("un empate no se resuelve por ingreso base", empate.responsable?.nombre !== "Dos");
check("la base se calcula aunque no pueda elegirse la obligada", empate.baseTotal === 1_000_000);

const muchosRiesgosSinAtribucion = resolverPluriempleo({
  empleos: [fabrica, estudio],
  atribuibleAMasDeUnEmpleo: false,
});
check("varios agentes sin atribución declarada dejan responsable nulo", muchosRiesgosSinAtribucion.responsable === null);
check("varios agentes sin atribución declarada quedan indeterminados", muchosRiesgosSinAtribucion.criterio === "indeterminado");
check("varios agentes piden definir la atribución", muchosRiesgosSinAtribucion.avisos.some((a) => a.tono === "atencion" && a.texto.includes("más de un empleo")));

const sinRiesgo = resolverPluriempleo({
  empleos: [empleo("Oficina", 500_000, 450_000, false, false)],
  atribuibleAMasDeUnEmpleo: false,
});
check("sin agente de riesgo no inventa responsable", sinRiesgo.responsable === null);
check("sin agente de riesgo queda indeterminado", sinRiesgo.criterio === "indeterminado");
check("sin agente de riesgo genera bloqueante", sinRiesgo.avisos.some((a) => a.tono === "bloqueante"));
check("sin empleos alcanzados la base es cero", sinRiesgo.baseTotal === 0);
check("sin responsable no hay repetición", sinRiesgo.repeticion.length === 0);

const vacio = resolverPluriempleo({ empleos: [], atribuibleAMasDeUnEmpleo: true });
check("sin empleos no hay responsable", vacio.responsable === null);
check("sin empleos el criterio es indeterminado", vacio.criterio === "indeterminado");
check("sin empleos hay aviso bloqueante", vacio.avisos.some((a) => a.tono === "bloqueante"));
check("sin empleos la base queda en cero", vacio.baseTotal === 0);

const dosContingencias = calcularSucesion({
  incapacidadesPrevias: [30],
  incapacidadUltima: 20,
  estadoPrevio: "definitiva-misma-modalidad",
});
check("30% previo permanece 30%", dosContingencias.incapacidadPrevia === 30, dosContingencias.incapacidadPrevia);
check("30% + 20% por capacidad restante da 44%", dosContingencias.incapacidadIntegral === 44, dosContingencias.incapacidadIntegral);
check("el incremento es 14 puntos", dosContingencias.incapacidadIncremental === 14, dosContingencias.incapacidadIncremental);
check("el incremento no es el 20% de la última lesión", dosContingencias.incapacidadIncremental !== 20);
check("sin tabla el origen es capacidad restante", dosContingencias.origenIntegral === "capacidad-restante");
check("la regla general paga sólo el incremento", dosContingencias.quienPaga === "ultima-art-solo-incremental");
check("la siniestralidad imputada es 14", dosContingencias.siniestralidadImputada === 14);
check("la siniestralidad no toma la integral", dosContingencias.siniestralidadImputada !== dosContingencias.incapacidadIntegral);
check("prestaciones en especie conserva opción del trabajador", dosContingencias.prestacionesEnEspecie.includes("opción del trabajador"));
check("prestaciones en especie devuelve el inciso c completo", dosContingencias.prestacionesEnEspecie === REGLAS_SUCESION[2].texto);

const tresContingencias = calcularSucesion({
  incapacidadesPrevias: [10, 20],
  incapacidadUltima: 30,
  estadoPrevio: "definitiva-misma-modalidad",
});
check("10% + 20% previos dan 28%", tresContingencias.incapacidadPrevia === 28, tresContingencias.incapacidadPrevia);
check("10%, 20% y 30% encadenados dan 49,6%", tresContingencias.incapacidadIntegral === 49.6, tresContingencias.incapacidadIntegral);
check("la tercera contingencia incrementa 21,6 puntos", tresContingencias.incapacidadIncremental === 21.6, tresContingencias.incapacidadIncremental);
check("con incapacidad previa el incremento no replica la última", tresContingencias.incapacidadIncremental !== tresContingencias.incapacidadIntegral);
check("con incapacidad previa positiva tampoco replica incapacidadUltima", tresContingencias.incapacidadIncremental !== 30);

const tablaMayor = calcularSucesion({
  incapacidadesPrevias: [30],
  incapacidadUltima: 20,
  estadoPrevio: "definitiva-misma-modalidad",
  porcentajeTablaConjunta: 50,
});
check("la tabla mayor reemplaza la integral", tablaMayor.incapacidadIntegral === 50);
check("la tabla mayor cambia el incremento a 20", tablaMayor.incapacidadIncremental === 20);
check("la tabla mayor informa su origen", tablaMayor.origenIntegral === "tabla-conjunta");
check("el aviso dice que el dato vino de la tabla", tablaMayor.avisos.some((a) => a.texto.includes("Tabla de Evaluación")));

const tablaMenor = calcularSucesion({
  incapacidadesPrevias: [30],
  incapacidadUltima: 20,
  estadoPrevio: "definitiva-misma-modalidad",
  porcentajeTablaConjunta: 40,
});
check("la tabla menor se ignora", tablaMenor.incapacidadIntegral === 44);
check("la tabla menor conserva capacidad restante", tablaMenor.origenIntegral === "capacidad-restante");
check("la tabla menor conserva incremento de 14", tablaMenor.incapacidadIncremental === 14);

const estados = [
  ["definitiva-misma-modalidad", "ultima-art-solo-incremental"],
  ["definitiva-otra-modalidad", "ultima-art-integral-exclusivo"],
  ["provisoria", "concurren-proporcionalmente"],
] as const;
for (const [estadoPrevio, quienPaga] of estados) {
  const resultado = calcularSucesion({
    incapacidadesPrevias: [25],
    incapacidadUltima: 10,
    estadoPrevio,
  });
  check(`${estadoPrevio} mapea a ${quienPaga}`, resultado.quienPaga === quienPaga, resultado.quienPaga);
  check(`${estadoPrevio} conserva la incremental`, resultado.incapacidadIncremental === 7.5, resultado.incapacidadIncremental);
  check(`${estadoPrevio} imputa sólo la incremental`, resultado.siniestralidadImputada === 7.5, resultado.siniestralidadImputada);
}

const sinPrevia = calcularSucesion({
  incapacidadesPrevias: [],
  incapacidadUltima: 35,
  estadoPrevio: "definitiva-misma-modalidad",
});
check("sin contingencias anteriores la previa es cero", sinPrevia.incapacidadPrevia === 0);
check("sin contingencias anteriores la integral es la última", sinPrevia.incapacidadIntegral === 35);
check("sin contingencias anteriores la incremental coincide con la última", sinPrevia.incapacidadIncremental === 35);

const extremos = calcularSucesion({
  incapacidadesPrevias: [100],
  incapacidadUltima: 100,
  estadoPrevio: "definitiva-misma-modalidad",
});
check("100% previo no supera 100% al encadenar", extremos.incapacidadIntegral === 100);
check("sin capacidad restante el incremento es cero", extremos.incapacidadIncremental === 0);
check("el resultado extremo no es NaN", !Number.isNaN(extremos.incapacidadIncremental));

const invalidos: EntradaSucesion[] = [
  { incapacidadesPrevias: [-1], incapacidadUltima: 20, estadoPrevio: "definitiva-misma-modalidad" },
  { incapacidadesPrevias: [101], incapacidadUltima: 20, estadoPrevio: "definitiva-misma-modalidad" },
  { incapacidadesPrevias: [20], incapacidadUltima: -1, estadoPrevio: "definitiva-misma-modalidad" },
  { incapacidadesPrevias: [20], incapacidadUltima: 101, estadoPrevio: "definitiva-misma-modalidad" },
  { incapacidadesPrevias: [20], incapacidadUltima: 10, estadoPrevio: "definitiva-misma-modalidad", porcentajeTablaConjunta: -1 },
  { incapacidadesPrevias: [20], incapacidadUltima: 10, estadoPrevio: "definitiva-misma-modalidad", porcentajeTablaConjunta: 101 },
  { incapacidadesPrevias: [Number.NaN], incapacidadUltima: 10, estadoPrevio: "definitiva-misma-modalidad" },
];
for (const [indice, entrada] of invalidos.entries()) {
  const resultado = calcularSucesion(entrada);
  check(`inválido ${indice + 1} produce bloqueante`, resultado.avisos.some((a) => a.tono === "bloqueante"));
  check(`inválido ${indice + 1} no devuelve NaN`, [resultado.incapacidadPrevia, resultado.incapacidadIntegral, resultado.incapacidadIncremental, resultado.siniestralidadImputada].every(Number.isFinite));
}

check("art. 45 enumera cuatro situaciones", SITUACIONES_ART_45.length === 4);
check("sólo a y c figuran reglamentados por estos artículos", SITUACIONES_ART_45.map((s) => s.reglamentadoPorEstosArticulos).join() === "true,false,true,false");
check("hay cuatro reglas de pluriempleo", REGLAS_PLURIEMPLEO.length === 4);
check("hay cuatro reglas de sucesión", REGLAS_SUCESION.length === 4);
check("la fuente del decreto conserva InfoLEG 43703", PLURIEMPLEO_FUENTES.lista[0].url.includes("/43703/"));
check("la fuente de la ley conserva InfoLEG 27971", PLURIEMPLEO_FUENTES.lista[1].url.includes("/27971/"));
check("la consulta está fechada", VIGENCIA_PLURIEMPLEO.consultadoEl === "9 de septiembre de 2026");

const barridoEmpleos: EntradaPluriempleo[] = [];
for (const atribuibleAMasDeUnEmpleo of [false, true]) {
  for (const presenciaA of [false, true]) {
    for (const presenciaB of [false, true]) {
      for (const trabajandoA of [false, true]) {
        barridoEmpleos.push({
          atribuibleAMasDeUnEmpleo,
          empleos: [
            empleo("A", 1_000, 800, presenciaA, trabajandoA),
            empleo("B", 900, 700, presenciaB, !trabajandoA),
          ],
        });
      }
    }
  }
}

for (const [indice, entrada] of barridoEmpleos.entries()) {
  const resultado = resolverPluriempleo(entrada);
  const campos = [resultado.criterio, resultado.empleosQueAportanBase, resultado.baseTotal, resultado.repeticion, resultado.avisos];
  check(`barrido pluriempleo ${indice + 1} no tiene undefined`, campos.every((campo) => campo !== undefined));
  check(`barrido pluriempleo ${indice + 1} no tiene NaN`, Number.isFinite(resultado.baseTotal));
}

for (const previa of [0, 10, 40, 80, 100]) {
  for (const ultima of [0, 5, 25, 100]) {
    const resultado = calcularSucesion({
      incapacidadesPrevias: [previa],
      incapacidadUltima: ultima,
      estadoPrevio: "definitiva-misma-modalidad",
    });
    const campos = [
      resultado.incapacidadPrevia,
      resultado.incapacidadIntegral,
      resultado.incapacidadIncremental,
      resultado.siniestralidadImputada,
    ];
    check(`barrido sucesión ${previa}/${ultima} no tiene undefined`, campos.every((campo) => campo !== undefined));
    check(`barrido sucesión ${previa}/${ultima} no tiene NaN`, campos.every(Number.isFinite));
    check(`barrido sucesión ${previa}/${ultima} no supera 100`, resultado.incapacidadIntegral <= 100);
    if (previa > 0 && previa < 100 && ultima > 0) {
      check(`mutación ${previa}/${ultima}: incremental no replica última`, resultado.incapacidadIncremental !== ultima);
    }
  }
}

check("el archivo ejecuta al menos sesenta asserts", asserts >= 60, asserts);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en ${asserts} checks de pluriempleo y sucesión.`);
  process.exit(1);
}
console.log(`\n✅ ${asserts} checks de pluriempleo y sucesión de siniestros OK.`);
