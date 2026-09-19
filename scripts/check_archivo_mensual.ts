// Verificación de los helpers de las páginas de archivo mensual (src/lib/archivo-mensual.ts):
// aritmética de variaciones/IPC/acumulados contra los datos reales de cada cluster, y los casos
// borde de navegación. Correr con: npx tsx scripts/check_archivo_mensual.ts

import {
  MESES_INDEXADOS,
  acumuladoDesdeInicio,
  breadcrumbSchema,
  compararConIpc,
  esPeriodoIndexable,
  pctConSigno,
  periodoISO,
  robotsArchivoMensual,
  variacionIpcPeriodo,
  variacionPct,
  vecinos,
} from "../src/lib/archivo-mensual";
import { IPC_SERIE } from "../src/data/ipc-serie";
import { sumarMeses } from "../src/lib/inflacion";
import { MESES_UOCRA } from "../src/data/convenios/uocra";
import { MESES_COMERCIO } from "../src/data/convenios/comercio";
import { MESES_CAMIONEROS, CAMIONEROS_BASE_MAYO } from "../src/data/convenios/camioneros";
import { CANASTA_BASICA } from "../src/data/canasta-basica";
import { MESES_CANASTA, slugDeMesCanasta } from "../src/lib/canasta-basica-meses";
import { MESES_CUOTA, slugDeMes } from "../src/lib/canasta-meses";
import sitemap from "../src/app/sitemap";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function aprox(a: number, b: number, tol = 1e-9) {
  return Math.abs(a - b) < tol;
}

// El mes que el INDEC todavía no publicó se DERIVA de la serie: hardcodearlo hace que estos
// checks se pongan rojos solos cada vez que sale un IPC nuevo (pasó el 11/9/2026 con agosto).
const ULTIMO_IPC = IPC_SERIE[IPC_SERIE.length - 1][0];
const SIN_IPC = sumarMeses(ULTIMO_IPC, 1);

// ===========================================================================
// periodoISO / pctConSigno
// ===========================================================================

check("periodoISO rellena el mes con cero", periodoISO(2026, 4) === "2026-04");
check("periodoISO no toca meses de dos dígitos", periodoISO(2026, 12) === "2026-12");

check("pctConSigno pone + explícito en positivos", pctConSigno(1.9) === "+1,9%");
check("pctConSigno no duplica el signo en negativos", pctConSigno(-0.42, 1) === "-0,4%");
check("pctConSigno usa coma decimal", pctConSigno(3.8, 2) === "+3,80%");
check("pctConSigno respeta 0 decimales", pctConSigno(5, 0) === "+5%");

// ===========================================================================
// variacionPct
// ===========================================================================

check("variacionPct: 110 vs 100 = +10%", aprox(variacionPct(110, 100)!, 10));
check("variacionPct: 90 vs 100 = -10%", aprox(variacionPct(90, 100)!, -10));
check("variacionPct: previo 0 -> null (no hay base)", variacionPct(100, 0) === null);
check("variacionPct: previo negativo -> null", variacionPct(100, -5) === null);
check("variacionPct: actual no finito -> null", variacionPct(NaN, 100) === null);

// ===========================================================================
// variacionIpcPeriodo / compararConIpc — contra la serie real del INDEC
// ===========================================================================

const iJul = IPC_SERIE.findIndex(([p]) => p === "2026-07");
const iJun = IPC_SERIE.findIndex(([p]) => p === "2026-06");
const esperadoJul = (IPC_SERIE[iJul][1] / IPC_SERIE[iJun][1] - 1) * 100;
check(
  "variacionIpcPeriodo reproduce la variación real del IPC de julio 2026",
  aprox(variacionIpcPeriodo("2026-07")!, esperadoJul, 1e-9),
);
check(
  "variacionIpcPeriodo: el primer período de la serie no tiene mes anterior -> null",
  variacionIpcPeriodo(IPC_SERIE[0][0]) === null,
);
check(
  `variacionIpcPeriodo: un período posterior al último publicado (${SIN_IPC}) -> null (no inventa)`,
  variacionIpcPeriodo(SIN_IPC) === null,
);
check(
  "variacionIpcPeriodo: un período que no existe en la serie -> null",
  variacionIpcPeriodo("1999-01") === null,
);

check(
  "compararConIpc combina ambas variaciones cuando las dos existen",
  (() => {
    const c = compararConIpc(5, "2026-07");
    return (
      c !== null &&
      aprox(c.variacionIpc, esperadoJul) &&
      aprox(c.diferenciaPuntos, 5 - esperadoJul)
    );
  })(),
);
check(
  "compararConIpc: sin variación de salario -> null",
  compararConIpc(null, "2026-07") === null,
);
check(
  `compararConIpc: sin IPC de ese período (${SIN_IPC} aún no publicado) -> null`,
  compararConIpc(5, SIN_IPC) === null,
);

// ===========================================================================
// acumuladoDesdeInicio
// ===========================================================================

const serieDemo = [100, 110, 121, 130];
check("acumuladoDesdeInicio: primer mes de la serie -> null (nada que acumular)", acumuladoDesdeInicio(serieDemo, 0) === null);
check("acumuladoDesdeInicio: índice fuera de rango -> null", acumuladoDesdeInicio(serieDemo, 99) === null);
check(
  "acumuladoDesdeInicio: acumula contra el PRIMER mes, no contra el anterior",
  aprox(acumuladoDesdeInicio(serieDemo, 2)!, 21),
);
check("acumuladoDesdeInicio: último mes de la serie", aprox(acumuladoDesdeInicio(serieDemo, 3)!, 30));

// ===========================================================================
// vecinos — casos borde de navegación
// ===========================================================================

const lista = ["a", "b", "c"];
check("vecinos: primer elemento no tiene anterior", vecinos(lista, 0).anterior === null);
check("vecinos: primer elemento sí tiene siguiente", vecinos(lista, 0).siguiente === "b");
check(
  "vecinos: elemento del medio tiene ambos",
  vecinos(lista, 1).anterior === "a" && vecinos(lista, 1).siguiente === "c",
);
check("vecinos: último elemento no tiene siguiente", vecinos(lista, 2).siguiente === null);
check("vecinos: último elemento sí tiene anterior", vecinos(lista, 2).anterior === "b");

// ===========================================================================
// breadcrumbSchema
// ===========================================================================

const bc = breadcrumbSchema([
  { name: "Convenios", url: "/convenios" },
  { name: "UOCRA", url: "/convenios/uocra" },
  { name: "Junio 2026", url: "/convenios/uocra/junio-2026" },
]);
check("breadcrumbSchema: tipo BreadcrumbList", bc["@type"] === "BreadcrumbList");
check("breadcrumbSchema: posiciones 1..N en orden", bc.itemListElement.every((it, i) => it.position === i + 1));
check(
  "breadcrumbSchema: cada item resuelve a URL absoluta",
  bc.itemListElement.every((it) => it.item.startsWith("https://calcular.ar")),
);
check(
  "breadcrumbSchema: no duplica el dominio si ya viene absoluta",
  breadcrumbSchema([{ name: "Inicio", url: "https://calcular.ar" }]).itemListElement[0].item ===
    "https://calcular.ar",
);

// ===========================================================================
// Consistencia contra los datos REALES de cada cluster: la variación calculada tiene que
// coincidir con la diferencia real entre los datos de dos meses consecutivos (no un valor
// hardcodeado aparte que un día se desincroniza de la fuente).
// ===========================================================================

// UOCRA — jornal de Oficial en Zona A, mes a mes.
{
  const serie = MESES_UOCRA.map((m) => m.jornales["oficial"]["a"]);
  for (let i = 1; i < serie.length; i++) {
    const manual = (serie[i] / serie[i - 1] - 1) * 100;
    check(
      `uocra ${MESES_UOCRA[i].id}: variación de Oficial/Zona A coincide con la diferencia real de los datos`,
      aprox(variacionPct(serie[i], serie[i - 1])!, manual, 1e-9),
    );
  }
  check(
    "uocra: acumuladoDesdeInicio del último mes coincide con la razón directa último/primero",
    aprox(
      acumuladoDesdeInicio(serie, serie.length - 1)!,
      (serie[serie.length - 1] / serie[0] - 1) * 100,
    ),
  );
  // Los meses del convenio que van por delante del IPC no pueden mostrar comparación: la
  // página tiene que apagarla sola, no inventar un número. Cuáles son se deriva de la serie.
  const idxAdelantados = MESES_UOCRA.map((m, i) => ({ m, i })).filter(
    ({ m }) => periodoISO(m.anio, m.mes) > ULTIMO_IPC && m.mes !== undefined,
  );
  for (const { m, i } of idxAdelantados) {
    if (i === 0) continue;
    check(
      `uocra: ${m.id} va por delante del IPC publicado (${ULTIMO_IPC}) -> sin comparación`,
      compararConIpc(variacionPct(serie[i], serie[i - 1]), periodoISO(m.anio, m.mes)) === null,
    );
  }
  check(
    `uocra: todos los meses hasta ${ULTIMO_IPC} tienen su comparación contra IPC`,
    MESES_UOCRA.every(
      (m, i) =>
        i === 0 ||
        periodoISO(m.anio, m.mes) > ULTIMO_IPC ||
        compararConIpc(variacionPct(serie[i], serie[i - 1]), periodoISO(m.anio, m.mes)) !== null,
    ),
  );
}

// Comercio — total remunerado + no remunerativo de Maestranza A (el número que le importa al bolsillo).
{
  const serie = MESES_COMERCIO.map((m) => m.basicos["maestranza-a"] + m.noRemunerativo);
  for (let i = 1; i < serie.length; i++) {
    const manual = (serie[i] / serie[i - 1] - 1) * 100;
    check(
      `comercio ${MESES_COMERCIO[i].id}: variación del total Maestranza A coincide con la diferencia real de los datos`,
      aprox(variacionPct(serie[i], serie[i - 1])!, manual, 1e-9),
    );
  }
  // Diciembre 2026: la circular dice textual que el TOTAL no cambia (solo se recompone básico
  // vs. no remunerativo). Si esto alguna vez deja de dar 0, la página no puede seguir diciendo
  // "no cambió el total" — por eso queda comprobado acá, no solo afirmado en el texto.
  const idxNov = MESES_COMERCIO.findIndex((m) => m.id === "noviembre-2026");
  const idxDic = MESES_COMERCIO.findIndex((m) => m.id === "diciembre-2026");
  check(
    "comercio: el total de diciembre 2026 es igual al de noviembre (cambia la composición, no el monto)",
    aprox(serie[idxDic], serie[idxNov], 0.01),
  );
}

// Camioneros — básico de Chofer de Primera, mes a mes.
{
  const serie = MESES_CAMIONEROS.map(
    (m) => CAMIONEROS_BASE_MAYO["chofer-primera"] * m.factorDesdeMayo,
  );
  for (let i = 1; i < serie.length; i++) {
    const manual = (serie[i] / serie[i - 1] - 1) * 100;
    check(
      `camioneros ${MESES_CAMIONEROS[i].id}: variación de Chofer de Primera coincide con la diferencia real de los datos`,
      aprox(variacionPct(serie[i], serie[i - 1])!, manual, 1e-9),
    );
  }
}

// Canasta básica — CBT, mes a mes (serie completa, no solo las que tienen página propia).
{
  for (let i = 1; i < MESES_CANASTA.length; i++) {
    const mes = MESES_CANASTA[i];
    const iReal = CANASTA_BASICA.findIndex((m) => m.periodo === mes.periodo);
    const previo = CANASTA_BASICA[iReal - 1];
    const manual = (mes.cbt / previo.cbt - 1) * 100;
    check(
      `canasta ${mes.periodo}: variación de CBT coincide con la diferencia real de los datos`,
      aprox(variacionPct(mes.cbt, previo.cbt)!, manual, 1e-9),
    );
  }
}

// ===========================================================================
// Navegación real: cada mes de archivo tiene anterior/siguiente coherentes o null en las puntas.
// ===========================================================================

function checkNavegacion(nombre: string, lista: readonly { id: string }[]) {
  check(`${nombre}: el primer mes no tiene anterior`, vecinos(lista, 0).anterior === null);
  check(
    `${nombre}: el último mes no tiene siguiente`,
    vecinos(lista, lista.length - 1).siguiente === null,
  );
  check(
    `${nombre}: todos los meses intermedios tienen anterior Y siguiente`,
    lista.slice(1, -1).every((_, i) => {
      const v = vecinos(lista, i + 1);
      return v.anterior !== null && v.siguiente !== null;
    }),
  );
}
checkNavegacion("uocra", MESES_UOCRA);
checkNavegacion("comercio", MESES_COMERCIO);
checkNavegacion("camioneros", MESES_CAMIONEROS);

// ===========================================================================
// temporalCoverage: el ISO derivado de mes/año de CADA mes real es válido (YYYY-MM).
// ===========================================================================

function checkPeriodoISO(nombre: string, lista: readonly { anio: number; mes: number }[]) {
  check(
    `${nombre}: periodoISO de todos los meses tiene forma YYYY-MM`,
    lista.every((m) => /^\d{4}-\d{2}$/.test(periodoISO(m.anio, m.mes))),
  );
}
checkPeriodoISO("uocra", MESES_UOCRA);
checkPeriodoISO("comercio", MESES_COMERCIO);
checkPeriodoISO("camioneros", MESES_CAMIONEROS);

// ===========================================================================
// Ventana de indexación: el sitemap y el `robots` de la página salen del mismo
// criterio, así que no pueden contradecirse. Este bloque es el gate: sin él,
// alguien filtra una lista y se olvida de la otra, y el sitio queda ofreciéndole
// a Google una URL que él mismo marca `noindex` (o al revés, indexando la cola
// duplicada que motivó la ventana). Ver el porqué en src/lib/archivo-mensual.ts.
// ===========================================================================

const periodosCanasta = MESES_CANASTA.map((m) => m.periodo);
const periodosCuota = MESES_CUOTA.map((m) => m.periodo);

for (const [nombre, periodos] of [
  ["canasta", periodosCanasta],
  ["cuota", periodosCuota],
] as const) {
  const indexables = periodos.filter((p) => esPeriodoIndexable(p, periodos));
  check(
    `${nombre}: la ventana indexa exactamente los últimos ${MESES_INDEXADOS} períodos`,
    indexables.length === Math.min(MESES_INDEXADOS, periodos.length),
    { total: periodos.length, indexables: indexables.length },
  );
  const ultimo = [...periodos].sort().at(-1)!;
  check(`${nombre}: el período más reciente SIEMPRE es indexable`, esPeriodoIndexable(ultimo, periodos), ultimo);
  check(
    `${nombre}: fuera de la ventana el robots es noindex,follow (no noindex,nofollow)`,
    periodos.length <= MESES_INDEXADOS ||
      JSON.stringify(robotsArchivoMensual([...periodos].sort()[0], periodos)) ===
        JSON.stringify({ index: false, follow: true }),
  );
}

const urlsSitemap = new Set(sitemap().map((e) => e.url));
for (const [nombre, periodos, ruta, slug] of [
  ["canasta", periodosCanasta, "canasta-basica", (p: string) => slugDeMesCanasta(MESES_CANASTA.find((m) => m.periodo === p)!)],
  ["cuota", periodosCuota, "cuota-alimentaria", (p: string) => slugDeMes(MESES_CUOTA.find((m) => m.periodo === p)!)],
] as const) {
  const enSitemap = (p: string) => urlsSitemap.has(`https://calcular.ar/${ruta}/${slug(p)}`);
  check(
    `${nombre}: TODO período indexable está en el sitemap`,
    periodos.filter((p) => esPeriodoIndexable(p, periodos)).every(enSitemap),
    periodos.filter((p) => esPeriodoIndexable(p, periodos)).filter((p) => !enSitemap(p)),
  );
  check(
    `${nombre}: NINGÚN período noindex está en el sitemap`,
    periodos.filter((p) => !esPeriodoIndexable(p, periodos)).every((p) => !enSitemap(p)),
    periodos.filter((p) => !esPeriodoIndexable(p, periodos)).filter(enSitemap),
  );
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de archivo mensual OK");
}
