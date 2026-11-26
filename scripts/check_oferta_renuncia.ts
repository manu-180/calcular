// La oferta de /renuncia: que la página venda de verdad, que la venta se pueda atribuir y que la
// cifra del titular no cuente dos veces lo que la página ya da gratis.
//
// POR QUÉ (26/11/2026): /renuncia se usaba 53 veces por mes y no ofrecía ningún producto. Ahora
// ofrece el informe de liquidación final, y esa oferta cuelga de CUATRO archivos que nadie obliga
// a moverse juntos: el componente, la declaración `vende` de navegacion.ts (lo que el panel usa
// para atribuir), la exclusión de anuncios y el precio del catálogo. Si uno queda atrás, la página
// sigue andando y la plata se pierde sin un solo error.
//
// EL CHECK QUE IMPORTA, y es propio de esta página: el titular afirma lo que una renuncia NO paga,
// o sea SOLO los rubros indemnizatorios (antigüedad, preaviso e integración, con sus SAC). El
// aguinaldo proporcional y las vacaciones no gozadas los paga cualquier salida y la calculadora de
// arriba ya los muestra gratis. Si la cifra saliera de `totalGeneral` en vez de
// `totalIndemnizatorio`, el titular inflaría la diferencia con la plata que la persona ya tiene a
// la vista: una oferta que miente y que ni lint, ni typecheck, ni el build pueden ver.
// Correr con: npx tsx scripts/check_oferta_renuncia.ts

import { readFileSync } from "node:fs";
import { PAGINAS } from "../src/data/navegacion";
import { vendeAlgo } from "../src/lib/paginas-que-venden";
import { PRODUCTOS } from "../src/lib/mp";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularRenuncia } from "../src/lib/renuncia";
import { loQueLaRenunciaNoPaga } from "../src/components/informe-indemnizacion/OfertaRenuncia";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "../src/app/(ar)/informes/indemnizacion/_modelo";
import { MESES_PERIODO_PRUEBA } from "../src/data/indemnizacion";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const RUTA = "/renuncia";
const DESDE = "renuncia";
const pagina = PAGINAS.find((p) => p.href === RUTA);
const oferta = readFileSync("src/components/informe-indemnizacion/OfertaRenuncia.tsx", "utf8");
const pagSrc = readFileSync("src/app/(ar)/renuncia/page.tsx", "utf8");
const calcSrc = readFileSync("src/components/CalculadoraRenuncia.tsx", "utf8");

// ─── 1. Las cuatro piezas, enganchadas ──────────────────────────────────────

check(`${RUTA} está en la navegación`, pagina !== undefined);
check(
  `${RUTA} declara que vende el informe de liquidación final`,
  pagina?.vende === SLUG_INFORME,
  { vende: pagina?.vende, esperado: SLUG_INFORME },
);
check(`${RUTA} no sirve anuncios (compiten con el CTA)`, vendeAlgo(RUTA));
check("la calculadora monta la oferta", calcSrc.includes("<OfertaInformeRenuncia"));
check(
  "el precio sale del catálogo, no escrito a mano en la página",
  pagSrc.includes('productoPorSlug("informe-indemnizacion")?.precio'),
);
check(
  "el motor del informe no viaja en el bundle del cliente (la miniatura se arma en el servidor)",
  !calcSrc.includes("InformeIndemnizacionMiniatura") && pagSrc.includes("InformeIndemnizacionMiniatura"),
);

// ─── 2. El producto existe y se puede cobrar ─────────────────────────────────

const producto = PRODUCTOS[SLUG_INFORME];
check("el producto está en el catálogo", producto !== undefined);
check("tiene precio en pesos", producto.precio > 0 && producto.moneda === "ARS");
check(
  "el CTA apunta a la landing del catálogo",
  producto.rutaLanding === RUTA_LANDING_INFORME && oferta.includes("RUTA_LANDING_INFORME"),
  { catalogo: producto.rutaLanding, modelo: RUTA_LANDING_INFORME },
);

// ─── 3. La atribución: `desde=renuncia` tiene que sobrevivir al checkout ────

// El mismo filtro de origen() en src/components/compra/directa.ts.
const FILTRO_ORIGEN = /^[a-z0-9-]{1,40}$/i;
check(`el CTA marca ?desde=${DESDE}`, oferta.includes(`?desde=${DESDE}`));
check(
  `«${DESDE}» pasa el filtro de origen() y no se cae al referrer`,
  FILTRO_ORIGEN.test(DESDE),
);

// ─── 4. La cifra del titular ─────────────────────────────────────────────────

const SUELDO = 1_200_000;
const caso = (ingreso: string, egreso: string, sueldo = SUELDO) =>
  loQueLaRenunciaNoPaga({ sueldoMensual: sueldo, ingresoISO: ingreso, egresoISO: egreso });

// El caso testigo: cinco años y medio, salida a fin de mes (el mismo con el que arranca la
// calculadora, o sea lo que de verdad se sirve en el HTML del servidor).
const INGRESO = "2021-03-15";
const EGRESO = "2026-08-31";
const r = calcularIndemnizacion({
  ingresoISO: INGRESO,
  despidoISO: EGRESO,
  mejorRemuneracion: SUELDO,
  preavisoOtorgado: false,
});
if (!r) throw new Error("el caso testigo tiene que dar un resultado");

check(
  "la cifra es exactamente el total indemnizatorio del motor compartido",
  caso(INGRESO, EGRESO) === r.totalIndemnizatorio,
  { oferta: caso(INGRESO, EGRESO), motor: r.totalIndemnizatorio },
);

// LA MUTACIÓN QUE DUELE: con `totalGeneral` la cifra se infla con el aguinaldo proporcional y las
// vacaciones no gozadas, que la calculadora de arriba ya muestra. El titular diría que la renuncia
// no paga algo que sí paga.
check(
  "la cifra NO incluye la liquidación final (eso lo paga cualquier salida y ya está en la página)",
  r.totalIndemnizatorio === r.totalGeneral - r.totalLiquidacionFinal &&
    caso(INGRESO, EGRESO)! < r.totalGeneral,
  {
    indemnizatorio: r.totalIndemnizatorio,
    general: r.totalGeneral,
    liquidacionFinal: r.totalLiquidacionFinal,
  },
);

// Los tres rubros del art. 246 (arts. 232, 233 y 245) tienen que estar los tres: si el preaviso se
// perdiera (pasar `preavisoOtorgado: true` por confundirlo con el preaviso DEL TRABAJADOR que
// pregunta esta calculadora), la cifra bajaría dos sueldos y nada fallaría.
check(
  "la cifra incluye el preaviso del art. 232, no sólo la antigüedad",
  caso(INGRESO, EGRESO)! > r.indemnizacionAntiguedad,
  { cifra: caso(INGRESO, EGRESO), antiguedad: r.indemnizacionAntiguedad },
);
const conPreavisoOtorgado = calcularIndemnizacion({
  ingresoISO: INGRESO,
  despidoISO: EGRESO,
  mejorRemuneracion: SUELDO,
  preavisoOtorgado: true,
});
check(
  "no se confunde con el preaviso de 15 días que debe el trabajador (art. 231 inc. a)",
  caso(INGRESO, EGRESO) !== conPreavisoOtorgado!.totalIndemnizatorio,
  {
    cifra: caso(INGRESO, EGRESO),
    siSeConfundiera: conPreavisoOtorgado!.totalIndemnizatorio,
  },
);

// La premisa del titular: lo que la renuncia paga y lo que no son dos cuentas distintas, y la
// segunda es la grande. Con antigüedad larga tiene que ser varias veces la primera.
const renuncia = calcularRenuncia({
  sueldoMensual: SUELDO,
  ingresoISO: INGRESO,
  egresoISO: EGRESO,
  preaviso: true,
});
if (!renuncia) throw new Error("el caso testigo de renuncia tiene que dar un resultado");
check(
  "con antigüedad larga la cifra es bien mayor que la liquidación por renuncia",
  caso(INGRESO, EGRESO)! > renuncia.totalNetoDeDescuento,
  { cifra: caso(INGRESO, EGRESO), renuncia: renuncia.totalNetoDeDescuento },
);

// ─── 5. Los bordes donde no se afirma ninguna cifra ─────────────────────────

// Período de prueba: el art. 92 bis no indemniza la extinción, así que el extra es 0 DE VERDAD.
// «$0 es lo que la renuncia no te paga» sería absurdo; ahí va el titular sin número.
check(
  `en el período de prueba (menos de ${MESES_PERIODO_PRUEBA} meses) no se afirma ninguna cifra`,
  caso("2026-07-01", "2026-09-30") === null,
  { cifra: caso("2026-07-01", "2026-09-30") },
);
// Y el día después del período de prueba sí hay cifra: el borde está donde lo pone el artículo.
const reciénPasado = caso("2026-01-01", "2026-08-01");
check(
  `pasado el período de prueba la cifra aparece`,
  reciénPasado !== null && reciénPasado > 0,
  { cifra: reciénPasado },
);

check("sin sueldo cargado no hay cifra", caso(INGRESO, EGRESO, 0) === null);
check("con la salida anterior al ingreso no hay cifra", caso("2026-08-31", "2021-03-15") === null);
check("con fechas vacías no hay cifra", caso("", "") === null);

// Toda cifra que la oferta llegue a mostrar tiene que ser un monto positivo que se pueda poner en
// un titular, en todo el rango de sueldos y antigüedades que la página recibe.
for (const sueldo of [300_000, 1_200_000, 5_000_000]) {
  for (const [ing, egr] of [
    ["2026-07-01", "2026-09-30"],
    ["2025-01-10", "2026-08-31"],
    ["2010-05-02", "2026-11-15"],
  ] as const) {
    const c = caso(ing, egr, sueldo);
    check(
      `la cifra de ${sueldo.toLocaleString("es-AR")} entre ${ing} y ${egr} se puede poner en un titular`,
      c === null || c > 0,
      { sueldo, ing, egr, c },
    );
  }
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de la oferta de /renuncia OK");
}
