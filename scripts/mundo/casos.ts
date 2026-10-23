// Casos de «Tu sueldo en el mundo»: el cálculo puro del contrato (interpolación, día de libertad,
// links compartidos con entradas malas), la inferencia, el traspaso y, para cinco países, que el neto
// interpolado de la grilla coincida con correr la calculadora directo en brutos que no están en ella.
//   npx tsx scripts/mundo/casos.ts
import "../sin-server-only";
import { BRUTOS_GRILLA, cargaDesde, codificarCarga, compararDesde, decodificarCarga, diaDeCarga, diaDeLibertad, fechaDelDia, franjaDe, netoAnualPpa, normalizarCarga, PASO_TASA, PASO_VENTAJA, RAZON_FRANJA, redondearTasa, redondearVentaja, tasaEfectiva } from "../../src/motor/mundo/calculo";
import { msHastaCambioDeDia, validarPuntos } from "../../src/motor/mundo/grilla";
import { calculadoraPrincipal, edicionPrincipal } from "../../src/motor/mundo/rutas";
import { compactar, expandir } from "../../src/motor/mundo/ui/compacta";
import { inferirMundo } from "../../src/motor/mundo/inferir";
import { leerMonto, traspasoDe } from "../../src/motor/mundo/traspaso";
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
  pagas: 12,
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
igual("día con carga cero", diaDeLibertad(0, 2026), 0);
igual("día con carga total", diaDeLibertad(1, 2026), 365);
igual("día con carga total en bisiesto", diaDeLibertad(1, 2028), 366);
igual("día con tasa fuera de rango", diaDeLibertad(1.7, 2026), 365);
igual("día con tasa negativa", diaDeLibertad(-0.2, 2026), 0);
igual("día con una carga mínima", diaDeLibertad(0.0001, 2026), 1);
igual("fecha del día 110 de 2026", fechaDelDia(110, 2026).toISOString().slice(0, 10), "2026-04-20");
igual("fecha del día 60 de 2028", fechaDelDia(60, 2028).toISOString().slice(0, 10), "2028-02-29");

// Comparación y carga compartida con una grilla sintética. Los brutos son ANUALES en moneda local.
const b = sintetico("bb", "BB", 10, [
  [1000, 950],
  [2000, 1900],
  [4000, 3800],
]);
const grilla: GrillaMundo = {
  version: 1,
  generadoEl: "2026-10-23",
  fuentePpa: { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", consultadoEl: "2026-10-23", anio: 2025 },
  paises: [a, b],
};
const filas = compararDesde(grilla, "aa", 3000);
igual("compara con todos", filas.length, 2);
igual("ordena por neto equivalente", filas.map((f) => f.pais.iso), ["BB", "AA"]);
cerca("neto local de AA", filas[1].netoMensualLocal, (1250 * 2) / 12, 1e-9);
cerca("neto de BB en moneda de AA", filas[0].netoMensualEquivalente, (1425 * 2) / 12, 1e-9);
igual("origen desconocido", compararDesde(grilla, "zz", 3000), []);
igual("bruto cero", compararDesde(grilla, "aa", 0), []);

// 1. Privacidad: la carga sale del centro de la franja del sueldo, la tasa en múltiplos de 2 y la
// ventaja en múltiplos de 5. 1500 dólares internacionales caen en la franja [1,25^32; 1,25^33).
const f1500 = franjaDe(1500)!;
igual("franja de 1500", f1500.indice, 32);
cerca("razón de la franja", f1500.hasta / f1500.desde, RAZON_FRANJA, 1e-9);
verdad("la franja cubre ±10 %", f1500.hasta / f1500.desde >= 1.1 / 0.9);
const carga = cargaDesde(grilla, "aa", 3000);
igual("carga desde AA", carga, { mercado: "aa", tasa: 16, mejor: "BB", ventaja: 15 });
igual("misma franja, misma carga", cargaDesde(grilla, "aa", f1500.desde * 2 * 1.0001), carga);
igual("misma franja, misma carga (borde de arriba)", cargaDesde(grilla, "aa", f1500.hasta * 2 * 0.9999), carga);
igual("carga sin origen", cargaDesde(grilla, "zz", 3000), null);
igual("carga con bruto cero", cargaDesde(grilla, "aa", 0), null);
verdad("tasa en múltiplos de 2", carga!.tasa % PASO_TASA === 0);
verdad("ventaja en múltiplos de 5", carga!.ventaja % PASO_VENTAJA === 0);
igual("redondea la tasa", [0, 0.0004, 0.006, 0.0101, 0.309, 0.311, 1.2].map(redondearTasa), [0, 0, 2, 2, 30, 32, 100]);
igual("redondea la ventaja", [-3, 0, 2.4, 2.6, 17, 1200].map(redondearVentaja), [0, 0, 0, 5, 15, 995]);
igual("ventaja que redondea a 0: el mejor es el propio", cargaDesde({ ...grilla, paises: [a, sintetico("cc", "CC", 10, [[1000, 905], [2000, 1610], [4000, 2810]])] }, "aa", 3000)?.mejor, "AA");

// 9. Carga cero: sin impuesto ni aportes no hay «1 de enero», el día es 0.
const libre = sintetico("ll", "LL", 1, [
  [1000, 1000],
  [2000, 2000],
  [4000, 3600],
]);
const conLibre: GrillaMundo = { ...grilla, paises: [a, libre] };
igual("carga cero en la franja libre", cargaDesde(conLibre, "ll", 1100)?.tasa, 0);
igual("día de una carga cero", diaDeCarga({ tasa: 0 }, 2026), 0);
igual("una franja que toca el impuesto no es cero", cargaDesde(conLibre, "ll", 2600)!.tasa >= PASO_TASA, true);
igual("día de 30 %", diaDeCarga({ tasa: 30 }, 2026), 110);

// 2. Link compartido: forma canónica, ida y vuelta, normalización y toda entrada mala descartada.
const reales: GrillaMundo = { ...grilla, paises: [sintetico("mx", "MX", 11, [[1000, 900], [2000, 1700]]), sintetico("pt", "PT", 0.6, [[1000, 900], [2000, 1700]]), sintetico("ca", "CA", 1.3, [[1000, 900], [2000, 1700]])] };
const c = { mercado: "mx", tasa: 30, mejor: "PT", ventaja: 15 };
igual("codifica", codificarCarga(c), "mx.30.PT.15");
igual("ida y vuelta", decodificarCarga(codificarCarga(c), reales), c);
igual("propio sin ventaja", decodificarCarga("mx.0.MX.0", reales), { mercado: "mx", tasa: 0, mejor: "MX", ventaja: 0 });
for (const [entrada, canonica] of [
  ["mx.030.PT.15", "mx.30.PT.15"],
  ["mx.30.PT.015", "mx.30.PT.15"],
  ["MX.30.pt.15", "mx.30.PT.15"],
  ["mx.31.PT.17", "mx.32.PT.15"],
  ["mx.1.PT.15", "mx.2.PT.15"],
  ["mx.30.PT.2", "mx.30.MX.0"],
  ["mx.30.PT.0", "mx.30.MX.0"],
  ["mx.30.MX.15", "mx.30.MX.0"],
  ["mx.30.PT.999", "mx.30.PT.995"],
] as const) {
  const n = normalizarCarga(entrada, reales);
  igual(`normaliza ${entrada}`, n && { c: codificarCarga(n.carga), canonica: n.canonica }, { c: canonica, canonica: false });
  igual(`decodificar rechaza la no canónica ${entrada}`, decodificarCarga(entrada, reales), null);
}
igual("la canónica es canónica", normalizarCarga("mx.30.PT.15", reales)?.canonica, true);
for (const malo of [
  null,
  undefined,
  "",
  "mx.30.PT",
  "mx.30.PT.15.9",
  "mx.312.115.PT.18",
  "mx.101.PT.15",
  "mx.30.PT.1000",
  "mx.-2.PT.15",
  "mx.3.0.PT",
  "mx.abc.PT.15",
  "mx.30.PT.15 ",
  "mx.1234.PT.15",
  "mexico.30.PT.15",
  "zz.30.PT.15",
  "mx.30.ZZ.15",
  "ca-fr.30.PT.15",
  "mx.30.P1.15",
  "mx.30.PT.%25",
  "%25",
  `mx.30.PT.${"1".repeat(40)}`,
  "<script>.1.PT.1",
]) {
  igual(`descarta ${JSON.stringify(malo)}`, normalizarCarga(malo, reales), null);
}

// Validación: la misma vara para todos.
const pts = (pares: [number, number][]) => pares.map(([bruto, neto]) => ({ bruto, neto }));
igual("puntos sanos", validarPuntos(pts([[1000, 900], [2000, 1700]])), null);
verdad("neto mayor al bruto", validarPuntos(pts([[1000, 1001]])) !== null);
verdad("neto menor al 25 %", validarPuntos(pts([[1000, 240]])) !== null);
verdad("neto cero", validarPuntos(pts([[1000, 0]])) !== null);
verdad("neto que baja más de 0,1 %", validarPuntos(pts([[1000, 900], [1100, 890]])) !== null);
igual("escalón de hasta 0,1 % se acepta", validarPuntos(pts([[1000, 900], [1100, 899.5]])), null);
igual("el salto de un umbral de la ley se acepta entre puntos pegados", validarPuntos(pts([[10000, 9000], [10005, 8600], [11000, 9400]])), null);
verdad("la misma caída entre puntos alejados no", validarPuntos(pts([[10000, 9000], [10500, 8600]])) !== null);

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

// Traspaso: del formulario al bruto ANUAL con las pagas de ley.
const anual = (mercado: string, calculadora: string, crudos: Record<string, unknown>, extra: { definicion?: Parameters<typeof traspasoDe>[0]["definicion"]; resultado?: Record<string, unknown> } = {}) =>
  traspasoDe({ mercado, calculadora, crudos, ...extra })?.brutoAnual ?? null;
cerca("mx quincenal con 12,5 pagas", anual("mx", "mx.sueldo-neto", { sueldo: "10.000", periodo: "quincenal" })!, Math.round(((10000 * 30.4) / 15) * 12.5 * 100) / 100);
cerca("us anual", anual("us", "us.take-home-pay", { sueldo: "60,000" })!, 60000);
cerca("br con 13⅓ pagas", anual("br", "br.salario-liquido", { salarioBruto: "3.000" })!, Math.round(3000 * (13 + 1 / 3) * 100) / 100);
cerca("es anual", anual("es", "es.sueldo-neto", { bruto: "30.000", pagas: "14" })!, 30000);
cerca("au mensual", anual("au", "au.pay-calculator", { salario: "7,000", periodo: "mensual" })!, 84000);
cerca("ng suma los subsidios", anual("ng", "ng.net-salary-calculator", { basico: "250,000", vivienda: "125,000", transporte: "75,000", otros: "50,000" })!, 6000000);
igual("fr con el neto cargado no viaja", anual("fr", "fr.salaire-brut-net", { sens: "net", montant: "2 000", periode: "mois" }), null);
cerca("fr con el bruto mensual", anual("fr", "fr.salaire-brut-net", { sens: "brut", montant: "2 500", periode: "mois" })!, 30000);
igual("ch excluida no viaja", anual("ch", "ch.brutto-netto-rechner", { monatslohn: "6500" }), null);
igual("sin bruto no viaja", anual("de", "de.brutto-netto-rechner", { brutto: "" }), null);
const declarada = { campos: [{ id: "b", tipo: "moneda" as const, etiqueta: "Bruto" }], resultado: [], mundo: { bruto: "b", periodoBruto: "mes" as const, neto: "n", periodoNeto: "mes" as const, pagasAnuales: 13 } };
cerca("país nuevo que declaró mundo", anual("xx", "xx.sueldo", { b: "1.200" }, { definicion: declarada })!, 15600);
igual("país nuevo que se excluyó", anual("xx", "xx.sueldo", { b: "1.200" }, { definicion: { ...declarada, mundo: { excluir: "sin impuesto" } } }), null);
igual("calculadora desconocida sin definición", anual("xx", "xx.algo", { bruto: "1000" }), null);

// 5a. Con el resultado del cálculo, el bruto sale de ahí donde el adaptador lo lee del resultado.
cerca("in usa el bruto del resultado, no el CTC", anual("in", "in.in-hand-salary-calculator", { ctc: "12,00,000" }, { resultado: { bruto: 1_100_000 } })!, 1_100_000);
cerca("nl con vakantiegeld y 13.º mes del resultado", anual("nl", "nl.bruto-netto-salaris", { bruto: "4.000", periode: "maand", vakantiegeld: true, dertiendeMaand: true }, { resultado: { brutoJaar: 55_840 } })!, 55_840);
cerca("nl sin resultado usa el campo", anual("nl", "nl.bruto-netto-salaris", { bruto: "4.000", periode: "maand" })!, 48000);
cerca("ng mensual del resultado por 12", anual("ng", "ng.net-salary-calculator", { basico: "250,000" }, { resultado: { bruto: 500_000 } })!, 6_000_000);
cerca("ec con brutoAnual del resultado", anual("ec", "ec.sueldo-neto", { sueldo: "1.000" }, { resultado: { sueldo: 1000, decimoTercero: 1000 / 12, decimoCuarto: 482 / 12 } })!, 12 * (1000 + 1000 / 12 + 482 / 12), 0.01);
cerca("pe sin los datos del país usa el campo con 14 pagas", anual("pe", "pe.sueldo-neto", { sueldo: "3.000", seguro: "essalud" }, { resultado: { bruto: 3000 } })!, 42000);
igual("un resultado sin el número no rompe", anual("in", "in.in-hand-salary-calculator", { ctc: "1200000" }, { resultado: { bruto: "x" } }), 1_200_000);

// 5b. Ediciones con sufijo: se guarda la principal y el adaptador es el de `<principal>.<id local>`.
igual("ca-fr guarda ca", traspasoDe({ mercado: "ca-fr", calculadora: "ca-fr.take-home-pay", crudos: { salario: "70 000" } }), { mercado: "ca", brutoAnual: 70000 });
igual("be-fr usa el adaptador de be", traspasoDe({ mercado: "be-fr", calculadora: "be-fr.bruto-netto-berekenen", crudos: { bruto: "3.500" } }), { mercado: "be", brutoAnual: 42000 });
igual("ch-fr sigue excluida", traspasoDe({ mercado: "ch-fr", calculadora: "ch-fr.brutto-netto-rechner", crudos: { monatslohn: "6500" } }), null);
igual("principal de una edición", [edicionPrincipal("lu-de"), edicionPrincipal("mx"), calculadoraPrincipal("ch-it", "ch-it.x"), calculadoraPrincipal("mx", "mx.sueldo-neto")], ["lu", "mx", "ch.x", "mx.sueldo-neto"]);

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

// 6. Pagas de ley: viajan al navegador y «por mes» es el sueldo del recibo.
const pagasDe = (m: string) => informe.grilla.paises.find((p) => p.mercado === m)?.pagas;
igual("pagas de AR, AT, ES, MX, US", ["ar", "at", "es", "mx", "us"].map(pagasDe), [13, 14, 14, 12.5, 12]);
const cliente = compactar(informe.grilla, "es-AR", "https://calcular.ar");
igual("el cliente recibe las pagas", cliente.paises.find((p) => p.mercado === "at")?.pagas, 14);
igual("expandir devuelve los mismos puntos", expandir(cliente).paises.map((p) => p.puntos.length), informe.grilla.paises.map((p) => p.puntos.length));
const at = informe.grilla.paises.find((p) => p.mercado === "at")!;
cerca("2.000 de recibo en AT comparan como 28.000 al año", compararDesde(informe.grilla, "at", 2000 * at.pagas).find((f) => f.pais.mercado === "at")!.netoMensualLocal, (netoAnualPpa(at, 28000 / at.ppa) * at.ppa) / 12, 1e-6);
igual("el año de la PPA es el del Banco Mundial, no el de AR llevada", informe.grilla.fuentePpa.anio, Math.max(...informe.grilla.paises.filter((p) => p.mercado !== "ar").map((p) => p.anioPpa)));
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
