// Regenera src/data/canasta-crianza.ts desde la planilla oficial de series del INDEC.
// Uso: npx -y tsx scripts/gen_canasta_crianza.ts   (mensual, ~día 15, cuando el INDEC publica)
//
// POR QUÉ UN GENERADOR Y NO VALORES A MANO: la canasta de crianza es el número que los jueces
// y los abogados usan como piso de referencia para la cuota alimentaria. Un valor viejo o
// tipeado mal es exactamente el tipo de error que quema la confianza (tema YMYL). Con el
// generador, actualizar el mes es correr un comando: cero tipeo, cero drift.
//
// FUENTE: INDEC, "Canasta de crianza, por tramo de edad" — serie mensual desde enero 2020.
// https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_canasta_crianza.xlsx
// El .xlsx se lee con `tools/xlsx-extraer.ts` (cero dependencias), reimplementado acá inline
// para que el script sea autocontenido y corra en cualquier sesión headless.

import { inflateRawSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const URL_PLANILLA = "https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_canasta_crianza.xlsx";
const DESTINO = resolve(import.meta.dirname, "..", "src", "data", "canasta-crianza.ts");

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// --- ZIP + XML mínimos (mismo criterio que tools/xlsx-extraer.ts) -----------
function leerZip(buf: Buffer): Map<string, Buffer> {
  const out = new Map<string, Buffer>();
  const fin = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin === -1) throw new Error("La planilla no parece un .xlsx válido.");
  const cantidad = buf.readUInt16LE(fin + 10);
  let p = buf.readUInt32LE(fin + 16);
  for (let i = 0; i < cantidad; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const metodo = buf.readUInt16LE(p + 10);
    const comprimido = buf.readUInt32LE(p + 20);
    const ln = buf.readUInt16LE(p + 28);
    const le = buf.readUInt16LE(p + 30);
    const lc = buf.readUInt16LE(p + 32);
    const off = buf.readUInt32LE(p + 42);
    const nombre = buf.subarray(p + 46, p + 46 + ln).toString("utf8");
    p += 46 + ln + le + lc;
    const inicio = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28);
    const datos = buf.subarray(inicio, inicio + comprimido);
    out.set(nombre, metodo === 0 ? Buffer.from(datos) : inflateRawSync(datos));
  }
  return out;
}

function desescapar(s: string): string {
  return s
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&");
}

function columna(ref: string): number {
  let n = 0;
  for (const ch of ref.replace(/\d+/g, "")) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function leerHoja(xml: string, compartidas: string[]): string[][] {
  const filas: string[][] = [];
  for (const mf of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const celdas: string[] = [];
    for (const mc of mf[1].matchAll(/<c([^>]*)\/>|<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = mc[1] ?? mc[2] ?? "";
      const cuerpo = mc[3] ?? "";
      const ref = /r="([A-Z]+\d+)"/.exec(attrs)?.[1];
      const tipo = /t="([^"]+)"/.exec(attrs)?.[1];
      const idx = ref ? columna(ref) : celdas.length;
      let valor = "";
      if (tipo === "inlineStr") {
        valor = [...cuerpo.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => desescapar(t[1])).join("");
      } else {
        const v = /<v>([\s\S]*?)<\/v>/.exec(cuerpo)?.[1];
        if (v !== undefined) valor = tipo === "s" ? (compartidas[Number(v)] ?? "") : desescapar(v);
      }
      while (celdas.length < idx) celdas.push("");
      celdas[idx] = valor;
    }
    filas.push(celdas);
  }
  return filas;
}

// --- Parseo de la serie -----------------------------------------------------
// Layout de la planilla (verificado 30/7/2026): A=Año (sólo en enero), B=Mes, y después 4
// bloques de 3 columnas (bienes, cuidado, total) para menor de 1 / 1-3 / 4-5 / 6-12 años.
const TRAMOS = [
  { id: "menor-1", col: 2 },
  { id: "1-a-3", col: 5 },
  { id: "4-a-5", col: 8 },
  { id: "6-a-12", col: 11 },
] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;

async function main(): Promise<void> {
  console.log("Descargando la serie de canasta de crianza del INDEC…");
  const res = await fetch(URL_PLANILLA);
  if (!res.ok) throw new Error(`HTTP ${res.status} al bajar ${URL_PLANILLA}`);
  const modificado = res.headers.get("last-modified") ?? "";
  const zip = leerZip(Buffer.from(await res.arrayBuffer()));
  const compartidas = [
    ...(zip.get("xl/sharedStrings.xml")?.toString("utf8") ?? "").matchAll(/<si>([\s\S]*?)<\/si>/g),
  ].map((m) => [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => desescapar(t[1])).join(""));
  const hoja = leerHoja(zip.get("xl/worksheets/sheet1.xml")!.toString("utf8"), compartidas);

  type Fila = { periodo: string; etiqueta: string; v: Record<string, { b: number; c: number; t: number }> };
  const serie: Fila[] = [];
  let anio = 0;

  for (const fila of hoja) {
    const a = (fila[0] ?? "").trim();
    const m = (fila[1] ?? "").trim();
    if (/^\d{4}$/.test(a)) anio = Number(a);
    const iMes = MESES.findIndex((x) => x.toLowerCase() === m.toLowerCase());
    if (!anio || iMes === -1) continue;

    const v: Fila["v"] = {};
    let completa = true;
    for (const tr of TRAMOS) {
      const b = Number(fila[tr.col]);
      const c = Number(fila[tr.col + 1]);
      const t = Number(fila[tr.col + 2]);
      if (![b, c, t].every((x) => Number.isFinite(x) && x > 0)) completa = false;
      // Control de integridad de la fuente: total = bienes + cuidado (tolerancia $1 por redondeo).
      else if (Math.abs(b + c - t) > 1)
        throw new Error(`Fila ${anio}-${iMes + 1} tramo ${tr.id}: bienes+cuidado (${r2(b + c)}) ≠ total (${r2(t)})`);
      v[tr.id] = { b: r2(b), c: r2(c), t: r2(t) };
    }
    if (!completa) continue;
    serie.push({
      periodo: `${anio}-${String(iMes + 1).padStart(2, "0")}`,
      etiqueta: `${MESES[iMes].toLowerCase()} ${anio}`,
      v,
    });
  }

  if (serie.length < 60) throw new Error(`Sólo parseé ${serie.length} meses: la planilla cambió de formato.`);
  const ultimo = serie[serie.length - 1];
  // La serie tiene que ser mensual y sin huecos: un salto es señal de parseo roto.
  for (let i = 1; i < serie.length; i++) {
    const [a1, m1] = serie[i - 1].periodo.split("-").map(Number);
    const esperado = m1 === 12 ? `${a1 + 1}-01` : `${a1}-${String(m1 + 1).padStart(2, "0")}`;
    if (serie[i].periodo !== esperado)
      throw new Error(`Hueco en la serie: después de ${serie[i - 1].periodo} vino ${serie[i].periodo}`);
  }

  const filas = serie
    .map(
      (f) =>
        `  { periodo: "${f.periodo}", etiqueta: "${f.etiqueta}", valores: { ` +
        TRAMOS.map(
          (tr) => `"${tr.id}": { bienes: ${f.v[tr.id].b}, cuidado: ${f.v[tr.id].c}, total: ${f.v[tr.id].t} }`,
        ).join(", ") +
        ` } },`,
    )
    .join("\n");

  const contenido = `// GENERADO por scripts/gen_canasta_crianza.ts — NO editar a mano.
// Correr \`npx -y tsx scripts/gen_canasta_crianza.ts\` cuando el INDEC publica el mes (~día 15).
//
// Canasta de crianza de la primera infancia, la niñez y la adolescencia (INDEC): lo que cuesta
// por mes mantener y cuidar a un chico, abierto en BIENES Y SERVICIOS (deriva de la Canasta
// Básica Total del GBA) y CUIDADO (las horas de cuidado valorizadas según la metodología de la
// Dirección Nacional de Economía, Igualdad y Género + UNICEF, 2023).
//
// USO LEGAL — LEER ANTES DE MOSTRAR ESTO: es una referencia estadística, NO una cuota fijada.
// El monto de una cuota alimentaria lo determina un juez caso por caso (art. 658 y ss. CCyC:
// se mide por las necesidades del hijo Y la capacidad económica de cada progenitor). La canasta
// sirve como piso orientativo del costo, y así hay que presentarla: estimación, nunca sentencia.
//
// Fuente: INDEC — serie "Canasta de crianza, por tramo de edad" (enero 2020 en adelante).
// ${URL_PLANILLA}
// Última modificación de la planilla en el servidor del INDEC: ${modificado}
// Consultado: ${new Date().toISOString().slice(0, 10)} · último período disponible: ${ultimo.etiqueta}

export type TramoCrianzaId = ${TRAMOS.map((t) => `"${t.id}"`).join(" | ")};

export type TramoCrianza = { id: TramoCrianzaId; nombre: string; escolaridad: string };

// Los tramos siguen los niveles de escolarización (el INDEC llega hasta los 12 años inclusive).
export const TRAMOS_CRIANZA: TramoCrianza[] = [
  { id: "menor-1", nombre: "Menor de 1 año", escolaridad: "Primera infancia, sin escolarizar" },
  { id: "1-a-3", nombre: "De 1 a 3 años", escolaridad: "Jardín maternal" },
  { id: "4-a-5", nombre: "De 4 a 5 años", escolaridad: "Nivel inicial" },
  { id: "6-a-12", nombre: "De 6 a 12 años", escolaridad: "Nivel primario" },
];

export type ValorCrianza = { bienes: number; cuidado: number; total: number };

export type MesCrianza = {
  periodo: string; // "2026-06"
  etiqueta: string; // "junio 2026"
  valores: Record<TramoCrianzaId, ValorCrianza>;
};

export const CANASTA_CRIANZA: MesCrianza[] = [
${filas}
];

/** Último mes publicado por el INDEC. */
export const CANASTA_CRIANZA_ULTIMO: MesCrianza = CANASTA_CRIANZA[CANASTA_CRIANZA.length - 1];

export const CANASTA_CRIANZA_FUENTE = {
  nombre: "INDEC: Valorización mensual de la canasta de crianza (serie mensual por tramo de edad)",
  url: "${URL_PLANILLA}",
  informe: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-173",
  consultadoEl: "${new Date().toISOString().slice(0, 10)}",
  ultimoPeriodo: "${ultimo.periodo}",
};
`;

  writeFileSync(DESTINO, contenido, "utf8");
  console.log(`✅ ${serie.length} meses (${serie[0].etiqueta} → ${ultimo.etiqueta}) → ${DESTINO}`);
  for (const tr of TRAMOS)
    console.log(`   ${tr.id.padEnd(8)} total ${ultimo.v[tr.id].t.toLocaleString("es-AR")}`);
}

main().catch((e) => {
  console.error(`❌ ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
