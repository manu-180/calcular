// La oferta de /ganancias-jubilados: que la página venda de verdad y que la venta se pueda atribuir.
//
// POR QUÉ (14/11/2026): /ganancias-jubilados se usaba 56 veces por mes y no ofrecía ningún
// producto. Ahora ofrece la Planilla de Ganancias para jubilados, y esa oferta cuelga de cuatro
// archivos que nadie obliga a moverse juntos: el componente de la calculadora, la declaración
// `vende` de navegacion.ts (lo que el panel usa para atribuir), la exclusión de anuncios y el
// precio del catálogo. Si uno queda atrás, la página sigue andando y la plata se pierde sin un
// solo error: anuncios compitiendo con el CTA, o una venta que el panel no sabe de dónde vino.
//
// LOS DOS CHECKS QUE IMPORTAN:
//   · el `desde=cta-ganancias-jubilados` del CTA tiene que pasar el filtro de `origen()`
//     (compra/directa.ts). Si no lo pasa, el checkout se cae al referrer en silencio y la venta
//     queda atribuida a Google.
//   · los números de fila de la vista previa están duplicados del generador (scripts/ no se puede
//     importar desde src/): si el generador mueve una fila, la previa muestra una fila que no es
//     la que se abre en Excel.
//
// Correr con: npx tsx scripts/check_oferta_ganancias_jubilados.ts

import { readFileSync } from "node:fs";
import { PAGINAS } from "../src/data/navegacion";
import { vendeAlgo } from "../src/lib/paginas-que-venden";
import { PRODUCTOS } from "../src/lib/mp";
import { calcularGananciasJubilados } from "../src/lib/ganancias-jubilados";
import { casoDeLanding, previaJubilados, FILAS_JUBILADOS, PESTANAS_JUBILADOS, HOJA_PREVIA } from "../src/components/ganancias-jubilados/previa";
import { CELDAS_JUB, HOJAS_JUB } from "./gen_planilla_ganancias_jubilados";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const RUTA = "/ganancias-jubilados";
const DESDE = "cta-ganancias-jubilados";
const SLUG = "planilla-ganancias-jubilados";
const pagina = PAGINAS.find((p) => p.href === RUTA);
const pagSrc = readFileSync("src/app/(ar)/ganancias-jubilados/page.tsx", "utf8");
const calcSrc = readFileSync("src/components/CalculadoraGananciasJubilados.tsx", "utf8");
const landingSrc = readFileSync("src/app/(ar)/planillas/ganancias-jubilados/page.tsx", "utf8");

// ─── 1. Las cuatro piezas, enganchadas ──────────────────────────────────────

check(`${RUTA} está en la navegación`, pagina !== undefined);
check(`${RUTA} declara que vende la planilla`, pagina?.vende === SLUG, { vende: pagina?.vende, esperado: SLUG });
check(`${RUTA} no sirve anuncios (compiten con el CTA)`, vendeAlgo(RUTA));
check("la página le pasa la oferta a la calculadora", pagSrc.includes(`datosOferta("${SLUG}")`));
check("la calculadora monta la oferta de planilla", calcSrc.includes("<OfertaPlanilla"));
check("la landing existe y nombra el producto del catálogo", landingSrc.includes(`PRODUCTOS["${SLUG}"]`));
check(
  "el precio de la landing sale del catálogo, no escrito a mano",
  landingSrc.includes("PRODUCTO.precio.toLocaleString"),
);
check(
  `la planilla está en el grupo de planillas de la navegación`,
  PAGINAS.some((p) => p.href === PRODUCTOS[SLUG].rutaLanding && p.vende === SLUG),
);

// ─── 2. El producto existe y se puede cobrar ─────────────────────────────────

const producto = PRODUCTOS[SLUG];
check("el producto está en el catálogo", producto !== undefined);
check("tiene precio en pesos y se entrega como archivo", producto.precio > 0 && producto.moneda === "ARS" && producto.entrega === "xlsx");
check("el CTA apunta a la landing del catálogo", producto.rutaLanding === "/planillas/ganancias-jubilados", producto.rutaLanding);

// ─── 3. La atribución: `desde` tiene que sobrevivir al checkout ──────────────

// El mismo filtro de origen() en src/components/compra/directa.ts.
const FILTRO_ORIGEN = /^[a-z0-9-]{1,40}$/i;
check(`el CTA marca ?desde=${DESDE}`, calcSrc.includes(`desde="${DESDE}"`));
check(`«${DESDE}» pasa el filtro de origen() y no se cae al referrer`, FILTRO_ORIGEN.test(DESDE));

// ─── 4. La previa muestra las filas que de verdad tiene el archivo ───────────

const equivalencias: [keyof typeof FILAS_JUBILADOS, keyof typeof CELDAS_JUB][] = [
  ["regimen", "regimen"],
  ["conyuge", "conyuge"],
  ["hijos", "hijos"],
  ["especifica", "especificaAnual"],
  ["cargas", "cargasFamilia"],
  ["cualRige", "cualRige"],
  ["bruto", "brutoAnual"],
  ["aporte", "aportesAnual"],
  ["gni", "gniAnual"],
  ["impuesto", "impuestoAnual"],
  ["segunRecibos", "segunRecibos"],
  ["segunPlanilla", "segunPlanilla"],
  ["diferencia", "diferencia"],
];
const corridas = equivalencias.filter(([enPrevia, enGenerador]) => {
  const fila = Number(CELDAS_JUB[enGenerador].replace(/^[A-Z]+/, ""));
  return FILAS_JUBILADOS[enPrevia] !== fila;
});
check("cada fila de la previa es la fila del archivo", corridas.length === 0, corridas);
check(
  "la pestaña de la previa es una hoja del archivo",
  (Object.values(HOJAS_JUB) as string[]).includes(HOJA_PREVIA),
  HOJA_PREVIA,
);
check(
  "las pestañas de la previa son las hojas del archivo, en orden",
  JSON.stringify([...PESTANAS_JUBILADOS]) === JSON.stringify([...Object.values(HOJAS_JUB), "Fuentes"]),
  { previa: PESTANAS_JUBILADOS, archivo: [...Object.values(HOJAS_JUB), "Fuentes"] },
);

// ─── 5. A quien no paga Ganancias no se le ofrece la planilla ────────────────

const UMBRAL = calcularGananciasJubilados({ haberBruto: 1 }).umbralHaber;
check(
  "con un haber por debajo del umbral no hay oferta",
  previaJubilados("x.xlsx", { haberMensual: Math.floor(UMBRAL * 0.9) }) === null,
);
check("con haber cero no hay oferta", previaJubilados("x.xlsx", { haberMensual: 0 }) === null);
check(
  "con el haber mínimo garantizado no hay oferta",
  previaJubilados("x.xlsx", { haberMensual: 400_000 }) === null,
);
const arriba = previaJubilados("x.xlsx", { haberMensual: Math.ceil(UMBRAL * 1.2) });
check("con un haber que paga Ganancias sí hay oferta", arriba !== null);
check("la oferta no afirma un impuesto de cero", (arriba?.resultado.impuestoAnual ?? 0) > 0);

// ─── 6. Los números de la previa son los del motor ──────────────────────────

const caso = casoDeLanding(UMBRAL);
const previa = previaJubilados("x.xlsx", caso)!;
const fila = (f: keyof typeof FILAS_JUBILADOS) => previa.hoja.filas.find((x) => x.fila === FILAS_JUBILADOS[f])?.valor;
check("la previa muestra el impuesto del año del motor", fila("impuesto") === previa.resultado.impuestoAnual, {
  previa: fila("impuesto"),
  motor: previa.resultado.impuestoAnual,
});
check("la previa muestra los haberes brutos del motor", fila("bruto") === previa.resultado.brutoAnual);
check("la previa muestra el aporte de obra social del motor", fila("aporte") === previa.resultado.aportesAnual);
check(
  "el mes más alto de la previa es el más alto de verdad",
  previa.resultado.filas.every((f) => f.retencionMes <= previa.mesMasAlto.monto + 0.005),
);
check(
  "el primer mes de la previa es la retención de enero",
  previa.primerMes === previa.resultado.filas[0].retencionMes,
);
check(
  "el mes más alto no es el promedio del año (es lo que la oferta afirma)",
  previa.mesMasAlto.monto > previa.resultado.impuestoAnual / 12,
  { masAlto: previa.mesMasAlto, promedio: previa.resultado.impuestoAnual / 12 },
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de la oferta de /ganancias-jubilados OK");
}
