// La oferta de /despido-de-delegado-gremial: que la página venda de verdad y que la venta se pueda
// atribuir.
//
// POR QUÉ (14/11/2026): /despido-de-delegado-gremial se usaba 56 veces por mes y no ofrecía ningún
// producto. Ahora ofrece el informe de liquidación final por despido, y esa oferta cuelga de CUATRO
// archivos que nadie obliga a moverse juntos: el componente, la declaración `vende` de
// navegacion.ts (lo que el panel usa para atribuir), la exclusión de anuncios y el precio del
// catálogo. Si uno queda atrás, la página sigue andando y la plata se pierde sin un solo error:
// anuncios compitiendo con el CTA, o una venta que el panel no sabe de dónde vino.
//
// EL CHECK QUE IMPORTA: el `desde=delegado-gremial` del CTA tiene que pasar el filtro de `origen()`
// (compra/directa.ts). Si no lo pasa, el checkout se cae al referrer en silencio y la venta queda
// atribuida a Google: la señal que dice qué calculadora vende se apaga sin que nada falle.
//
// EL SEGUNDO QUE IMPORTA: el titular afirma qué parte del total NO depende de un juez, y eso sale
// de lo que la persona cargó. Los dos bordes dan un porcentaje que miente (100% sin agravamiento,
// 0% con un mandato larguísimo por delante), así que se prueban los dos.
// Correr con: npx tsx scripts/check_oferta_delegado_gremial.ts

import { readFileSync } from "node:fs";
import { PAGINAS } from "../src/data/navegacion";
import { vendeAlgo } from "../src/lib/paginas-que-venden";
import { PRODUCTOS } from "../src/lib/mp";
import { calcularTutelaSindical, type EntradaTutela } from "../src/lib/tutela-sindical";
import { parteSinJuicio } from "../src/components/informe-indemnizacion/OfertaDelegadoGremial";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "../src/app/(ar)/informes/indemnizacion/_modelo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const RUTA = "/despido-de-delegado-gremial";
const DESDE = "delegado-gremial";
const pagina = PAGINAS.find((p) => p.href === RUTA);
const oferta = readFileSync("src/components/informe-indemnizacion/OfertaDelegadoGremial.tsx", "utf8");
const pagSrc = readFileSync("src/app/(ar)/despido-de-delegado-gremial/page.tsx", "utf8");
const calcSrc = readFileSync("src/components/CalculadoraTutelaSindical.tsx", "utf8");

// ─── 1. Las cuatro piezas, enganchadas ──────────────────────────────────────

check(`${RUTA} está en la navegación`, pagina !== undefined);
check(
  `${RUTA} declara que vende el informe de liquidación final`,
  pagina?.vende === SLUG_INFORME,
  { vende: pagina?.vende, esperado: SLUG_INFORME },
);
check(`${RUTA} no sirve anuncios (compiten con el CTA)`, vendeAlgo(RUTA));
check("la calculadora monta la oferta", calcSrc.includes("<OfertaInformeDelegadoGremial"));
check(
  "el precio sale del catálogo, no escrito a mano en la página",
  pagSrc.includes('productoPorSlug("informe-indemnizacion")?.precio'),
);
check(
  "el motor de la indemnización no viaja en el bundle del cliente (la miniatura se arma en el servidor)",
  !calcSrc.includes("calcularIndemnizacion") && pagSrc.includes("calcularIndemnizacion"),
);
check(
  "sin precio del catálogo la oferta no se muestra (nunca un precio distinto al que cobra MP)",
  calcSrc.includes("precioInforme !== undefined"),
);

// La oferta NO espera a que la persona cargue sueldo y fechas: si esperara, quien no completa el
// formulario (la mayoría de las visitas) no se enteraría de que hay algo a la venta, y el marcador
// `data-oferta` no estaría en el HTML del server que mira el smoke de post-deploy.
check(
  "la oferta se pinta sin resultado (acepta res null)",
  oferta.includes("res: ResultadoTutela | null") && oferta.includes("res ? parteSinJuicio(res) : null"),
);
check(
  "la calculadora no condiciona la oferta a tener resultado",
  !calcSrc.includes("{res && precioInforme"),
);

// El smoke de post-deploy es la única forma de comprobar la oferta EN PRODUCCIÓN: la política de
// red del contenedor de una sesión de Kairo no llega a calcular.ar.
check(
  "el smoke de post-deploy vigila la oferta en producción",
  readFileSync("scripts/datos-vivos/smoke.ts", "utf8").includes(`{ ruta: "${RUTA}", debeContener:`),
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

// ─── 3. La atribución: `desde=delegado-gremial` tiene que sobrevivir al checkout ──

// El mismo filtro de origen() en src/components/compra/directa.ts.
const FILTRO_ORIGEN = /^[a-z0-9-]{1,40}$/i;
check(`el CTA marca ?desde=${DESDE}`, oferta.includes(`?desde=${DESDE}`));
check(
  `«${DESDE}» pasa el filtro de origen() y no se cae al referrer`,
  FILTRO_ORIGEN.test(DESDE),
);

// ─── 4. Lo que el informe NO trae, dicho en la oferta ────────────────────────

// El informe abre la liquidación común; el agravamiento del art. 52 se reclama en juicio y no entra.
// Prometerlo sería venderle a un delegado algo que el producto no hace.
check(
  "la oferta aclara que el art. 52 no entra en el informe",
  oferta.includes("el extra del art. 52 no") && oferta.includes("abogado"),
);

// ─── 5. La parte sin juicio: el número del título ───────────────────────────

const CASO: EntradaTutela = {
  ingresoISO: "2019-03-04",
  despidoISO: "2026-09-12",
  mejorRemuneracion: 1_450_000,
  preavisoOtorgado: false,
  rol: "titular",
  finMandatoISO: "2027-09-12",
};
const caso = (e: Partial<EntradaTutela>) => calcularTutelaSindical({ ...CASO, ...e })!;

const titular = caso({});
check("el caso base da resultado", titular !== null && titular.cuantificado);
check(
  "con un mandato de un año por delante la parte sin juicio es un porcentaje usable",
  (() => {
    const p = parteSinJuicio(titular);
    return p !== null && p > 0 && p < 100;
  })(),
  { parte: parteSinJuicio(titular) },
);
check(
  "la parte sin juicio es la liquidación común sobre el total a reclamar",
  parteSinJuicio(titular) ===
    Math.round((titular.base.totalGeneral / titular.totalConArt52) * 100),
);

// Borde de arriba: sin agravamiento del art. 52 la liquidación común ES el total. Un «100% no
// depende de un juez» no dice nada, así que no se afirma ninguna cifra.
for (const rol of ["suplente", "congresal"] as const) {
  const r = caso({ rol });
  check(`a un ${rol} no se le afirma una parte (el art. 52 no le suma)`, r.agravamientoArt52 === 0 && parteSinJuicio(r) === null, {
    agravamiento: r.agravamientoArt52,
    parte: parteSinJuicio(r),
  });
}
const bajoPiso = caso({ rol: "candidato-no-electo", postulacionISO: "2026-06-01", porcentajeVotos: 3 });
check(
  "al candidato que no llegó al 5% tampoco (no hay tutela que violar)",
  bajoPiso.agravamientoArt52 === 0 && parteSinJuicio(bajoPiso) === null,
  { parte: parteSinJuicio(bajoPiso) },
);

// Borde de abajo: cuanto más mandato falta, más chica es la parte sin juicio. Un mandato de 30 años
// por delante todavía da 3% (medido: 3,04), y un 3% se puede leer en un titular. El 0 aparece recién
// con ~193 años de mandato, que nadie tiene pero el campo de fecha acepta escribir: ahí «el 0% no
// depende de un juez» sería falso, porque la liquidación común existe igual.
const mandato30 = caso({ finMandatoISO: "2056-09-12" });
check(
  "con 30 años de mandato por delante la parte es chica pero se sigue afirmando",
  parteSinJuicio(mandato30) === 3,
  { parte: parteSinJuicio(mandato30), crudo: (mandato30.base.totalGeneral / mandato30.totalConArt52) * 100 },
);
const mandatoAbsurdo = caso({ finMandatoISO: "2219-09-12" });
check(
  "con una fecha de mandato absurda la proporción redondea a 0 y no se afirma nada",
  Math.round((mandatoAbsurdo.base.totalGeneral / mandatoAbsurdo.totalConArt52) * 100) === 0 &&
    parteSinJuicio(mandatoAbsurdo) === null,
  {
    crudo: (mandatoAbsurdo.base.totalGeneral / mandatoAbsurdo.totalConArt52) * 100,
    parte: parteSinJuicio(mandatoAbsurdo),
  },
);

// Sin sueldo o sin fechas no hay resultado, así que la oferta no se monta: acá sólo se cubre el
// caso en que el motor devuelve totales en cero (período de prueba sin nada que liquidar).
const enPrueba = caso({ ingresoISO: "2026-08-01", despidoISO: "2026-09-12", finMandatoISO: "2027-09-12" });
check(
  "en período de prueba la parte sigue siendo un porcentaje usable o null, nunca 0 ni 100",
  (() => {
    const p = parteSinJuicio(enPrueba);
    return p === null || (p > 0 && p < 100);
  })(),
  { parte: parteSinJuicio(enPrueba), total: enPrueba.totalConArt52 },
);

// Toda parte que la oferta llegue a mostrar tiene que ser un porcentaje que se pueda leer en un
// titular: nunca 0 (no diría nada) ni 100 o más (diría algo falso).
for (const sueldo of [120_000, 800_000, 1_450_000, 5_000_000, 20_000_000]) {
  for (const fin of ["2026-10-12", "2027-03-12", "2029-09-12"]) {
    const r = caso({ mejorRemuneracion: sueldo, finMandatoISO: fin });
    const p = parteSinJuicio(r);
    check(
      `la parte de ${sueldo.toLocaleString("es-AR")} con mandato hasta ${fin} se puede poner en un titular`,
      p === null || (p > 0 && p < 100),
      { sueldo, fin, p },
    );
  }
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de la oferta de /despido-de-delegado-gremial OK");
}
