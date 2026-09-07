// Regenera src/data/canasta-basica.ts desde la API oficial de series de tiempo de datos.gob.ar.
// Uso: npx -y tsx scripts/gen_canasta_basica.ts   (el INDEC publica ~día 14-15 de cada mes)
//
// QUÉ TRAE: la canasta básica alimentaria (CBA) y la canasta básica total (CBT) del **adulto
// equivalente** del Gran Buenos Aires. Son los dos únicos primitivos: la línea de indigencia y la
// de pobreza de CUALQUIER hogar salen de multiplicarlos por sus adultos equivalentes (tabla oficial
// en src/data/adulto-equivalente.ts). Por eso acá NO se guardan las líneas de la "familia tipo":
// se usan sólo como control cruzado en tiempo de generación (regla de fuente única, kaizen s64).
//
// CONTROL CRUZADO OBLIGATORIO: la API también publica la línea de indigencia y la de pobreza del
// hogar de 4 integrantes (3,09 adultos equivalentes). Si CBA×3,09 o CBT×3,09 no reconstruyen esas
// series, el script ABORTA: es la señal de que la API cambió de significado y no se puede publicar
// un número financiero sin entender por qué.

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SERIES = {
  cba: "150.1_CSTA_BARIA_0_D_26", // Canasta básica alimentaria (adulto equivalente), desde 2016
  cbt: "150.1_CSTA_BATAL_0_D_20", // Canasta básica total (adulto equivalente), desde 2016
  li: "150.1_LA_INDICIA_0_D_16", // Línea de indigencia, hogar de 4 integrantes (3,09 AE)
  lp: "150.1_LA_POBREZA_0_D_13", // Línea de pobreza, hogar de 4 integrantes (3,09 AE)
} as const;

const API_URL =
  `https://apis.datos.gob.ar/series/api/series/?ids=${SERIES.cba},${SERIES.cbt},${SERIES.li},${SERIES.lp}` +
  `&format=json&limit=1000`;

/** Adultos equivalentes del hogar de 4 integrantes que publica el INDEC (varón 35, mujer 31, 6 y 8 años). */
const AE_FAMILIA_TIPO = 3.09;

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function nombrePeriodo(p: string): string {
  const [anio, mes] = p.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

async function main() {
  console.log("Descargando CBA/CBT del INDEC (puede tardar hasta 90s)...");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 120_000);
  const res = await fetch(API_URL, { signal: ctrl.signal });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as { data: [string, ...(number | null)[]][] };

  const filas = json.data
    .filter(([fecha]) => /^\d{4}-\d{2}-\d{2}$/.test(fecha))
    .map(([fecha, cba, cbt, li, lp]) => ({
      periodo: fecha.slice(0, 7),
      cba: typeof cba === "number" ? cba : null,
      cbt: typeof cbt === "number" ? cbt : null,
      li: typeof li === "number" ? li : null,
      lp: typeof lp === "number" ? lp : null,
    }))
    .filter((f) => f.cba !== null && f.cbt !== null);

  if (filas.length < 100) throw new Error(`Serie sospechosamente corta: ${filas.length} períodos`);
  if (filas[0].periodo !== "2016-04") {
    throw new Error(`La serie no arranca en 2016-04: ${filas[0].periodo}`);
  }

  // --- Control cruzado contra las líneas oficiales del hogar de 4 integrantes ---
  let controlados = 0;
  for (const f of filas) {
    if (f.li === null || f.lp === null) continue;
    const espLi = f.cba! * AE_FAMILIA_TIPO;
    const espLp = f.cbt! * AE_FAMILIA_TIPO;
    // Tolerancia relativa chica: la API redondea distinto, pero el modelo tiene que reconstruirlas.
    if (Math.abs(espLi / f.li - 1) > 1e-4 || Math.abs(espLp / f.lp - 1) > 1e-4) {
      throw new Error(
        `CONTROL CRUZADO FALLIDO en ${f.periodo}: CBA×${AE_FAMILIA_TIPO}=${espLi.toFixed(2)} vs LI=${f.li} · ` +
          `CBT×${AE_FAMILIA_TIPO}=${espLp.toFixed(2)} vs LP=${f.lp}. NO publicar: revisar la metodología.`,
      );
    }
    controlados++;
  }
  if (controlados < 50) {
    throw new Error(`Sólo ${controlados} períodos con líneas oficiales para cruzar: muy poco, abortar.`);
  }
  console.log(`Control cruzado OK en ${controlados} períodos (CBA/CBT × ${AE_FAMILIA_TIPO} = LI/LP oficiales).`);

  // --- Sanidad de la serie: monótona en pesos corrientes, sin saltos absurdos ---
  for (let i = 1; i < filas.length; i++) {
    const salto = filas[i].cbt! / filas[i - 1].cbt! - 1;
    if (salto < -0.05 || salto > 0.6) {
      throw new Error(`Salto sospechoso de CBT en ${filas[i].periodo}: ${(salto * 100).toFixed(1)}%`);
    }
  }

  const ultimo = filas[filas.length - 1];
  const hoy = new Date().toISOString().slice(0, 10);
  const cuerpo = filas
    .map((f) => `  { periodo: "${f.periodo}", cba: ${f.cba}, cbt: ${f.cbt} },`)
    .join("\n");

  const contenido = `// Canasta básica alimentaria (CBA) y canasta básica total (CBT) del ADULTO EQUIVALENTE,
// Gran Buenos Aires (INDEC). GENERADO por scripts/gen_canasta_basica.ts — NO editar a mano.
//   ${API_URL}
// Descargado el ${hoy}. Último período: ${nombrePeriodo(ultimo.periodo)} (CBA ${ultimo.cba} · CBT ${ultimo.cbt}).
//
// QUÉ SIGNIFICAN (metodología INDEC N° 22):
//   · CBA = costo mensual de los alimentos que cubren los requerimientos kilocalóricos y proteicos
//     de un varón adulto de 30 a 60 años con actividad moderada. Es la LÍNEA DE INDIGENCIA por
//     adulto equivalente.
//   · CBT = CBA ampliada por el coeficiente de Engel para cubrir bienes y servicios no alimentarios.
//     Es la LÍNEA DE POBREZA por adulto equivalente.
// Para un hogar concreto, ambas se multiplican por sus adultos equivalentes (src/data/adulto-equivalente.ts).
//
// ⚠️ NO es una medición de pobreza de una persona: el INDEC mide pobreza por INGRESO del hogar
// comparado contra su CBT. Un hogar con ingresos por debajo de la CBT de su composición es pobre;
// por debajo de la CBA, indigente. Es un umbral estadístico, no una categoría legal ni un beneficio.
//
// El INDEC publica el informe ~día 14-15 de cada mes: regenerar en cada redeploy mensual.

export type MesCanastaBasica = {
  periodo: string; // "2026-06"
  /** Canasta básica alimentaria del adulto equivalente, en pesos corrientes. */
  cba: number;
  /** Canasta básica total del adulto equivalente, en pesos corrientes. */
  cbt: number;
};

export const CANASTA_BASICA: MesCanastaBasica[] = [
${cuerpo}
];

/** Último mes publicado por el INDEC. */
export const CANASTA_BASICA_ULTIMO: MesCanastaBasica = CANASTA_BASICA[CANASTA_BASICA.length - 1];

export const CANASTA_BASICA_FUENTE = {
  nombre:
    "INDEC — Valorización mensual de la canasta básica alimentaria y de la canasta básica total, Gran Buenos Aires",
  api: "${API_URL}",
  informe: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149",
  serie: "https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_cba_cbt.xls",
  metodologia: "https://www.indec.gob.ar/ftp/cuadros/sociedad/EPH_metodologia_22_pobreza.pdf",
  consultadoEl: "${hoy}",
  ultimoPeriodo: "${ultimo.periodo}",
};
`;

  const destino = join(import.meta.dirname, "..", "src", "data", "canasta-basica.ts");
  writeFileSync(destino, contenido, "utf8");
  console.log(
    `OK: ${filas.length} períodos (${filas[0].periodo} → ${ultimo.periodo}) → ${destino}`,
  );
}

main().catch((e) => {
  console.error("ERROR:", e.message ?? e);
  process.exit(1);
});
