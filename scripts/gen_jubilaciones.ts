// Regenera src/data/jubilaciones.ts desde la API oficial de series de tiempo de datos.gob.ar.
// Uso: npx -y tsx scripts/gen_jubilaciones.ts
//
// QUÉ TRAE: la serie del HABER MÍNIMO JUBILATORIO garantizado (ANSES), mes a mes.
//
// EL MOTOR (Decreto 274/2024): desde el devengado de mayo de 2024 la movilidad previsional es
// MENSUAL y equivale a la variación del IPC del INDEC de **dos meses antes**, redondeada a dos
// decimales en porcentaje:
//
//     haber(M) = haber(M-1) × (1 + round(varIPC(M-2), 2 decimales) / 100)
//
// CONTROL CRUZADO OBLIGATORIO: el script reconstruye TODA la serie desde el corte con esa fórmula
// y ABORTA si un solo mes no cierra al centavo. Es lo que convierte esto en dato verificable y no
// en una cuenta nuestra: si ANSES cambiara el criterio, el generador se niega a publicar.
//
// POR QUÉ IMPORTA (y es el moat): la variación del IPC de un mes se publica ~el día 12 del mes
// siguiente. O sea que, apenas sale el IPC del mes X, el haber del mes X+2 **ya está determinado
// por la norma** — unas tres semanas ANTES de que ANSES dicte la resolución. No es un pronóstico:
// es aritmética sobre un dato oficial ya publicado.
//
// CORTE FIJO en 2024-05 (primer mes del régimen mensual). NUNCA convertirlo en ventana móvil: las
// URLs de /jubilacion/[mes] ya indexadas empezarían a dar 404.

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { IPC_SERIE } from "../src/data/ipc-serie";

/** Haber mínimo jubilatorio en pesos corrientes, mensual desde 1971. Fuente del dato: ANSES. */
const SERIE_HABER_MINIMO = "58.1_MP_0_M_24";

const API_URL =
  `https://apis.datos.gob.ar/series/api/series/?ids=${SERIE_HABER_MINIMO}` +
  `&format=json&limit=5000&start_date=2024-01-01`;

/** Primer mes del régimen de movilidad MENSUAL por IPC (Dec. 274/2024). Corte FIJO, no mover. */
const CORTE = "2024-05";

/**
 * Resoluciones de ANSES ya publicadas en el Boletín Oficial que todavía NO están en la serie de la
 * API (ANSES la carga con retraso). Cada fila se transcribe de la resolución, y el control cruzado
 * la verifica igual que a los meses que sí vienen de la API: si la fórmula no la reconstruye, aborta.
 * Cuando la API alcanza el mes, el generador compara ambos valores y aborta si difieren.
 */
const RESOLUCIONES: { periodo: string; haberMinimo: number; norma: string; url: string }[] = [
  {
    periodo: "2026-08",
    haberMinimo: 419_775.93,
    norma: "Resolución ANSES 232/2026, art. 1 (Boletín Oficial, 30/7/2026)",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/345155/20260730",
  },
  {
    periodo: "2026-09",
    haberMinimo: 428_633.20,
    norma: "Resolución ANSES 257/2026, art. 1 (Boletín Oficial, 1/9/2026)",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
  },
];

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function nombrePeriodo(p: string): string {
  const [anio, mes] = p.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

/** Corre `n` meses hacia atrás sobre un período "YYYY-MM". */
function restarMeses(periodo: string, n: number): string {
  const [anio, mes] = periodo.split("-").map(Number);
  const d = new Date(Date.UTC(anio, mes - 1 - n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const ipc = new Map(IPC_SERIE.map(([p, v]) => [p, v]));

/** Movilidad del mes `periodo`, en % con 2 decimales: la variación del IPC de dos meses antes. */
function movilidadDe(periodo: string): number | null {
  const pIpc = restarMeses(periodo, 2);
  const actual = ipc.get(pIpc);
  const previo = ipc.get(restarMeses(pIpc, 1));
  if (actual === undefined || previo === undefined) return null;
  return Math.round((actual / previo - 1) * 100 * 100) / 100;
}

async function main() {
  console.log("Descargando la serie del haber mínimo jubilatorio (ANSES)...");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 120_000);
  const res = await fetch(API_URL, { signal: ctrl.signal });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as { data: [string, number | null][] };

  const deApi = json.data
    .filter(([fecha, valor]) => /^\d{4}-\d{2}-\d{2}$/.test(fecha) && typeof valor === "number")
    .map(([fecha, valor]) => ({ periodo: fecha.slice(0, 7), haberMinimo: valor as number }));

  if (deApi.length === 0) throw new Error("La API no devolvió ningún período: abortar.");

  const ultimoApi = deApi[deApi.length - 1].periodo;
  console.log(`API: ${deApi.length} períodos (${deApi[0].periodo} → ${ultimoApi}).`);

  // --- Fusión con las resoluciones ya publicadas pero todavía ausentes de la API ---
  const porPeriodo = new Map(deApi.map((f) => [f.periodo, f.haberMinimo]));
  const normas = new Map<string, { norma: string; url: string }>();
  for (const r of RESOLUCIONES) {
    const enApi = porPeriodo.get(r.periodo);
    if (enApi !== undefined && Math.abs(enApi - r.haberMinimo) > 0.01) {
      throw new Error(
        `CONFLICTO en ${r.periodo}: la API dice ${enApi} y ${r.norma} dice ${r.haberMinimo}. ` +
          `NO publicar hasta entender la diferencia.`,
      );
    }
    porPeriodo.set(r.periodo, r.haberMinimo);
    normas.set(r.periodo, { norma: r.norma, url: r.url });
  }

  const filas = [...porPeriodo.entries()]
    .map(([periodo, haberMinimo]) => ({ periodo, haberMinimo }))
    .filter((f) => f.periodo >= CORTE)
    .sort((a, b) => a.periodo.localeCompare(b.periodo));

  if (filas.length < 20) throw new Error(`Serie sospechosamente corta: ${filas.length} períodos`);
  if (filas[0].periodo !== CORTE) {
    throw new Error(`La serie no arranca en el corte ${CORTE}: arranca en ${filas[0].periodo}`);
  }

  // --- Continuidad: sin meses faltantes ---
  for (let i = 1; i < filas.length; i++) {
    if (filas[i].periodo !== restarMeses(filas[i].periodo, 0) ||
        restarMeses(filas[i].periodo, 1) !== filas[i - 1].periodo) {
      throw new Error(
        `Hueco en la serie: después de ${filas[i - 1].periodo} viene ${filas[i].periodo}.`,
      );
    }
  }

  // --- CONTROL CRUZADO: la fórmula de movilidad reconstruye cada mes al centavo ---
  const movilidades = new Map<string, number>();
  let reconstruidos = 0;
  for (let i = 1; i < filas.length; i++) {
    const { periodo, haberMinimo } = filas[i];
    const previo = filas[i - 1].haberMinimo;
    const mov = movilidadDe(periodo);
    if (mov === null) {
      throw new Error(
        `Falta el IPC de ${restarMeses(periodo, 2)} para calcular la movilidad de ${periodo}. ` +
          `Correr antes scripts/gen_ipc_serie.ts.`,
      );
    }
    const esperado = Math.round(previo * (1 + mov / 100) * 100) / 100;
    if (Math.abs(esperado - haberMinimo) > 0.02) {
      throw new Error(
        `CONTROL CRUZADO FALLIDO en ${periodo}: la fórmula da ${esperado} y la fuente dice ` +
          `${haberMinimo} (movilidad ${mov}% = IPC de ${restarMeses(periodo, 2)}). ` +
          `NO publicar: puede haber cambiado el régimen de movilidad.`,
      );
    }
    movilidades.set(periodo, mov);
    reconstruidos++;
  }
  console.log(
    `Control cruzado OK: ${reconstruidos}/${filas.length - 1} meses reconstruidos al centavo ` +
      `con movilidad = IPC de dos meses antes.`,
  );

  const ultimo = filas[filas.length - 1];
  const hoy = new Date().toISOString().slice(0, 10);
  const cuerpo = filas
    .map((f) => {
      const mov = movilidades.get(f.periodo);
      const movTxt = mov === undefined ? "null" : String(mov);
      return `  { periodo: "${f.periodo}", haberMinimo: ${f.haberMinimo}, movilidad: ${movTxt} },`;
    })
    .join("\n");

  const normasTxt = [...normas.entries()]
    .map(([p, n]) => `  "${p}": { norma: ${JSON.stringify(n.norma)}, url: ${JSON.stringify(n.url)} },`)
    .join("\n");

  const contenido = `// Haber mínimo jubilatorio garantizado (ANSES), mes a mes, bajo el régimen de movilidad MENSUAL.
// GENERADO por scripts/gen_jubilaciones.ts — NO editar a mano.
//   ${API_URL}
// Descargado el ${hoy}. Último período: ${nombrePeriodo(ultimo.periodo)} ($${ultimo.haberMinimo}).
//
// EL MOTOR (Decreto 274/2024): la movilidad de cada mes es la variación del IPC del INDEC de DOS
// MESES ANTES, redondeada a dos decimales en porcentaje. El generador reconstruye toda la serie con
// esa fórmula y aborta si un mes no cierra al centavo: los valores de acá están verificados contra
// la serie oficial de ANSES, no calculados por nosotros.
//
// Consecuencia práctica: cuando el INDEC publica el IPC del mes X (~día 12 del mes siguiente), el
// haber del mes X+2 ya quedó determinado por la norma, antes de que salga la resolución de ANSES.
//
// Corte FIJO en ${CORTE} (primer mes del régimen mensual). NO convertirlo en ventana móvil.

export type MesJubilacion = {
  periodo: string; // "2026-08"
  /** Haber mínimo garantizado del mes, en pesos corrientes. */
  haberMinimo: number;
  /** Movilidad aplicada ese mes, en % (variación del IPC de dos meses antes). null en el primer mes. */
  movilidad: number | null;
};

export const HABER_MINIMO_SERIE: MesJubilacion[] = [
${cuerpo}
];

/** Último mes con haber mínimo publicado por fuente oficial. */
export const HABER_MINIMO_ULTIMO: MesJubilacion =
  HABER_MINIMO_SERIE[HABER_MINIMO_SERIE.length - 1];

/**
 * Normas del Boletín Oficial que fijaron meses que todavía no están en la serie de la API de ANSES.
 * Se usan para citar la fuente exacta del mes vigente en la página.
 */
export const NORMAS_POR_PERIODO: Record<string, { norma: string; url: string }> = {
${normasTxt}
};

export const HABER_MINIMO_FUENTE = {
  nombre: "ANSES — Haber mínimo jubilatorio (serie mensual en pesos corrientes)",
  api: "${API_URL}",
  serie: "https://datos.gob.ar/dataset/sspm-haber-minimo-jubilatorio-pesos-corrientes",
  movilidad:
    "Decreto 274/2024 — movilidad mensual por IPC (INDEC), con dos meses de rezago",
  movilidadUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/305905/20240322",
  consultadoEl: "${hoy}",
  ultimoPeriodo: "${ultimo.periodo}",
};
`;

  const destino = join(import.meta.dirname, "..", "src", "data", "jubilaciones.ts");
  writeFileSync(destino, contenido, "utf8");
  console.log(
    `OK: ${filas.length} períodos (${filas[0].periodo} → ${ultimo.periodo}) → ${destino}`,
  );
}

main().catch((e) => {
  console.error("ERROR:", e.message ?? e);
  process.exit(1);
});
