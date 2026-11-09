// Verificación del costo de ISR: los plazos de regeneración y la purga diaria fina.
// Correr con: npx tsx scripts/check_costo_isr.ts
//
// Por qué existe: cada regeneración por `revalidate` es una escritura ISR que Vercel cobra, cambie o
// no el HTML. El 9/11/2026 el árbol intl pasó de 24 h a 3 días porque sólo 0,04 %-0,43 % de sus
// páginas cambian de un día al otro, y la frescura la da /api/cron/dia-nuevo. Si alguien baja el plazo
// de vuelta, saca el cron o rompe el selector, la factura lo cuenta un mes después: esto lo cuenta ya.

import "./sin-server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { registro } from "../src/paises";
import { mercadoCambio, mercadosQueCambiaron, rutasDelMercado } from "../src/motor/purga";
import type { FechaISO } from "../src/motor/tipos";

const RAIZ = path.resolve(import.meta.dirname, "..");
const MODO = "produccion" as const;

// 3 días: la red por si /api/cron/dia-nuevo falla. No subirlo sin mirar qué pierde de frescura una
// página que el selector no detecte, y no bajarlo sin mirar la factura (docs/decisiones/costo-vercel.md).
const LARGO = 259200;
const DIARIO = 86400;

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function revalidateDe(rel: string): number | null {
  const m = /export const revalidate = (\d+)/.exec(readFileSync(path.join(RAIZ, rel), "utf8"));
  return m ? Number(m[1]) : null;
}

// --- 1. Los plazos, archivo por archivo -------------------------------------------------------
// El grueso de las 10.353 páginas: lo que no cambia de un día al otro.
const LARGAS = [
  "src/app/(intl)/intl/[mercado]/layout.tsx",
  "src/app/(intl)/intl/[mercado]/[slug]/page.tsx",
  "src/app/(intl)/intl/[mercado]/embed/page.tsx",
  "src/app/(intl)/intl/[mercado]/informes/[informe]/page.tsx",
  "src/app/(intl)/intl/[mercado]/novedades/page.tsx",
  "src/app/(intl)/intl/[mercado]/novedades.xml/route.ts",
  "src/app/(intl)/intl/[mercado]/page.tsx",
  "src/app/(intl)/intl/[mercado]/planillas/[producto]/page.tsx",
  "src/app/(intl)/intl/[mercado]/planillas/page.tsx",
  "src/app/(embed)/embebido/[mercado]/[slug]/page.tsx",
  "src/app/(embed)/embebido/[mercado]/layout.tsx",
];

// Éstas sí imprimen el día (días hasta un evento, la grilla del país, la foto de sueldos): se quedan
// en 24 h, que gana por ser el menor entre layout y página.
const DIARIAS = [
  "src/app/(intl)/intl/[mercado]/i/calendario/[seccion]/page.tsx",
  "src/app/(intl)/intl/[mercado]/i/calendario/[seccion]/calendario.ics/route.ts",
  "src/app/(intl)/intl/[mercado]/i/calendario/[seccion]/evento/[archivo]/route.ts",
  "src/app/(intl)/intl/[mercado]/i/calendario/[seccion]/og/route.tsx",
  "src/app/(intl)/intl/[mercado]/i/horas/[seccion]/[[...p]]/page.tsx",
  "src/app/(intl)/intl/[mercado]/i/mundo/[seccion]/[[...c]]/page.tsx",
  "src/app/(intl)/intl/[mercado]/i/rankings/[seccion]/page.tsx",
  "src/app/(intl)/intl/[mercado]/i/rankings/[seccion]/[ranking]/page.tsx",
  "src/app/(intl)/intl/[mercado]/i/sueldos/[seccion]/[[...resto]]/page.tsx",
];

for (const rel of LARGAS) check(`${rel} en ${LARGO}`, revalidateDe(rel) === LARGO, revalidateDe(rel));
for (const rel of DIARIAS) check(`${rel} en ${DIARIO}`, revalidateDe(rel) === DIARIO, revalidateDe(rel));

// (ar) son ~170 páginas y su layout publica el meta calcular-hoy que usan las calculadoras del
// cliente: ahí 24 h cuesta centavos y bajar la frescura sí se nota. No entra en este ahorro.
check("el layout de (ar) sigue en 86400", revalidateDe("src/app/(ar)/layout.tsx") === DIARIO, revalidateDe("src/app/(ar)/layout.tsx"));

// Next toma el MENOR entre layout y página: si el layout quedara por debajo, el plazo largo de las
// hojas no existiría y el ahorro sería imaginario.
const layoutIntl = revalidateDe("src/app/(intl)/intl/[mercado]/layout.tsx") ?? 0;
for (const rel of LARGAS.filter((r) => r.endsWith("page.tsx") || r.endsWith("route.ts"))) {
  const v = revalidateDe(rel) ?? 0;
  check(`el layout intl no achica ${rel}`, layoutIntl >= v, { layoutIntl, pagina: v });
}

// --- 2. El cron está enchufado ----------------------------------------------------------------
const vercelJson = JSON.parse(readFileSync(path.join(RAIZ, "vercel.json"), "utf8")) as {
  crons?: { path: string; schedule: string }[];
};
const cron = (vercelJson.crons ?? []).find((c) => c.path === "/api/cron/dia-nuevo");
check("vercel.json corre /api/cron/dia-nuevo", Boolean(cron), vercelJson.crons);
check("y lo corre todos los días", Boolean(cron && /^\d+ \d+ \* \* \*$/.test(cron.schedule)), cron?.schedule);
check(
  "sigue el cron del día 1 (mes-nuevo)",
  (vercelJson.crons ?? []).some((c) => c.path === "/api/cron/mes-nuevo"),
);

// --- 3. El selector discrimina ----------------------------------------------------------------
// Una puerta que siempre dice "no cambió nada" ahorraría todo y serviría páginas viejas; una que
// siempre dice "cambió todo" no ahorraría nada. Las dos pasan un test que sólo mira que corra.
const mercados = registro.mercados(MODO);
check("hay mercados intl para medir", mercados.length > 100, mercados.length);

const PARES: [FechaISO, FechaISO][] = [
  ["2026-11-08" as FechaISO, "2026-11-09" as FechaISO],
  ["2026-11-20" as FechaISO, "2026-11-21" as FechaISO],
  ["2026-11-30" as FechaISO, "2026-12-01" as FechaISO],
];
for (const [desde, hasta] of PARES) {
  const cambiaron = mercados.filter((m) => mercadoCambio(registro, m, desde, hasta, MODO));
  // El techo es lo que hace que el ahorro exista: si un día cambia medio sitio, el plazo largo no
  // compra nada y hay que volver a medir en vez de dejarlo pasar.
  check(`${desde}->${hasta}: cambian pocos mercados`, cambiaron.length <= mercados.length / 3, {
    cambiaron: cambiaron.length,
    de: mercados.length,
  });
}

// Mismo día contra sí mismo: no puede cambiar nada. Si esto da cambios, el selector mira algo que no
// es la fecha (el reloj, un Math.random, un orden inestable) y purgaría todo todos los días.
const quieto = mercados.filter((m) => mercadoCambio(registro, m, "2026-11-20" as FechaISO, "2026-11-20" as FechaISO, MODO));
check("un día contra sí mismo no cambia nada", quieto.length === 0, quieto.map((m) => m.codigo));

// Y al revés: a un mes de distancia TIENE que encontrar cambios. Si no, el selector está ciego y la
// purga diaria no purgaría nunca (el síntoma sería páginas viejas, no una factura alta).
const lejos = mercados.filter((m) => mercadoCambio(registro, m, "2026-11-09" as FechaISO, "2026-12-09" as FechaISO, MODO));
check("a un mes de distancia encuentra cambios", lejos.length > 0, lejos.length);

// --- 4. Las rutas que purga -------------------------------------------------------------------
// El sitio y la calculadora embebida son dos árboles distintos: purgar sólo uno deja al otro viejo.
check("purga el árbol del sitio y el del embebido", JSON.stringify(rutasDelMercado("cl")) === JSON.stringify(["/intl/cl", "/embebido/cl"]), rutasDelMercado("cl"));

// Corrible de punta a punta con la fecha de hoy, que es como corre en producción.
const hoy = mercadosQueCambiaron(registro, MODO);
check("mercadosQueCambiaron corre con la fecha de hoy", Array.isArray(hoy) && hoy.length <= mercados.length, hoy.length);

console.log(fallas === 0 ? `\n✅ costo ISR: todo verde` : `\n❌ costo ISR: ${fallas} fallas`);
process.exit(fallas === 0 ? 0 : 1);
