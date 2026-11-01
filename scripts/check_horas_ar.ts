// «¿Cuántas horas de trabajo te cuesta?» en calcular.ar: ningún precio se publica vencido, sin fuente
// oficial https o con un número absurdo, y el link compartido nunca puede llevar un monto.
// Correr con: npx tsx scripts/check_horas_ar.ts
import "./sin-server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ITEMS_COTIDIANOS, itemCotidiano, RUTA_HORAS_AR, type ArchivoCotidianos } from "../src/lib/horas-ar/catalogo";
import { datosHorasAR } from "../src/lib/horas-ar/datos";
import { codigoHoras, duracion, ESCALA_COMPARTIDA, fraseCompartir, leerCodigoHoras, minutosCompartidos, minutosDe, valorHora } from "../src/lib/horas-ar/formato";
import { hoyAR } from "../src/lib/hoy";

const RAIZ = path.resolve(import.meta.dirname, "..");
let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const hoy = hoyAR();
const MINIMO_PUBLICADOS = 6;
// Bandas de sanidad en pesos: fuera de esto el número casi seguro está mal leído.
const BANDAS: Record<string, [number, number]> = {
  asado: [3000, 200_000],
  yerba: [500, 60_000],
  pan: [800, 60_000],
  leche: [300, 30_000],
  huevos: [600, 60_000],
  dulce: [600, 60_000],
  cerveza: [600, 60_000],
  cafe: [2000, 200_000],
  nafta: [300, 30_000],
  tanque: [15_000, 1_500_000],
  spotify: [500, 100_000],
  canasta: [50_000, 10_000_000],
  gaseosa: [500, 60_000],
  vino: [300, 60_000],
  hamburguesas: [1000, 100_000],
  queso: [2000, 200_000],
  panales: [800, 100_000],
};

// Catálogo
const ids = ITEMS_COTIDIANOS.map((i) => i.id);
check("ids del catálogo únicos", new Set(ids).size === ids.length, ids);
check("ids del catálogo en [a-z]+ (van en el link)", ids.every((id) => /^[a-z]+$/.test(id)), ids);
check("cada ítem tiene banda de sanidad", ids.every((id) => id in BANDAS), ids.filter((id) => !(id in BANDAS)));
check("los del INDEC declaran su serie", ITEMS_COTIDIANOS.every((i) => i.fuente !== "indec" || /^105\.1_I2[A-Z]+_2016_M_\d+$/.test(i.serie ?? "")));
check("sin rayas en los nombres", ITEMS_COTIDIANOS.every((i) => !/[—–]/.test(`${i.nombre} ${i.corto} ${i.cantidad}`)));

// Archivo
const archivo = JSON.parse(readFileSync(path.join(RAIZ, "src/lib/horas/cotidianos-ar.json"), "utf8")) as ArchivoCotidianos;
check("cotidianos-ar.json versión 1", archivo.version === 1);
check("cotidianos-ar.json no viene del futuro", archivo.actualizadoEl <= hoy, archivo.actualizadoEl);
for (const [id, p] of Object.entries(archivo.indec)) {
  const item = itemCotidiano(id);
  check(`${id}: está en el catálogo y su serie coincide`, !!item && item.serie === p.serie, p.serie);
  check(`${id}: período AAAA-MM y lectura posterior`, /^\d{4}-\d{2}$/.test(p.periodo) && p.consultadoEl >= `${p.periodo}-01`, p);
}
if (archivo.nafta) check("nafta: mediana de al menos 8 estaciones", archivo.nafta.estaciones >= 8, archivo.nafta);

// Lo que se publica hoy
const d = datosHorasAR(hoy);
check(`al menos ${MINIMO_PUBLICADOS} ítems publicados`, d.items.length >= MINIMO_PUBLICADOS, d.items.map((i) => i.id));
for (const e of d.excluidos) console.log(`⚠️  ${e.id} fuera: ${e.motivo}`);
for (const i of d.items) {
  check(`${i.id}: fuente https oficial`, /^https:\/\/([a-z0-9-]+\.)*(gob\.ar|spotify\.com)\//.test(i.fuente.url), i.fuente.url);
  check(`${i.id}: no está vencido (vence ${i.vence})`, hoy <= i.vence);
  check(`${i.id}: fecha visible`, /\d{4}$/.test(i.fecha), i.fecha);
  const [min, max] = BANDAS[i.id];
  check(`${i.id}: precio dentro de banda ($${i.monto})`, i.monto >= min && i.monto <= max);
}
check("salario mínimo por hora vigente", !!d.minimo && d.minimo.porHora > 500 && d.minimo.porHora < 100_000, d.minimo);
// El mismo vencimiento se cumple en el futuro: dentro de un año, con estos datos, no queda nada publicado.
const lejos = `${Number(hoy.slice(0, 4)) + 1}${hoy.slice(4)}`;
check("con datos viejos, todo vence solo", datosHorasAR(lejos).items.length === 0, datosHorasAR(lejos).items.map((i) => i.id));

// Cuentas y link
const hora = valorHora(1_000_000, 5, 8)!;
check("valor hora: 1.000.000 / (5 × 8 × 4,33) = 5.773,67", Math.abs(hora - 5773.67) < 0.01, hora);
check("minutos: $11.547 a $5.773,67 la hora = 120 min", minutosDe(11_547.34, hora) === 120);
check("duración: 45 min", duracion(45).texto === "45 min");
check("duración: 2 h 10 min", duracion(130).texto === "2 h 10 min");
check("duración: 3 h", duracion(180).texto === "3 h");
check("duración: desde 100 horas sin minutos", duracion(312 * 60 + 20).texto === "312 h");
check("código: 140 minutos viajan como 150", codigoHoras("asado", 140) === "asado.150", codigoHoras("asado", 140));
check("código canónico ida y vuelta", JSON.stringify(leerCodigoHoras("asado.150")) === JSON.stringify({ id: "asado", minutos: 150, canonico: true }));
check("código no canónico: se redirige al valor de la escala", JSON.stringify(leerCodigoHoras("asado.140")) === JSON.stringify({ id: "asado", minutos: 150, canonico: false }));
for (const malo of ["asado", "asado.0", "asado.013", "asado.1.5", "inventado.10", "asado.123456789", "Asado.10", "asado.10?x=1"]) check(`código inválido: ${malo}`, leerCodigoHoras(malo) === null);
check("la frase compartida no lleva pesos", !/\$|\d{4,}/.test(fraseCompartir("un kilo de asado", 150)), fraseCompartir("un kilo de asado", 150));

// Privacidad del link (como las franjas de «Tu sueldo en el mundo»): cada valor compartido tiene que
// corresponder a un rango de valor hora de ±10 % o más (razón entre puntas ≥ 1,1 / 0,9), para cualquier
// ítem. Como valor hora = precio ÷ minutos, la razón del rango de valor hora es la del tramo de minutos.
const RANGO_MINIMO = 1.1 / 0.9;
const e = ESCALA_COMPARTIDA;
check("escala estrictamente creciente", e.every((v, i) => i === 0 || v > e[i - 1]));
check("cada valor de la escala es su propio redondeo", e.every((v) => minutosCompartidos(v) === v));
let masAngosto = { v: 0, razon: Infinity };
for (let i = 1; i < e.length - 1; i++) {
  const razon = Math.sqrt(e[i + 1] / e[i - 1]);
  if (razon < masAngosto.razon) masAngosto = { v: e[i], razon };
}
check(`cada valor compartido cubre ±10 % de valor hora (el más angosto: ${duracion(masAngosto.v).texto}, razón ${masAngosto.razon.toFixed(3)})`, masAngosto.razon >= RANGO_MINIMO);
// Y con el redondeo real: la página pasa a minutos enteros (minutosDe) antes de elegir el valor, así que
// el tramo de un valor son los minutos enteros k que caen en él, y cada k viene de minutos reales en
// [k − 0,5, k + 0,5). Como minutos = precio × 60 ÷ valor hora, la razón del rango de valor hora es la misma
// para cualquier ítem y cualquier precio: alcanza con medirla una vez por valor de la escala.
let peorEntero = { v: 0, razon: Infinity };
for (let i = 1; i < e.length - 1; i++) {
  const kmin = Math.ceil(Math.sqrt(e[i - 1] * e[i]));
  const kmax = Math.ceil(Math.sqrt(e[i] * e[i + 1])) - 1;
  const razon = (kmax + 0.5) / (kmin - 0.5);
  if (razon < peorEntero.razon) peorEntero = { v: e[i], razon };
}
check(`con minutos enteros, ningún link deja deducir el valor hora con menos de ±10 % (el más angosto: ${duracion(peorEntero.v).texto}, razón ${peorEntero.razon.toFixed(4)})`, peorEntero.razon >= RANGO_MINIMO - 1e-9);
for (const i of d.items) {
  const h = 5000;
  const v = minutosCompartidos(minutosDe(i.monto, h));
  check(`${i.id}: el link con un valor hora de $5.000 no lleva los minutos exactos`, ESCALA_COMPARTIDA.includes(v) && leerCodigoHoras(codigoHoras(i.id, v))?.canonico === true, v);
}

// La página existe donde dice la navegación
const nav = readFileSync(path.join(RAIZ, "src/data/navegacion.ts"), "utf8");
check("la página está en la navegación", nav.includes(`href: "${RUTA_HORAS_AR}"`));

console.log(fallas ? `\nFALLAS: ${fallas}` : "\nTODO OK");
process.exit(fallas ? 1 : 0);
