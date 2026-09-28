// gen_uma.ts — El rotador de la UMA (Unidad de Medida Arancelaria, art. 19 Ley 27.423).
//
// QUÉ HACE: le pregunta a la Corte Suprema por la lista oficial de resoluciones que fijan el valor
// de la UMA, baja el PDF de cada una y le saca el importe y desde cuándo rige. Imprime el bloque
// `SERIE_UMA` listo para pegar en src/data/uma.ts. Ningún número se transcribe a mano.
//
// POR QUÉ EXISTE (30/8/2026, s99): la Ley 27.802 bajó el piso de los honorarios periciales de 6 UMA
// a 2 UMA, y el art. 51 de la Ley 27.423 manda pagar los honorarios «según su valor vigente al
// momento del pago». O sea: sin la UMA del día, ni el piso legal ni una regulación vieja se pueden
// expresar en pesos. Era el único dato que faltaba decidir antes de abrir /honorarios-periciales
// (PROGRESS s98 lo dejó escrito como condición), y la decisión fue GO porque la fuente es
// scripteable — este archivo es la prueba.
//
// LAS TRES MINAS DE LA FUENTE (verificadas el 30/8/2026):
//   1. **csjn.gov.ar devuelve 403 al User-Agent de curl/node.** Con un UA de navegador responde 200.
//      Un 403 de la Corte NO es «la página no existe»: es el filtro. (Mismo olor que el WAF de ANSES.)
//   2. **La lista NO está en el HTML.** /transparencia/uma es un cascarón: los registros salen de un
//      POST JSON a /transparencia/uma/data que exige el header X-CSRF-TOKEN con el token que la
//      propia página imprime en un `var token = "..."`, más la cookie de sesión de ese mismo GET.
//      Scrapear el HTML devuelve cero filas y parece que la Corte no publica la serie.
//   3. **El valor no viaja en el JSON**: sólo el docId del PDF. El importe está adentro de la
//      resolución, en la frase «($104.220) a partir del primero de julio de 2026».
//
// USO:
//   npx -y tsx calcular-ar/scripts/gen_uma.ts              # incremental: sólo lo que falta en la serie
//   npx -y tsx calcular-ar/scripts/gen_uma.ts --todo       # rebaja todas las resoluciones desde cero
//   npx -y tsx calcular-ar/scripts/gen_uma.ts --verificar  # no baja nada: confirma que el valor
//                                                          # vigente del repo sigue siendo el de la Corte
//
// Salida esperada cuando la Corte todavía no publicó nada nuevo: "nada nuevo" y exit 0. Es la
// respuesta correcta, no un error: el valor viejo sigue siendo el vigente hasta que haya otro.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const RAIZ = resolve(import.meta.dirname, "..", "..");
const DIR_DEPS = resolve(RAIZ, "tools", ".pdf-deps");
const CACHE = resolve(RAIZ, "tools", ".pdf-out", "uma");
const BASE = "https://www.csjn.gov.ar";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36";

/** Instalación perezosa de unpdf, compartida con tools/pdf-extraer.ts y gen_aportes_casas.ts. */
async function cargarUnpdf(): Promise<any> {
  const marca = resolve(DIR_DEPS, "node_modules", "unpdf", "package.json");
  if (!existsSync(marca)) {
    mkdirSync(DIR_DEPS, { recursive: true });
    if (!existsSync(resolve(DIR_DEPS, "package.json")))
      writeFileSync(
        resolve(DIR_DEPS, "package.json"),
        JSON.stringify({ name: "pdf-deps", private: true, type: "module" }, null, 2),
      );
    execFileSync("npm", ["i", "--prefix", DIR_DEPS, "--silent", "unpdf"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  }
  const url = "file:///" + resolve(DIR_DEPS, "node_modules", "unpdf/dist/index.mjs").replace(/\\/g, "/");
  return import(url);
}

const MESES: Record<string, number> = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  setiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

type FilaUma = {
  desde: string;
  valor: number;
  resolucion: string;
  resolucionFecha: string;
  docId: number;
};

type Registro = { docId: number; fecha: string; nroDoc: string };

/** GET/POST con User-Agent de navegador: sin él, csjn.gov.ar contesta 403. */
async function traer(url: string, init: RequestInit = {}, cookie = ""): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      "User-Agent": UA,
      Accept: "*/*",
      ...(cookie ? { Cookie: cookie } : {}),
      ...(init.headers ?? {}),
    },
  });
}

/** Abre /transparencia/uma y saca de ahí el token CSRF y la cookie de sesión. */
async function abrirSesion(): Promise<{ token: string; cookie: string }> {
  const r = await traer(`${BASE}/transparencia/uma`);
  if (!r.ok) throw new Error(`csjn.gov.ar respondió ${r.status} al abrir /transparencia/uma`);
  const html = await r.text();
  const m = html.match(/var\s+token\s*=\s*"([^"]+)"/);
  if (!m) throw new Error("no apareció el token CSRF en /transparencia/uma (¿cambió la página?)");
  const cookie = (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ");
  return { token: m[1], cookie };
}

/** La lista oficial de resoluciones que fijaron la UMA, la más nueva primero. */
async function listar(): Promise<Registro[]> {
  const { token, cookie } = await abrirSesion();
  const body = {
    draw: 1,
    start: 0,
    length: 200,
    order: [],
    columns: [],
    search: { value: "", regex: false },
    formBusqueda: {
      q: "",
      nroDoc: "",
      anioDoc: "",
      fechaDesde: "",
      fechaHasta: "",
      qExtra: "",
      qa: "",
      nroDoca: "",
      anioDoca: "",
      fechaDesde_a: "",
      fechaHasta_a: "",
    },
  };
  const r = await traer(
    `${BASE}/transparencia/uma/data`,
    {
      method: "POST",
      headers: { "X-CSRF-TOKEN": token, "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    },
    cookie,
  );
  if (!r.ok) throw new Error(`/transparencia/uma/data respondió ${r.status}`);
  const json = (await r.json()) as { data: Array<{ docId: number; fecha: string; nroDoc: string }> };
  return json.data.map((d) => ({ docId: d.docId, fecha: d.fecha, nroDoc: String(d.nroDoc) }));
}

/** Baja el PDF de una resolución (con caché en disco) y devuelve su texto aplanado. */
async function textoDe(docId: number): Promise<string> {
  mkdirSync(CACHE, { recursive: true });
  const pdf = resolve(CACHE, `${docId}.pdf`);
  if (!existsSync(pdf)) {
    const r = await traer(`${BASE}/documentos/descargar?ID=${docId}`);
    if (!r.ok) throw new Error(`el PDF ${docId} respondió ${r.status}`);
    writeFileSync(pdf, Buffer.from(await r.arrayBuffer()));
  }
  const unpdf = await cargarUnpdf();
  const doc = await unpdf.getDocumentProxy(new Uint8Array(readFileSync(pdf)));
  const { text } = await unpdf.extractText(doc, { mergePages: true });
  return String(text).replace(/\s+/g, " ");
}

/**
 * Saca el importe y la vigencia del texto de la resolución. El PDF corta las palabras en cualquier
 * lugar de la línea, por eso el texto se aplana antes de buscar:
 * «... ($104.220) a partir del primero de julio de 2026 (conf. acordada 20/2026)».
 */
function parsear(texto: string): { valor: number; desde: string } | null {
  const m = texto.match(
    /\(\$\s*([\d.]+)\)\s*a partir del\s+(?:primero|1[°ºo]?)\s+de\s+([a-zA-ZáéíóúÁÉÍÓÚ]+)\s+(?:de\s+)?(\d{4})/i,
  );
  if (!m) return null;
  const valor = Number(m[1].replace(/\./g, ""));
  const mes = MESES[m[2].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")];
  if (!Number.isFinite(valor) || !mes) return null;
  return { valor, desde: `${m[3]}-${String(mes).padStart(2, "0")}-01` };
}

/** "20/08/2026" → "2026-08-20" */
function aIso(ddmmaaaa: string): string {
  const [d, m, a] = ddmmaaaa.split("/");
  return `${a}-${m}-${d}`;
}

function tiene(flag: string): boolean {
  return process.argv.includes(`--${flag}`);
}

async function main(): Promise<void> {
  const registros = await listar();
  console.log(
    `— gen_uma · ${new Date().toISOString().slice(0, 10)} · ${registros.length} resolución(es) publicadas por la CSJN —\n`,
  );

  // Lo que ya está cargado en el repo, para poder ser incremental y para --verificar.
  let serieRepo: FilaUma[] = [];
  try {
    ({ SERIE_UMA: serieRepo } = (await import("../src/data/uma")) as { SERIE_UMA: FilaUma[] });
  } catch {
    /* la primera corrida es anterior al archivo de datos: es esperable */
  }
  const conocidos = new Set(serieRepo.map((f) => f.docId));

  if (tiene("verificar")) {
    const nueva = registros[0];
    if (conocidos.has(nueva.docId)) {
      const vig = serieRepo[0];
      console.log(
        `✅ la UMA del repo es la vigente: $${vig.valor.toLocaleString("es-AR")} desde ${vig.desde} (Res. SGA ${vig.resolucion}).`,
      );
      return;
    }
    console.log(
      `🔴 la CSJN publicó la Res. SGA ${nueva.nroDoc} del ${nueva.fecha} y no está en el repo. Corré el script sin --verificar.`,
    );
    process.exitCode = 1;
    return;
  }

  const desdeCero = tiene("todo") || serieRepo.length === 0;
  const aBajar = desdeCero ? registros : registros.filter((r) => !conocidos.has(r.docId));

  if (aBajar.length === 0) {
    const vig = serieRepo[0];
    console.log(`✅ nada nuevo: la UMA vigente sigue siendo $${vig.valor.toLocaleString("es-AR")} desde ${vig.desde}.`);
    return;
  }

  const filas: FilaUma[] = desdeCero ? [] : [...serieRepo];
  const escaneadas: Registro[] = [];
  for (const r of aBajar) {
    const p = parsear(await textoDe(r.docId));
    if (!p) {
      // No es un bug: la Corte publicó varias resoluciones viejas como IMAGEN escaneada, y el PDF
      // devuelve texto vacío. Se anotan y quedan fuera de la serie — nunca se estima el valor.
      escaneadas.push(r);
      continue;
    }
    filas.push({
      desde: p.desde,
      valor: p.valor,
      // El nroDoc de la Corte a veces ya trae el año ("29/2023") y a veces no ("1930").
      resolucion: r.nroDoc.includes("/") ? r.nroDoc : `${r.nroDoc}/${r.fecha.slice(6)}`,
      resolucionFecha: aIso(r.fecha),
      docId: r.docId,
    });
    console.log(`   ${p.desde} · $${p.valor.toLocaleString("es-AR")} · Res. SGA ${r.nroDoc} del ${r.fecha}`);
  }
  if (escaneadas.length)
    console.log(
      `\n⚠️  ${escaneadas.length} resolución(es) vienen escaneadas (PDF sin texto) y quedan fuera de la serie: ` +
        escaneadas.map((r) => `${r.nroDoc} (${r.fecha})`).join(", "),
    );

  // Una vigencia por fecha: si dos resoluciones fijan el mismo "desde", gana la más nueva.
  const porDesde = new Map<string, FilaUma>();
  for (const f of filas.sort((a, b) => a.resolucionFecha.localeCompare(b.resolucionFecha))) porDesde.set(f.desde, f);
  const orden = [...porDesde.values()].sort((a, b) => b.desde.localeCompare(a.desde));

  // --escribir: lo usa el workflow datos-vivos. Sólo toca uma.ts si apareció una vigencia que el repo
  // no tenía; si no, el archivo queda igual (las escaneadas se vuelven a bajar siempre y nunca entran,
  // así que "hubo algo para bajar" no significa "hubo algo nuevo").
  if (tiene("escribir")) {
    const nuevas = orden.filter((f) => !serieRepo.some((r) => r.docId === f.docId));
    if (nuevas.length === 0) {
      console.log(`✅ nada nuevo: la UMA vigente sigue siendo $${orden[0].valor.toLocaleString("es-AR")} desde ${orden[0].desde}.`);
      return;
    }
    const destino = resolve(import.meta.dirname, "..", "src", "data", "uma.ts");
    const actual = readFileSync(destino, "utf8");
    const ini = actual.indexOf("export const SERIE_UMA: FilaUma[] = [");
    const fin = actual.indexOf("\n];", ini);
    const cuerpo = orden
      .map((f) => `  { desde: "${f.desde}", valor: ${f.valor}, resolucion: "${f.resolucion}", resolucionFecha: "${f.resolucionFecha}", docId: ${f.docId} },`)
      .join("\n");
    writeFileSync(destino, `${actual.slice(0, ini)}export const SERIE_UMA: FilaUma[] = [\n${cuerpo}${actual.slice(fin)}`);
    for (const n of nuevas) console.log(`🔄 UMA nueva: $${n.valor.toLocaleString("es-AR")} desde ${n.desde} (Res. SGA ${n.resolucion})`);
    return;
  }

  console.log(`\n=== pegá esto en calcular-ar/src/data/uma.ts (${orden.length} valores) ===\n`);
  console.log("export const SERIE_UMA: FilaUma[] = [");
  for (const f of orden)
    console.log(
      `  { desde: "${f.desde}", valor: ${f.valor}, resolucion: "${f.resolucion}", resolucionFecha: "${f.resolucionFecha}", docId: ${f.docId} },`,
    );
  console.log("];");
}

main().catch((e) => {
  console.error("❌", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
