// La oferta de /desempleo: que la página venda de verdad y que la venta se pueda atribuir.
//
// POR QUÉ (13/11/2026): /desempleo se usaba 106 veces por mes y no ofrecía ningún producto. Ahora
// ofrece el informe de liquidación final por despido, y esa oferta cuelga de CUATRO archivos que
// nadie obliga a moverse juntos: el componente, la declaración `vende` de navegacion.ts (lo que el
// panel usa para atribuir), la exclusión de anuncios y el precio del catálogo. Si uno queda atrás,
// la página sigue andando y la plata se pierde sin un solo error: anuncios compitiendo con el CTA,
// o una venta que el panel no sabe de dónde vino.
//
// EL CHECK QUE IMPORTA: el `desde=desempleo` del CTA tiene que pasar el filtro de `origen()`
// (compra/directa.ts). Si no lo pasa, el checkout se cae al referrer en silencio y la venta queda
// atribuida a Google: la señal que dice qué calculadora vende se apaga sin que nada falle.
// Correr con: npx tsx scripts/check_oferta_desempleo.ts

import { readFileSync } from "node:fs";
import { PAGINAS } from "../src/data/navegacion";
import { vendeAlgo } from "../src/lib/paginas-que-venden";
import { PRODUCTOS } from "../src/lib/mp";
import { calcularDesempleo } from "../src/lib/desempleo";
import { tasaDeReemplazo } from "../src/components/informe-indemnizacion/OfertaDesempleo";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "../src/app/(ar)/informes/indemnizacion/_modelo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const RUTA = "/desempleo";
const DESDE = "desempleo";
const pagina = PAGINAS.find((p) => p.href === RUTA);
const oferta = readFileSync("src/components/informe-indemnizacion/OfertaDesempleo.tsx", "utf8");
const pagSrc = readFileSync("src/app/(ar)/desempleo/page.tsx", "utf8");
const calcSrc = readFileSync("src/components/CalculadoraDesempleo.tsx", "utf8");

// ─── 1. Las cuatro piezas, enganchadas ──────────────────────────────────────

check(`${RUTA} está en la navegación`, pagina !== undefined);
check(
  `${RUTA} declara que vende el informe de liquidación final`,
  pagina?.vende === SLUG_INFORME,
  { vende: pagina?.vende, esperado: SLUG_INFORME },
);
check(`${RUTA} no sirve anuncios (compiten con el CTA)`, vendeAlgo(RUTA));
check("la página monta la oferta", calcSrc.includes("<OfertaInformeDesempleo"));
check(
  "el precio sale del catálogo, no escrito a mano en la página",
  pagSrc.includes('productoPorSlug("informe-indemnizacion")?.precio'),
);
check(
  "el motor de la indemnización no viaja en el bundle del cliente (la miniatura se arma en el servidor)",
  !calcSrc.includes("calcularIndemnizacion") && pagSrc.includes("calcularIndemnizacion"),
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

// ─── 3. La atribución: `desde=desempleo` tiene que sobrevivir al checkout ────

// El mismo filtro de origen() en src/components/compra/directa.ts.
const FILTRO_ORIGEN = /^[a-z0-9-]{1,40}$/i;
check(`el CTA marca ?desde=${DESDE}`, oferta.includes(`?desde=${DESDE}`));
check(
  `«${DESDE}» pasa el filtro de origen() y no se cae al referrer`,
  FILTRO_ORIGEN.test(DESDE),
);

// ─── 4. La tasa de reemplazo: el número del título ───────────────────────────

// Es el único monto que la oferta afirma y no está en ninguna otra parte de la página: si se
// calculara mal, el titular mentiría sobre el sueldo de la persona.
const caso = (neto: number, mesesCotizados = 40, edad = 35) =>
  calcularDesempleo({ mejorRemuneracionNeta: neto, mesesCotizados, edad });

const alto = caso(3_000_000);
check(
  "con un sueldo alto la tasa es la primera cuota sobre el neto",
  tasaDeReemplazo(alto, 3_000_000) === Math.round((alto.cuotas[0].monto / 3_000_000) * 100),
);
check(
  "con un sueldo alto el techo la deja bien por debajo del 75 %",
  (tasaDeReemplazo(alto, 3_000_000) ?? 100) < 75,
  { tasa: tasaDeReemplazo(alto, 3_000_000), techo: alto.techo },
);

const medio = caso(400_000);
check(
  "sin topes de por medio la tasa es el 75 % de la ley",
  medio.topeInicial !== "techo" ? tasaDeReemplazo(medio, 400_000) === 75 : true,
  { topeInicial: medio.topeInicial, tasa: tasaDeReemplazo(medio, 400_000) },
);

check("sin sueldo cargado no hay tasa (no se afirma nada)", tasaDeReemplazo(caso(0), 0) === null);
check(
  "sin derecho a la prestación no hay tasa",
  tasaDeReemplazo(caso(800_000, 3), 800_000) === null,
);

// El caso que se me escapó: a quien cobraba menos que la mitad del salario mínimo, el PISO le deja
// la cuota POR ENCIMA de su sueldo (con 120.000 daba 166 %). Ahí no se afirma ninguna tasa.
const bajo = caso(120_000);
check(
  "a quien el piso le paga más que su sueldo no se le afirma una tasa",
  bajo.elegible && bajo.cuotas[0].monto > 120_000 && tasaDeReemplazo(bajo, 120_000) === null,
  { cuota: bajo.cuotas[0]?.monto, piso: bajo.piso, tasa: tasaDeReemplazo(bajo, 120_000) },
);

// Toda tasa que la oferta llegue a mostrar tiene que ser un porcentaje que se pueda leer en un
// titular: nunca 0 (no diría nada) ni 100 o más (diría algo falso).
for (const neto of [120_000, 300_000, 800_000, 1_500_000, 5_000_000]) {
  const t = tasaDeReemplazo(caso(neto), neto);
  check(`la tasa de ${neto.toLocaleString("es-AR")} se puede poner en un titular`, t === null || (t > 0 && t < 100), { neto, t });
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de la oferta de /desempleo OK");
}
