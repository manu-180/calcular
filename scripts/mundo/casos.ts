// Casos de «Tu sueldo en el mundo»: el cálculo puro del contrato (interpolación, día de libertad,
// links compartidos con entradas malas), la inferencia, el traspaso y, para cinco países, que el neto
// interpolado de la grilla coincida con correr la calculadora directo en brutos que no están en ella.
//   npx tsx scripts/mundo/casos.ts
import "../sin-server-only";
import { BRUTOS_GRILLA, cargaDesde, codificarCarga, compararDesde, decodificarCarga, diaDeLibertad, fechaDelDia, netoAnualPpa, tasaEfectiva } from "../../src/motor/mundo/calculo";
import { msHastaCambioDeDia, validarPuntos } from "../../src/motor/mundo/grilla";
import { inferirMundo } from "../../src/motor/mundo/inferir";
import { brutoMensualDeTraspaso, leerMonto } from "../../src/motor/mundo/traspaso";
import type { GrillaMundo, PaisMundo } from "../../src/motor/mundo/tipos";
import { candidatosMundo, construirInformeMundo } from "../../src/lib/mundo/grilla";
import { registro } from "../../src/paises";

let ok = 0;
const fallas: string[] = [];
function igual(nombre: string, real: unknown, esperado: unknown) {
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++;
  else fallas.push(`${nombre}: dio ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
}
function cerca(nombre: string, real: number, esperado: number, tol = 1e-9) {
  if (Math.abs(real - esperado) <= tol) ok++;
  else fallas.push(`${nombre}: dio ${real}, esperado ${esperado}`);
}
function verdad(nombre: string, cond: boolean, detalle = "") {
  if (cond) ok++;
  else fallas.push(`${nombre}${detalle ? `: ${detalle}` : ""}`);
}

// La grilla de brutos.
igual("56 brutos", BRUTOS_GRILLA.length, 56);
igual("primer bruto", BRUTOS_GRILLA[0], 2000);
igual("último bruto", BRUTOS_GRILLA.at(-1), 400000);
verdad("brutos crecientes", BRUTOS_GRILLA.every((b, i) => i === 0 || b > BRUTOS_GRILLA[i - 1]));

// Interpolación con un país sintético.
const sintetico = (mercado: string, iso: string, ppa: number, puntos: [number, number][]): PaisMundo => ({
  mercado,
  iso,
  moneda: "XTS",
  ppa,
  anioPpa: 2025,
  calculadora: `${mercado}.sueldo`,
  ruta: `/${mercado}/sueldo`,
  sitio: "intl",
  puntos: puntos.map(([bruto, neto]) => ({ bruto, neto })),
  datosVerificadosEl: "2026-10-01",
});
const a = sintetico("aa", "AA", 2, [
  [1000, 900],
  [2000, 1600],
  [4000, 2800],
]);
cerca("interpola en el medio", netoAnualPpa(a, 1500), 1250);
cerca("punto exacto", netoAnualPpa(a, 2000), 1600);
cerca("debajo de la grilla, en proporción", netoAnualPpa(a, 500), 450);
cerca("arriba de la grilla, en proporción", netoAnualPpa(a, 8000), 5600);
cerca("bruto cero", netoAnualPpa(a, 0), 0);
cerca("bruto negativo", netoAnualPpa(a, -10), 0);
cerca("sin puntos", netoAnualPpa({ ...a, puntos: [] }, 1000), 0);
cerca("tasa efectiva", tasaEfectiva(a, 3000), 1 - 2200 / 3000);
cerca("tasa con bruto cero", tasaEfectiva(a, 0), 0);
cerca("tasa nunca negativa (crédito)", tasaEfectiva(sintetico("bb", "BB", 1, [[1000, 1100]]), 1000), 0);

// Día de libertad: ceil(tasa × días del año), entre 1 y el último día.
igual("día con 30 % en 2026", diaDeLibertad(0.3, 2026), 110);
igual("día con 30 % en 2028 (bisiesto)", diaDeLibertad(0.3, 2028), 110);
igual("día con 50 % en 2028", diaDeLibertad(0.5, 2028), 183);
igual("día con carga cero", diaDeLibertad(0, 2026), 1);
igual("día con carga total", diaDeLibertad(1, 2026), 365);
igual("día con carga total en bisiesto", diaDeLibertad(1, 2028), 366);
igual("día con tasa fuera de rango", diaDeLibertad(1.7, 2026), 365);
igual("día con tasa negativa", diaDeLibertad(-0.2, 2026), 1);
igual("fecha del día 110 de 2026", fechaDelDia(110, 2026).toISOString().slice(0, 10), "2026-04-20");
igual("fecha del día 60 de 2028", fechaDelDia(60, 2028).toISOString().slice(0, 10), "2028-02-29");

// Comparación y carga compartida con una grilla sintética.
const b = sintetico("bb", "BB", 10, [
  [1000, 950],
  [2000, 1900],
  [4000, 3800],
]);
const grilla: GrillaMundo = {
  version: 1,
  generadoEl: "2026-10-23",
  fuentePpa: { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", consultadoEl: "2026-10-23" },
  paises: [a, b],
};
const filas = compararDesde(grilla, "aa", 250);
igual("compara con todos", filas.length, 2);
igual("ordena por neto equivalente", filas.map((f) => f.pais.iso), ["BB", "AA"]);
cerca("neto local de AA", filas[1].netoMensualLocal, (1250 * 2) / 12, 1e-9);
cerca("neto de BB en moneda de AA", filas[0].netoMensualEquivalente, (1425 * 2) / 12, 1e-9);
igual("origen desconocido", compararDesde(grilla, "zz", 250), []);
igual("bruto cero", compararDesde(grilla, "aa", 0), []);
const carga = cargaDesde(grilla, "aa", 250, 2026);
igual("carga desde AA", carga, { mercado: "aa", tasa: 167, dia: 61, mejor: "BB", ventaja: 14 });
igual("carga sin origen", cargaDesde(grilla, "zz", 250, 2026), null);

// Link compartido: ida y vuelta, y toda entrada mala se descarta entera.
const c = { mercado: "mx", tasa: 312, dia: 115, mejor: "PT", ventaja: 18 };
igual("codifica", codificarCarga(c), "mx.312.115.PT.18");
igual("ida y vuelta", decodificarCarga(codificarCarga(c)), c);
igual("edición con sufijo", decodificarCarga("ca-fr.250.92.FR.0"), { mercado: "ca-fr", tasa: 250, dia: 92, mejor: "FR", ventaja: 0 });
for (const malo of [
  null,
  undefined,
  "",
  "mx.312.115.PT",
  "mx.312.115.PT.18.9",
  "MX.312.115.PT.18",
  "mx.312.115.pt.18",
  "mx.1001.115.PT.18",
  "mx.312.0.PT.18",
  "mx.312.367.PT.18",
  "mx.312.115.PT.1000",
  "mx.-1.115.PT.18",
  "mx.31.2.115.PT",
  "mx.abc.115.PT.18",
  "mx.312.115.PT.18 ",
  "mx.12345.115.PT.18",
  "mexico.312.115.PT.18",
  `mx.312.115.PT.${"1".repeat(40)}`,
  "<script>.1.1.PT.1",
]) {
  igual(`descarta ${JSON.stringify(malo)}`, decodificarCarga(malo), null);
}

// Validación: la misma vara para todos.
const pts = (pares: [number, number][]) => pares.map(([bruto, neto]) => ({ bruto, neto }));
igual("puntos sanos", validarPuntos(pts([[1000, 900], [2000, 1700]])), null);
verdad("neto mayor al bruto", validarPuntos(pts([[1000, 1001]])) !== null);
verdad("neto menor al 25 %", validarPuntos(pts([[1000, 240]])) !== null);
verdad("neto cero", validarPuntos(pts([[1000, 0]])) !== null);
verdad("neto que baja más de 0,1 %", validarPuntos(pts([[1000, 900], [1100, 890]])) !== null);
igual("escalón de hasta 0,1 % se acepta", validarPuntos(pts([[1000, 900], [1100, 899.5]])), null);

// Vencimiento del memo: la próxima medianoche de alguna zona.
const once = new Date("2026-10-23T23:00:00Z");
igual("una hora hasta la medianoche UTC", msHastaCambioDeDia(["UTC"], once), 3_600_000);
igual("la zona más próxima manda", msHastaCambioDeDia(["UTC", "America/Mexico_City"], once), 3_600_000);
igual("Buenos Aires a las 20 h", msHastaCambioDeDia(["America/Argentina/Buenos_Aires"], once), 4 * 3_600_000);

// Montos del traspaso tipeados en cualquier locale.
for (const [texto, esperado] of [
  ["35.000", 35000],
  ["35,000", 35000],
  ["35.000,50", 35000.5],
  ["35,000.50", 35000.5],
  ["1.234.567", 1234567],
  ["1 234 567,8", 1234567.8],
  ["1'234'567.80", 1234567.8],
  ["2500", 2500],
  ["2500,5", 2500.5],
  ["$ 12.500", 12500],
  ["abc", null],
  ["", null],
  ["0", null],
] as const) {
  igual(`lee ${texto}`, leerMonto(texto), esperado);
}
igual("lee un número ya leído", leerMonto(1234.5), 1234.5);

// Traspaso: del formulario al bruto anual / 12.
cerca("mx quincenal con 12,5 pagas", brutoMensualDeTraspaso("mx.sueldo-neto", { sueldo: "10.000", periodo: "quincenal" })!, Math.round(((10000 * 30.4) / 15 * 12.5 / 12) * 100) / 100);
cerca("us anual", brutoMensualDeTraspaso("us.take-home-pay", { sueldo: "60,000" })!, 5000);
cerca("br con 13⅓ pagas", brutoMensualDeTraspaso("br.salario-liquido", { salarioBruto: "3.000" })!, Math.round(((3000 * (13 + 1 / 3)) / 12) * 100) / 100);
cerca("es anual", brutoMensualDeTraspaso("es.sueldo-neto", { bruto: "30.000", pagas: "14" })!, 2500);
cerca("au mensual", brutoMensualDeTraspaso("au.pay-calculator", { salario: "7,000", periodo: "mensual" })!, 7000);
cerca("ng suma los subsidios", brutoMensualDeTraspaso("ng.net-salary-calculator", { basico: "250,000", vivienda: "125,000", transporte: "75,000", otros: "50,000" })!, 500000);
igual("fr con el neto cargado no viaja", brutoMensualDeTraspaso("fr.salaire-brut-net", { sens: "net", montant: "2 000", periode: "mois" }), null);
cerca("fr con el bruto mensual", brutoMensualDeTraspaso("fr.salaire-brut-net", { sens: "brut", montant: "2 500", periode: "mois" })!, 2500);
igual("ch excluida no viaja", brutoMensualDeTraspaso("ch.brutto-netto-rechner", { monatslohn: "6500" }), null);
igual("sin bruto no viaja", brutoMensualDeTraspaso("de.brutto-netto-rechner", { brutto: "" }), null);
const declarada = { campos: [{ id: "b", tipo: "moneda" as const, etiqueta: "Bruto" }], resultado: [], mundo: { bruto: "b", periodoBruto: "mes" as const, neto: "n", periodoNeto: "mes" as const, pagasAnuales: 13 } };
cerca("país nuevo que declaró mundo", brutoMensualDeTraspaso("xx.sueldo", { b: "1.200" }, declarada)!, 1300);
igual("país nuevo que se excluyó", brutoMensualDeTraspaso("xx.sueldo", { b: "1.200" }, { ...declarada, mundo: { excluir: "sin impuesto" } }), null);
igual("calculadora desconocida sin definición", brutoMensualDeTraspaso("xx.algo", { bruto: "1000" }), null);

// Inferencia sobre definiciones reales: tiene que leer el período de la etiqueta o del selector.
const def = (id: string) => registro.paises.flatMap((p) => p.calculadoras).find((e) => e.definicion.id === id)!.definicion;
const inf = (id: string) => {
  const r = inferirMundo(def(id));
  return r.ok ? r.mundo : r.motivo;
};
igual("infiere de", inf("de.brutto-netto-rechner"), { bruto: "brutto", periodoBruto: "mes", neto: "netto", periodoNeto: "mes" });
igual("infiere nl con el selector en jaar", inf("nl.bruto-netto-salaris"), { bruto: "bruto", periodoBruto: "anio", neto: "nettoMaand", periodoNeto: "mes", entrada: { periode: "jaar" } });
igual("infiere gb", inf("gb.take-home-pay"), { bruto: "salario", periodoBruto: "anio", neto: "anual", periodoNeto: "anio" });
igual("infiere pt", inf("pt.salario-liquido"), { bruto: "bruto", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes" });
igual("infiere au con el selector en anual", inf("au.pay-calculator"), { bruto: "salario", periodoBruto: "anio", neto: "neto", periodoNeto: "anio", entrada: { periodo: "anual" } });
igual("sin bruto de moneda", inferirMundo({ campos: [], resultado: [] }), { ok: false, motivo: "no tiene un campo de moneda obligatorio para el bruto" });

// Grilla real: cinco países contra su calculadora corrida directo en brutos fuera de la grilla. Lejos
// de los escalones de la ley: entre dos puntos que encierran uno (México pierde el subsidio para el
// empleo cerca de 12.600) la interpolación se aparta más, y check_mundo lo mide país por país.
const informe = construirInformeMundo();
const { candidatos } = candidatosMundo();
const FUERA = [27500, 64000, 151000];
for (const mercado of ["mx", "es", "us", "br", "de"]) {
  const pais = informe.grilla.paises.find((p) => p.mercado === mercado);
  const cand = candidatos.find((x) => x.mercado === mercado);
  if (!pais || !cand) {
    fallas.push(`${mercado}: no está en la grilla`);
    continue;
  }
  for (const bruto of FUERA) {
    verdad(`${mercado} ${bruto} no está en la grilla`, !BRUTOS_GRILLA.includes(bruto));
    const directo = cand.netoAnual(bruto * pais.ppa);
    if (!directo.ok) {
      fallas.push(`${mercado} ${bruto}: ${directo.motivo}`);
      continue;
    }
    const esperado = directo.neto / pais.ppa;
    const interpolado = netoAnualPpa(pais, bruto);
    const error = Math.abs(interpolado - esperado) / esperado;
    verdad(`${mercado} en ${bruto} dólares internacionales`, error < 0.005, `interpolado ${interpolado.toFixed(2)}, directo ${esperado.toFixed(2)} (${(error * 100).toFixed(3)} %)`);
  }
}

for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `${fallas.length} FALLAS (${ok} OK)` : `TODO OK: ${ok} casos`);
process.exit(fallas.length ? 1 : 0);
