import { esFechaISO, fechaEnZona, sumarDias } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import datos from "./datos.json";

const ZONA = "America/Santiago";
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const URL_UF = (anio: number) => `https://www.sii.cl/valores_y_fechas/uf/uf${anio}.htm`;
const URL_UTM = (anio: number) => `https://www.sii.cl/valores_y_fechas/utm/utm${anio}.htm`;

// Las series se cruzan con mindicador.cl (agregador, no oficial): el SII manda, y si en algún día que
// publican los dos el valor no coincide, el detector no devuelve nada y la serie no se toca.
const CRUCE_UF = "https://mindicador.cl/api/uf";
const CRUCE_UTM = "https://mindicador.cl/api/utm";
const MIN_COINCIDENCIAS = 5;

function numeroChileno(texto: string): number | null {
  const limpio = texto.trim();
  if (!/^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/.test(limpio)) return null;
  return Number(limpio.split(".").join("").replace(",", "."));
}

function fecha(anio: number, mes: number, dia: number): FechaISO | null {
  const f = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

export function parsearUfSii(html: string, anio: number): PuntoSerie[] {
  const puntos: PuntoSerie[] = [];
  MESES.forEach((nombre, i) => {
    const inicio = html.indexOf(`id='mes_${nombre}'`);
    if (inicio < 0) return;
    const fin = html.indexOf("</table>", inicio);
    const bloque = html.slice(inicio, fin < 0 ? undefined : fin);
    for (const m of bloque.matchAll(/<strong>(\d{1,2})<\/strong><\/th>\s*<td[^>]*>([^<]*)<\/td>/g)) {
      const valor = numeroChileno(m[2]);
      const f = fecha(anio, i + 1, Number(m[1]));
      if (valor !== null && f) puntos.push({ fecha: f, valor });
    }
  });
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

export function parsearUtmSii(html: string, anio: number): PuntoSerie[] {
  const puntos: PuntoSerie[] = [];
  MESES.forEach((nombre, i) => {
    const etiqueta = nombre[0].toUpperCase() + nombre.slice(1);
    const m = new RegExp(`<th>${etiqueta}</th>\\s*<td>([^<]*)</td>`).exec(html);
    const valor = m ? numeroChileno(m[1]) : null;
    const f = fecha(anio, i + 1, 1);
    if (valor !== null && f) puntos.push({ fecha: f, valor });
  });
  return puntos;
}

// En la tabla UTM - UTA - IPC del SII la tercera celda de cada mes es el IPC en puntos (base 2023 = 100
// desde 2024; las páginas de años anteriores traen la base 2018 y no sirven para esta serie).
export function parsearIpcSii(html: string, anio: number): PuntoSerie[] {
  const puntos: PuntoSerie[] = [];
  MESES.forEach((nombre, i) => {
    const etiqueta = nombre[0].toUpperCase() + nombre.slice(1);
    const m = new RegExp(`<th>${etiqueta}</th>\\s*<td>[^<]*</td>\\s*<td>[^<]*</td>\\s*<td[^>]*>([^<]*)</td>`).exec(html);
    const valor = m ? numeroChileno(m[1]) : null;
    const f = fecha(anio, i + 1, 1);
    if (valor !== null && f) puntos.push({ fecha: f, valor });
  });
  return puntos;
}

// El IPC de diciembre sale en enero y queda en la página del año anterior.
async function traerIpcSii(http: Http): Promise<PuntoSerie[] | null> {
  const hoy = fechaEnZona(new Date(), ZONA);
  const anio = Number(hoy.slice(0, 4));
  const puntos: PuntoSerie[] = [];
  if (hoy.slice(5, 7) === "01") {
    const anterior = await textoOpcional(http, URL_UTM(anio - 1));
    if (anterior) puntos.push(...parsearIpcSii(anterior, anio - 1));
  }
  const html = await textoOpcional(http, URL_UTM(anio));
  if (html) puntos.push(...parsearIpcSii(html, anio));
  if (puntos.length === 0 || (html && !html.includes("Indice de Precios al Consumidor"))) return null;
  return puntos.slice(-3);
}

export function parsearMindicador(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null || !Array.isArray((json as { serie?: unknown }).serie)) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of (json as { serie: unknown[] }).serie) {
    const { fecha: f, valor } = (p ?? {}) as { fecha?: unknown; valor?: unknown };
    if (typeof f !== "string" || typeof valor !== "number") return null;
    const instante = new Date(f);
    if (Number.isNaN(instante.getTime())) return null;
    puntos.push({ fecha: fechaEnZona(instante, ZONA), valor });
  }
  return puntos;
}

export function cruzar(oficial: readonly PuntoSerie[], cruce: readonly PuntoSerie[]): { coinciden: number; difieren: string[] } {
  const mapa = new Map(oficial.map((p) => [p.fecha, p.valor]));
  let coinciden = 0;
  const difieren: string[] = [];
  for (const p of cruce) {
    const v = mapa.get(p.fecha);
    if (v === undefined) continue;
    if (Math.abs(v - p.valor) < 0.005) coinciden++;
    else difieren.push(`${p.fecha}: SII ${v}, mindicador ${p.valor}`);
  }
  return { coinciden, difieren };
}

async function textoOpcional(http: Http, url: string): Promise<string | null> {
  try {
    return await http.texto(url);
  } catch {
    return null;
  }
}

// El cron compara cada punto nuevo contra el último guardado (salto máximo de la banda): por eso se
// devuelven solo los puntos recientes y no el año entero.
async function traerSerieCruzada(
  http: Http,
  urlDe: (anio: number) => string,
  parsear: (html: string, anio: number) => PuntoSerie[],
  urlCruce: string,
  diasAtras: number,
): Promise<PuntoSerie[] | null> {
  // Cada paso que falla tira un error con el motivo en vez de devolver null: en el runner de GitHub
  // la UF y la UTM salían "traer devolvió null" y en local andaban (issue #19), y con null no había
  // forma de saber si el que fallaba era el SII, mindicador o el cruce.
  const hoy = fechaEnZona(new Date(), ZONA);
  const anio = Number(hoy.slice(0, 4));
  const html = await http.texto(urlDe(anio));
  const oficiales = parsear(html, anio);
  if (hoy.slice(5, 7) === "12") {
    const siguiente = await textoOpcional(http, urlDe(anio + 1));
    if (siguiente) oficiales.push(...parsear(siguiente, anio + 1));
  }
  if (oficiales.length === 0) throw new Error(`el SII respondió sin valores reconocibles en ${urlDe(anio)} (${html.length} bytes)`);
  const json = await http.json(urlCruce).catch((err: Error) => {
    throw new Error(`mindicador (cruce) falló: ${err.message}`);
  });
  const cruce = parsearMindicador(json);
  if (!cruce) throw new Error(`mindicador (cruce) respondió con otra forma: ${JSON.stringify(json).slice(0, 80)}`);
  const { coinciden, difieren } = cruzar(oficiales, cruce);
  if (difieren.length > 0) throw new Error(`el SII y mindicador no coinciden: ${difieren.slice(0, 3).join("; ")}`);
  if (coinciden < Math.min(MIN_COINCIDENCIAS, cruce.length)) {
    throw new Error(`solo ${coinciden} fecha(s) en común entre el SII y mindicador (mínimo ${Math.min(MIN_COINCIDENCIAS, cruce.length)}; mindicador trajo ${cruce.length}, la primera ${cruce[0]?.fecha ?? "ninguna"})`);
  }
  const desde = sumarDias(hoy, -diasAtras);
  return oficiales.filter((p) => p.fecha >= desde);
}

const RE_NORMA = /<NORMA idNorma='(\d+)'[^>]*>[\s\S]*?<FECHA_PUBLICACION>([\d-]+)<\/FECHA_PUBLICACION>[\s\S]*?<TITULO>([\s\S]*?)<\/TITULO>/g;
const TEMAS = /ingreso m[ií]nimo|asignaci[oó]n familiar|subsidio familiar|jornada|horas extraordinarias|feriado|indemnizaci[oó]n|gratificaci[oó]n|c[oó]digo del trabajo|impuesto|honorarios|tope imponible|cotizaci[oó]n|seguro de cesant[ií]a|sistema de pensiones|pensi[oó]n garantizada|unidad de fomento|aguinaldo|reajuste general|alimentos|incapacidad laboral|maternidad|postnatal/i;

export function parsearNormasBcn(xml: string): HallazgoNorma[] | null {
  if (!xml.includes("<NORMAS")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of xml.matchAll(RE_NORMA)) {
    const titulo = m[3].replace(/\s+/g, " ").trim();
    if (!esFechaISO(m[2]) || !TEMAS.test(titulo)) continue;
    hallazgos.push({ titulo, url: `https://www.bcn.cl/leychile/navegar?idNorma=${m[1]}`, fecha: m[2] });
  }
  return hallazgos;
}

const MES_NUMERO: Record<string, number> = Object.fromEntries(MESES.map((m, i) => [m, i + 1]));
const RE_RESOLUCION_FCS = /Resoluci[oó]n Exenta N[°º] ?([\d.]+), del (\d{1,2}) de ([a-z]+) de (\d{4}), que actualiza tablas de valores superiores e inferiores/gi;

// La Superintendencia de Pensiones lista sus resoluciones del seguro de cesantía. Cada marzo sale una
// que fija los montos mínimos y máximos del Fondo de Cesantía Solidario.
export function parsearResolucionesFcs(html: string, url: string): HallazgoNorma[] | null {
  if (!html.includes("Seguro de Desempleo") && !html.includes("Seguro de Cesant")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(RE_RESOLUCION_FCS)) {
    const f = fecha(Number(m[4]), MES_NUMERO[m[3].toLowerCase()] ?? 0, Number(m[2]));
    if (!f) continue;
    const titulo = `Resolución exenta ${m[1]} de la Superintendencia de Pensiones: valores superiores e inferiores del seguro de cesantía`;
    if (!hallazgos.some((h) => h.titulo === titulo)) hallazgos.push({ titulo, url, fecha: f });
  }
  return hallazgos;
}

function montosEnPesos(html: string): Set<number> {
  const montos = new Set<number>();
  for (const m of html.matchAll(/\$\s?(\d{1,3}(?:\.\d{3})+)/g)) montos.add(Number(m[1].split(".").join("")));
  return montos;
}

function valoresVigentesPgu(): number[] {
  const ultimo = (id: string) => {
    const tramos = datos.datos.find((d) => d.id === id)?.tramos.filter((t) => t.estado === "verificado") ?? [];
    return tramos[tramos.length - 1]?.valor;
  };
  const maxima = ultimo("cl.pgu-maxima") as Record<string, number> | undefined;
  const inferior = ultimo("cl.pgu-pension-inferior");
  return [...Object.values(maxima ?? {}), ...(typeof inferior === "number" ? [inferior] : [])];
}

// ChileAtiende no publica normas sino la ficha de la PGU. Si alguno de los montos cargados ya no
// aparece en la ficha, es señal de reajuste: se avisa para revisarlo a mano, nunca se escribe solo.
export function revisarFichaPgu(html: string, esperados: readonly number[], url: string, hoy: FechaISO): HallazgoNorma[] | null {
  if (!html.includes("Pensión Garantizada Universal") && !html.includes("PGU")) return null;
  const montos = montosEnPesos(html);
  if (montos.size === 0 || esperados.length === 0) return null;
  const faltan = esperados.filter((v) => !montos.has(v));
  return faltan.length ? [{ titulo: `ChileAtiende cambió los montos de la PGU (ya no muestra ${faltan.join(", ")})`, url, fecha: hoy }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "cl.uf-sii",
    carril: "serie",
    serie: "cl.uf",
    metodo: "html",
    url: "https://www.sii.cl/valores_y_fechas/uf/uf2026.htm",
    banda: { min: 38000, max: 50000, saltoRelativoMax: 0.005 },
    traer: (http) => traerSerieCruzada(http, URL_UF, parsearUfSii, CRUCE_UF, 10),
  },
  {
    id: "cl.utm-sii",
    carril: "serie",
    serie: "cl.utm",
    metodo: "html",
    url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm",
    banda: { min: 65000, max: 85000, saltoRelativoMax: 0.03 },
    traer: (http) => traerSerieCruzada(http, URL_UTM, parsearUtmSii, CRUCE_UTM, 70),
  },
  {
    id: "cl.ipc-sii",
    carril: "serie",
    serie: "cl.ipc",
    metodo: "html",
    url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm",
    banda: { min: 100, max: 140, saltoRelativoMax: 0.03 },
    traer: traerIpcSii,
  },
  {
    id: "cl.bcn-normas",
    carril: "norma",
    datos: [
      "cl.imm",
      "cl.imm-menores-mayores",
      "cl.imm-no-remuneracional",
      "cl.jornada-maxima",
      "cl.retencion-honorarios",
      "cl.tope-imponible",
      "cl.tope-imponible-cesantia",
      "cl.impuesto-unico",
      "cl.iva",
      "cl.asignacion-familiar",
      "cl.subsidio-familiar",
      "cl.cotizacion-empleador-pensiones",
      "cl.global-complementario",
      "cl.alimentos-minimo-un-hijo",
      "cl.alimentos-minimo-varios",
      "cl.alimentos-maximo",
      "cl.feriado-progresivo-anios-base",
      "cl.prenatal-dias",
      "cl.postnatal-dias",
      "cl.postnatal-parental-dias",
      "cl.aguinaldo-navidad-pensionados",
      "cl.aguinaldo-fiestas-patrias-pensionados",
      "cl.licencia-dias-carencia",
      "cl.subsidio-minimo",
    ],
    metodo: "api-xml",
    url: "https://www.leychile.cl/Consulta/obtxml?opt=3&cantidad=100",
    async traer(http) {
      const xml = await textoOpcional(http, this.url);
      return xml ? parsearNormasBcn(xml) : null;
    },
  },
  {
    id: "cl.sp-resoluciones-cesantia",
    carril: "norma",
    datos: ["cl.fcs-porcentaje", "cl.fcs-valor-superior", "cl.fcs-valor-inferior"],
    metodo: "html",
    url: "https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-5941.html",
    userAgentNavegador: true,
    async traer(http) {
      const html = await textoOpcional(http, this.url);
      return html ? parsearResolucionesFcs(html, this.url) : null;
    },
  },
  {
    id: "cl.pgu-chileatiende",
    carril: "norma",
    datos: ["cl.pgu-maxima", "cl.pgu-pension-inferior", "cl.pgu-pension-superior"],
    metodo: "html",
    url: "https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu",
    userAgentNavegador: true,
    async traer(http) {
      const html = await textoOpcional(http, this.url);
      return html ? revisarFichaPgu(html, valoresVigentesPgu(), this.url, fechaEnZona(new Date(), ZONA)) : null;
    },
  },
];
