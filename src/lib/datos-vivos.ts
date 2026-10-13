// Detector de deriva entre lo que calcular.ar SIRVE hoy y lo que las fuentes oficiales publican.
//
// POR QUÉ EXISTE (4/9/2026): las páginas son estáticas y los datos se hornean en el build, así que
// un dato nuevo del BCRA o del INDEC no llega al sitio hasta que alguien redeploya. Hasta hoy el
// único que se daba cuenta era una sesión de Claude arrancando a mano.
//
// INVARIANTE QUE NO SE PUEDE ROMPER: este módulo DETECTA y AVISA, nunca escribe un dato. La
// rotación con sus guardas vive en tools/rotar-tna.ts y tools/rotar-inflacion.ts, y pasa por git.
// Un número de plata horneado desde un fetch sin revisar es exactamente la línea roja #5.
//
// Las bandas de sanidad están duplicadas a propósito con las de tools/rotar-*.ts: ese código corre
// en Node con node:fs y no se puede importar desde el bundle de Next. Si cambiás una, cambiá las dos.

import https from "node:https";
import { diasHabilesEntre, MAX_DIAS_HABILES_DIARIA } from "../../scripts/datos-paises/lib/frescura";

export type Severidad = "ok" | "atencion" | "accion";

export type Hallazgo = {
  dato: string;
  severidad: Severidad;
  sirve: string;
  fuente: string;
  detalle: string;
  accion?: string;
};

export const BANDA_TNA = { min: 1, max: 300, saltoRelativoMax: 0.3 };
export const BANDA_IPC = { min: -5, max: 30, saltoPpMax: 5 };

export const URL_BCRA = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/12?limit=1";
// sort=desc&limit=2: con limit=5000 la respuesta pesaba la serie entera desde 2016 y era lo que más
// se colgaba ("This operation was aborted", issue #27). Para comparar alcanzan los dos últimos.
export const URL_IPC =
  "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&sort=desc&limit=2";
// CBA y CBT por separado: pedidas juntas, la API devuelve la columna de la CBA en null (probado el
// 13/10/2026, mismas filas que de a una traen el valor). Es la inestabilidad del issue #27. Y limit=2
// a propósito: con limit=3 o 5 la serie de la CBA volvía vacía ese mismo día.
const URL_SERIE = (id: string) => `https://apis.datos.gob.ar/series/api/series/?ids=${id}&format=json&sort=desc&limit=2`;
export const URL_CBA = URL_SERIE("150.1_CSTA_BARIA_0_D_26");
export const URL_CBT = URL_SERIE("150.1_CSTA_BATAL_0_D_20");

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function periodoANombre(periodo: string): string {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

export function nombreAPeriodo(nombre: string): string | null {
  const [mes, anio] = nombre.trim().toLowerCase().split(/\s+/);
  const i = MESES.indexOf(mes);
  if (i < 0 || !/^\d{4}$/.test(anio ?? "")) return null;
  return `${anio}-${String(i + 1).padStart(2, "0")}`;
}

// ── IO ───────────────────────────────────────────────────────────────────────
// Varios .gob.ar sirven la cadena de certificados incompleta: fetch tira "fetch failed" y el
// llamador cree que el organismo está caído. Se reintenta sin verificar TLS, como en tools/lib.

function getJson(url: string, timeoutMs: number, insecure = false, redirects = 3): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": "calcular.ar/datos-vivos", Accept: "application/json" },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 301 && status <= 308 && res.headers.location && redirects > 0) {
          res.resume();
          getJson(new URL(res.headers.location, url).toString(), timeoutMs, insecure, redirects - 1)
            .then(resolve, reject);
          return;
        }
        if (status !== 200) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch {
            reject(new Error("la respuesta no es JSON válido"));
          }
        });
      },
    );
    req.on("timeout", () => req.destroy(new Error(`timeout tras ${Math.round(timeoutMs / 1000)}s`)));
    req.on("error", reject);
  });
}

const CODIGOS_TLS = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "CERT_HAS_EXPIRED",
  "ERR_TLS_CERT_ALTNAME_INVALID",
]);

async function getJsonTolerante(url: string, timeoutMs: number): Promise<unknown> {
  try {
    return await getJson(url, timeoutMs);
  } catch (err) {
    if (CODIGOS_TLS.has((err as NodeJS.ErrnoException).code ?? "")) {
      return await getJson(url, timeoutMs, true);
    }
    throw err;
  }
}

/** Recorre un JSON de forma arbitraria juntando pares {fecha, valor}: el BCRA rota el shape seguido. */
export function extraerFechados(node: unknown, acc: { fecha: string; valor: number }[] = []) {
  if (Array.isArray(node)) {
    for (const n of node) extraerFechados(n, acc);
    return acc;
  }
  if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    const fecha = o.fecha ?? o.date ?? o.Fecha;
    const valor = o.valor ?? o.value ?? o.Valor;
    if (typeof fecha === "string" && typeof valor === "number" && /^\d{4}-\d{2}-\d{2}/.test(fecha)) {
      acc.push({ fecha: fecha.slice(0, 10), valor });
    }
    for (const v of Object.values(o)) extraerFechados(v, acc);
  }
  return acc;
}

export type TnaViva = { valor: number; fecha: string };
export type IpcVivo = { periodo: string; indice: number; previo: number };

export async function traerTna(timeoutMs = 15_000): Promise<TnaViva | null> {
  try {
    const datos = extraerFechados(await getJsonTolerante(URL_BCRA, timeoutMs));
    if (!datos.length) return null;
    const ultimo = datos.reduce((a, b) => (b.fecha > a.fecha ? b : a));
    return { valor: ultimo.valor, fecha: ultimo.fecha };
  } catch {
    return null;
  }
}

export async function traerIpc(timeoutMs = 25_000): Promise<IpcVivo | null> {
  try {
    const json = (await getJsonTolerante(URL_IPC, timeoutMs)) as { data?: [string, number][] };
    const filas = (json.data ?? [])
      .filter((f) => typeof f?.[0] === "string" && typeof f?.[1] === "number")
      .sort((a, b) => (a[0] < b[0] ? -1 : 1));
    if (filas.length < 2) return null;
    const [fecha, indice] = filas[filas.length - 1];
    const previo = filas[filas.length - 2][1];
    return { periodo: String(fecha).slice(0, 7), indice, previo };
  } catch {
    return null;
  }
}

export type CanastaViva = { periodo: string; cba: number; cbt: number };

export async function traerCanasta(timeoutMs = 25_000): Promise<CanastaViva | null> {
  const porPeriodo = async (url: string) => {
    const json = (await getJsonTolerante(url, timeoutMs)) as { data?: unknown[][] };
    const mapa = new Map<string, number>();
    for (const f of json.data ?? []) {
      if (typeof f?.[0] === "string" && /^\d{4}-\d{2}/.test(f[0]) && typeof f[1] === "number") mapa.set(f[0].slice(0, 7), f[1]);
    }
    return mapa;
  };
  try {
    const [cba, cbt] = await Promise.all([porPeriodo(URL_CBA), porPeriodo(URL_CBT)]);
    const periodo = [...cba.keys()].filter((p) => cbt.has(p)).sort().pop();
    return periodo ? { periodo, cba: cba.get(periodo)!, cbt: cbt.get(periodo)! } : null;
  } catch {
    return null;
  }
}

// ── Comparación (pura: sin red, sin env — es lo que testea tools/datos-vivos-test.ts) ────────

export function compararTna(
  servido: { valor: number; fechaISO: string },
  vivo: TnaViva | null,
): Hallazgo {
  const base = { dato: "TNA_FALLBACK (plazo fijo)", sirve: `${servido.valor}% · ${servido.fechaISO}` };

  if (!vivo) {
    return {
      ...base,
      severidad: "atencion",
      fuente: "sin respuesta",
      detalle: "El BCRA no respondió. La calculadora pide la TNA en vivo desde el navegador, así que el usuario sigue viendo el dato correcto salvo que el BCRA también esté caído para él.",
    };
  }

  const fuente = `${vivo.valor}% · ${vivo.fecha}`;

  if (!(vivo.valor >= BANDA_TNA.min && vivo.valor <= BANDA_TNA.max)) {
    return {
      ...base,
      severidad: "accion",
      fuente,
      detalle: `El BCRA devolvió ${vivo.valor}%, fuera de la banda de sanidad (de ${BANDA_TNA.min} a ${BANDA_TNA.max}%). Puede ser un cambio de unidad o de shape de la API.`,
      accion: "Revisar a mano la serie 12 del BCRA antes de tocar nada. NO rotar el fallback a ciegas.",
    };
  }

  if (Math.abs(vivo.valor - servido.valor) / servido.valor > BANDA_TNA.saltoRelativoMax) {
    return {
      ...base,
      severidad: "accion",
      fuente,
      detalle: `Salto brusco: ${servido.valor}% → ${vivo.valor}% (>${BANDA_TNA.saltoRelativoMax * 100}% relativo). tools/rotar-tna.ts NO lo va a escribir solo, por diseño.`,
      accion: "Verificar contra el BCRA y, si el salto es real, rotar y deployar a mano.",
    };
  }

  if (vivo.fecha > servido.fechaISO) {
    return {
      ...base,
      severidad: "atencion",
      fuente,
      detalle: `El fallback horneado quedó viejo. Impacto acotado: solo se muestra cuando el BCRA no le responde al navegador del usuario, y siempre con su fecha a la vista.`,
      accion: "Se arregla solo en el próximo deploy (tools/rotar-tna.ts corre como paso 0).",
    };
  }

  return { ...base, severidad: "ok", fuente, detalle: "El fallback horneado está al día." };
}

export function compararIpc(
  servidoDefault: { mensualPct: number; periodo: string },
  servidaSerie: ReadonlyArray<readonly [string, number]>,
  vivo: IpcVivo | null,
): Hallazgo[] {
  const ultimoServido = servidaSerie[servidaSerie.length - 1]?.[0] ?? "(serie vacía)";
  const base = {
    dato: "IPC / INFLACION_DEFAULT",
    sirve: `serie hasta ${ultimoServido} · default ${servidoDefault.mensualPct}% (${servidoDefault.periodo})`,
  };

  if (!vivo) {
    return [{
      ...base,
      severidad: "atencion",
      fuente: "sin respuesta",
      detalle: "La API de series de tiempo del INDEC no respondió. No se puede afirmar nada sobre el IPC en esta corrida.",
    }];
  }

  const fuente = `serie hasta ${vivo.periodo} · índice ${vivo.indice}`;
  const mensualVivo = Math.round((vivo.indice / vivo.previo - 1) * 1000) / 10;

  if (!(mensualVivo >= BANDA_IPC.min && mensualVivo <= BANDA_IPC.max)) {
    return [{
      ...base,
      severidad: "accion",
      fuente,
      detalle: `La variación derivada da ${mensualVivo}%, fuera de la banda (de ${BANDA_IPC.min} a ${BANDA_IPC.max}%). Huele a cambio de base de la serie.`,
      accion: "Revisar la serie 148.3_INIVELNAL_DICI_M_26 a mano antes de regenerar nada.",
    }];
  }

  if (vivo.periodo <= ultimoServido) {
    return [{ ...base, severidad: "ok", fuente, detalle: "La serie horneada llega al último período publicado." }];
  }

  const salto = Math.abs(mensualVivo - servidoDefault.mensualPct) > BANDA_IPC.saltoPpMax;

  return [{
    ...base,
    severidad: "accion",
    fuente,
    detalle:
      `El INDEC publicó ${periodoANombre(vivo.periodo)} (${mensualVivo}% mensual) y el sitio sirve la serie hasta ${ultimoServido}. ` +
      `Las páginas son estáticas: hasta que no se redeploye, el usuario ve el dato viejo.` +
      (salto ? ` OJO: salto de más de ${BANDA_IPC.saltoPpMax} p.p. contra el default guardado: verificar contra el informe del INDEC.` : ""),
    accion: ACCION_DATOS_AR,
  }];
}

export const ACCION_DATOS_AR =
  "Relanzar el workflow datos-vivos (workflow_dispatch) o correr npx tsx scripts/datos-vivos/correr.ts y pushear el commit que deja: el push a main es el deploy.";

// Bandas de la canasta: CBT/CBA es el coeficiente de Engel (~2,2) y la CBA no se mueve más de un 15%
// en un mes desde 2024. Fuera de eso es la API devolviendo columnas corridas (ya pasó, auditoría del
// 13/10/2026), no un dato.
export const BANDA_CANASTA = { engelMin: 1.5, engelMax: 3.5, saltoRelativoMax: 0.15 };

export function compararCanasta(
  servido: { periodo: string; cba: number; cbt: number },
  vivo: CanastaViva | null,
): Hallazgo {
  const base = {
    dato: "Canasta básica CBA/CBT",
    sirve: `${periodoANombre(servido.periodo)} · CBA ${servido.cba} · CBT ${servido.cbt}`,
  };
  if (!vivo) {
    return { ...base, severidad: "atencion", fuente: "sin respuesta", detalle: "La API de series de datos.gob.ar no respondió para la canasta." };
  }
  const fuente = `${periodoANombre(vivo.periodo)} · CBA ${vivo.cba} · CBT ${vivo.cbt}`;
  const engel = vivo.cbt / vivo.cba;
  const salto = Math.abs(vivo.cba - servido.cba) / servido.cba;
  if (!(vivo.cba > 0) || engel < BANDA_CANASTA.engelMin || engel > BANDA_CANASTA.engelMax || salto > BANDA_CANASTA.saltoRelativoMax * Math.max(1, mesesEntre(servido.periodo, vivo.periodo))) {
    return {
      ...base,
      severidad: "accion",
      fuente,
      detalle: `La respuesta no pasa la banda (CBT/CBA ${engel.toFixed(2)}, salto de la CBA ${(salto * 100).toFixed(1)}%). Puede ser la API con columnas corridas.`,
      accion: "Revisar la serie a mano en datos.gob.ar antes de regenerar nada.",
    };
  }
  if (vivo.periodo <= servido.periodo) {
    return { ...base, severidad: "ok", fuente, detalle: "La canasta horneada llega al último período publicado." };
  }
  return {
    ...base,
    severidad: "accion",
    fuente,
    detalle: `El INDEC publicó la canasta de ${periodoANombre(vivo.periodo)} y el sitio sirve hasta ${periodoANombre(servido.periodo)}.`,
    accion: ACCION_DATOS_AR,
  };
}

function mesesEntre(desde: string, hasta: string): number {
  const [a1, m1] = desde.split("-").map(Number);
  const [a2, m2] = hasta.split("-").map(Number);
  return (a2 - a1) * 12 + (m2 - m1);
}

// IPC y canastas del mes M salen el mismo día, a las 16:00 de Buenos Aires. Acá van SOLO fechas
// verificadas contra el calendario oficial; para las demás se estima el 15 del mes siguiente, que es
// tarde a propósito (el INDEC publica entre el 10 y el 15): un aviso un día tarde es mejor que uno
// falso todos los meses, que entrena a ignorar el mail.
export const PUBLICACION_INDEC: Readonly<Record<string, string>> = {
  "2026-09": "2026-10-13",
};

export function publicacionIndec(periodo: string): { fecha: string; verificada: boolean } {
  const verificada = PUBLICACION_INDEC[periodo];
  if (verificada) return { fecha: verificada, verificada: true };
  const [anio, mes] = periodo.split("-").map(Number);
  const siguiente = new Date(Date.UTC(anio, mes, 15));
  return { fecha: siguiente.toISOString().slice(0, 10), verificada: false };
}

function sumarMeses(periodo: string, n: number): string {
  const [anio, mes] = periodo.split("-").map(Number);
  const d = new Date(Date.UTC(anio, mes - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

/** El último período del INDEC cuya publicación (16:00 ART = 19:00 UTC) ya pasó. */
export function periodoIndecPublicado(ahora: Date): string {
  let p = ahora.toISOString().slice(0, 7);
  for (let i = 0; i < 4; i++, p = sumarMeses(p, -1)) {
    if (Date.parse(`${publicacionIndec(p).fecha}T19:00:00Z`) <= ahora.getTime()) return p;
  }
  return p;
}

/**
 * El dato servido contra el calendario: si ya pasó la publicación y el sitio sigue con el mes
 * anterior. Devuelve null cuando no hay nada que decir o cuando la fuente ya mostró el mes nuevo
 * (eso lo avisa la comparación contra la fuente, sin duplicar).
 */
export function vencidoPorCalendario(
  dato: string,
  ultimoServido: string,
  periodoFuente: string | null,
  ahora: Date,
): Hallazgo | null {
  const esperado = periodoIndecPublicado(ahora);
  if (ultimoServido >= esperado) return null;
  if (periodoFuente && periodoFuente > ultimoServido) return null;
  const { fecha, verificada } = publicacionIndec(esperado);
  const cuando = `${fecha.split("-").reverse().join("/")}${verificada ? "" : " (fecha estimada)"}`;
  const base = { dato: `${dato} (calendario INDEC)`, sirve: `hasta ${periodoANombre(ultimoServido)}` };
  if (periodoFuente === null) {
    return {
      ...base,
      severidad: "accion",
      fuente: "sin respuesta",
      detalle: `El INDEC publica ${periodoANombre(esperado)} el ${cuando} y el sitio sigue en ${periodoANombre(ultimoServido)}. La API no respondió, así que no se puede confirmar: mejor un aviso de más que un dato vencido sin avisar.`,
      accion: ACCION_DATOS_AR,
    };
  }
  return {
    ...base,
    severidad: "atencion",
    fuente: `API hasta ${periodoANombre(periodoFuente)}`,
    detalle: `Según el calendario, ${periodoANombre(esperado)} salía el ${cuando}, pero la API de datos.gob.ar todavía no lo tiene. Nada que cargar hasta que aparezca.`,
  };
}

export { diasHabilesEntre, MAX_DIAS_HABILES_DIARIA };

export type FuenteSerie =
  | { tipo: "punto"; fecha: string; valor: number }
  | { tipo: "caida"; detalle: string }
  | { tipo: "sin-consultar" };

export function compararSerie(args: {
  mercado: string;
  serie: { id: string; nombre: string; frecuencia: string; maxAntiguedadDias: number };
  ultimo: { fecha: string; valor: number } | null;
  hoy: string;
  fuente: FuenteSerie;
}): Hallazgo {
  const { serie, ultimo, hoy, fuente } = args;
  const base = { dato: `${args.mercado.toUpperCase()} ${serie.nombre} (${serie.id})`, sirve: ultimo ? `${ultimo.valor} · ${ultimo.fecha}` : "sin puntos" };
  const textoFuente =
    fuente.tipo === "punto" ? `${fuente.valor} · ${fuente.fecha}` : fuente.tipo === "caida" ? `sin respuesta (${fuente.detalle})` : "no consultada";
  const hayNuevo = fuente.tipo === "punto" && (!ultimo || fuente.fecha > ultimo.fecha);
  if (!ultimo) {
    return { ...base, severidad: "accion", fuente: textoFuente, detalle: "La serie no tiene puntos: las calculadoras que la usan no se publican.", accion: "Revisar src/paises/" + args.mercado + "/series.json." };
  }
  const edad = Math.round((Date.parse(`${hoy}T00:00:00Z`) - Date.parse(`${ultimo.fecha}T00:00:00Z`)) / 86_400_000);
  const habiles = diasHabilesEntre(ultimo.fecha, hoy);
  const vencida = edad > serie.maxAntiguedadDias;
  const vieja = serie.frecuencia === "diaria" && habiles > MAX_DIAS_HABILES_DIARIA;
  const accion = hayNuevo
    ? "La fuente ya tiene el dato: relanzar el workflow datos-paises (workflow_dispatch) o correr scripts/datos-paises/correr.ts y pushear."
    : "La fuente tampoco tiene un dato más nuevo: revisar el detector y el issue del país.";
  if (vencida) {
    return { ...base, severidad: "accion", fuente: textoFuente, detalle: `El último punto tiene ${edad} días (máximo ${serie.maxAntiguedadDias}): las calculadoras que la usan ya no se publican.`, accion };
  }
  if (vieja) {
    return { ...base, severidad: "accion", fuente: textoFuente, detalle: `Serie diaria con ${habiles} días hábiles sin dato nuevo (tope ${MAX_DIAS_HABILES_DIARIA}). Vence el ${sumarDiasISO(ultimo.fecha, serie.maxAntiguedadDias + 1)}.`, accion };
  }
  return {
    ...base,
    severidad: "ok",
    fuente: textoFuente,
    detalle: hayNuevo ? "La fuente tiene un punto más nuevo; entra en la próxima corrida de datos-paises." : "Al día.",
  };
}

function sumarDiasISO(fecha: string, dias: number): string {
  const d = new Date(`${fecha}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

// Las páginas AR se regeneran cada hora, pero varias eligen el mes a nivel de módulo (const MES =
// vigenteEn(...) fuera del componente), y eso queda congelado mientras viva la instancia de la
// función. Un redeploy el día 1 es lo único que lo garantiza.
export function compararMes(hoyBuild: string | null, hoy: string): Hallazgo {
  const base = { dato: "Cambio de mes (calcular.ar)", sirve: hoyBuild ? `build del ${hoyBuild}` : "sin fecha de build", fuente: `hoy ${hoy}` };
  if (!hoyBuild || hoyBuild.slice(0, 7) === hoy.slice(0, 7)) {
    return { ...base, severidad: "ok", detalle: "El deploy publicado es de este mes." };
  }
  return {
    ...base,
    severidad: "accion",
    detalle: `Este deploy se compiló en ${periodoANombre(hoyBuild.slice(0, 7))} y ya es ${periodoANombre(hoy.slice(0, 7))}. Las páginas pasan al mes nuevo en su próxima regeneración (dentro de la hora); un redeploy deja todo el sitio en el mes nuevo de una vez.`,
    accion: "Redeployar producción (vercel --prod o relanzar el workflow datos-vivos). Con VERCEL_DEPLOY_HOOK_URL configurada, el cron lo dispara solo.",
  };
}

const ORDEN: Severidad[] = ["ok", "atencion", "accion"];

export function resumir(hallazgos: Hallazgo[]): { severidadMax: Severidad; linea: string } {
  const severidadMax = hallazgos.reduce<Severidad>(
    (max, h) => (ORDEN.indexOf(h.severidad) > ORDEN.indexOf(max) ? h.severidad : max),
    "ok",
  );
  const accionables = hallazgos.filter((h) => h.severidad === "accion").map((h) => h.dato);
  const lista = accionables.length > 5 ? `${accionables.slice(0, 5).join(", ")} y ${accionables.length - 5} más` : accionables.join(", ");
  const linea = accionables.length
    ? `Datos para actualizar en calcular.ar y calcularya: ${lista}`
    : `Datos al día contra las fuentes (${hallazgos.length} chequeados)`;
  return { severidadMax, linea };
}

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function armarAviso(hallazgos: Hallazgo[], extra: string[] = []): { asunto: string; texto: string; html: string } {
  const { linea } = resumir(hallazgos);
  const relevantes = hallazgos
    .filter((h) => h.severidad !== "ok")
    .sort((a, b) => ORDEN.indexOf(b.severidad) - ORDEN.indexOf(a.severidad));
  const etiqueta = (s: Severidad) => (s === "accion" ? "ACCIÓN" : "atención");
  const texto = [
    "El cron de datos vivos comparó lo que sirven calcular.ar y calcularya contra las fuentes oficiales.",
    "",
    ...relevantes.flatMap((h) => [
      `[${etiqueta(h.severidad)}] ${h.dato}`,
      `  el sitio sirve: ${h.sirve}`,
      `  la fuente dice: ${h.fuente}`,
      `  ${h.detalle}`,
      ...(h.accion ? [`  Qué hacer: ${h.accion}`] : []),
      "",
    ]),
    ...extra,
    "Enviado por /api/cron/datos-vivos",
  ].join("\n");
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;color:#111827;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;max-width:640px;width:100%;"><tr><td style="padding:28px 32px;">
<p style="margin:0 0 18px;font-size:15px;line-height:1.5;">El cron de datos vivos comparó lo que sirven calcular.ar y calcularya contra las fuentes oficiales.</p>
${relevantes
  .map(
    (h) => `<div style="margin:0 0 18px;padding:14px 16px;border-left:4px solid ${h.severidad === "accion" ? "#b91c1c" : "#b45309"};background:#fafafa;">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${h.severidad === "accion" ? "#b91c1c" : "#b45309"};">${etiqueta(h.severidad)}</p>
<p style="margin:0 0 8px;font-size:16px;font-weight:600;">${esc(h.dato)}</p>
<p style="margin:0;font-size:14px;line-height:1.5;">El sitio sirve: ${esc(h.sirve)}<br>La fuente dice: ${esc(h.fuente)}</p>
<p style="margin:8px 0 0;font-size:14px;line-height:1.5;">${esc(h.detalle)}</p>
${h.accion ? `<p style="margin:8px 0 0;font-size:14px;line-height:1.5;"><strong>Qué hacer:</strong> ${esc(h.accion)}</p>` : ""}
</div>`,
  )
  .join("\n")}
${extra.map((l) => `<p style="margin:0 0 8px;font-size:14px;line-height:1.5;">${esc(l)}</p>`).join("\n")}
<p style="margin:18px 0 0;font-size:12px;color:#6b7280;">Enviado por /api/cron/datos-vivos</p>
</td></tr></table></td></tr></table></body></html>`;
  return { asunto: linea, texto, html };
}
