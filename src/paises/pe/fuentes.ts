import type { Detector, DetectorNorma, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const URL_TC_SUNAT = "https://www.sunat.gob.pe/a/txt/tipoCambio.txt";
const BUSCADOR_PERUANO = "https://busquedas.elperuano.pe";

// SUNAT publica una sola línea con el día vigente: "07/10/2026|3.431|3.437|" (fecha, compra, venta).
async function tipoCambioSunat(http: Http, columna: 1 | 2): Promise<PuntoSerie[] | null> {
  const texto = (await http.texto(URL_TC_SUNAT)).trim();
  const m = /^(\d{2})\/(\d{2})\/(\d{4})\|(\d+(?:\.\d+)?)\|(\d+(?:\.\d+)?)\|?$/.exec(texto);
  if (!m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  const valor = Number(columna === 1 ? m[4] : m[5]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

const MESES_BCRP: Record<string, string> = {
  Ene: "01", Feb: "02", Mar: "03", Abr: "04", May: "05", Jun: "06",
  Jul: "07", Ago: "08", Set: "09", Sep: "09", Oct: "10", Nov: "11", Dic: "12",
};

// La API del BCRP responde JSON con content-type text/html y nombra los días "06.Oct.26";
// los feriados vienen como "n.d." y se saltean. Sin rango de fechas pega al final un aviso de PHP
// en HTML (probado el 7/10/2026), por eso se pide con rango y se corta en el primer "<".
async function serieDiariaBcrp(http: Http, base: string, diasAtras: number): Promise<PuntoSerie[] | null> {
  const hasta = new Date();
  const desde = new Date(hasta.getTime() - diasAtras * 86_400_000);
  const url = `${base}/${desde.toISOString().slice(0, 10)}/${hasta.toISOString().slice(0, 10)}`;
  let json: unknown;
  try {
    const texto = await http.texto(url);
    const corte = texto.indexOf("<");
    json = JSON.parse(corte === -1 ? texto : texto.slice(0, corte));
  } catch {
    return null;
  }
  const periodos = (json as { periods?: unknown }).periods;
  if (!Array.isArray(periodos)) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of periodos as { name?: unknown; values?: unknown }[]) {
    if (typeof p.name !== "string" || !Array.isArray(p.values)) return null;
    const m = /^(\d{2})\.([A-Za-z]{3})\.(\d{2})$/.exec(p.name);
    const mes = m ? MESES_BCRP[m[2]] : undefined;
    if (!m || !mes) return null;
    const fecha = `20${m[3]}-${mes}-${m[1]}`;
    const valor = Number(p.values[0]);
    if (!esFechaISO(fecha)) return null;
    if (Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

// Serie mensual del BCRP: los periodos vienen como "Ago.2026" o "Set.2026". Se piden los últimos
// meses con rango (sin rango la API pega un aviso de PHP al final) y se devuelven los tres últimos,
// porque la banda compara cada punto con el último guardado.
async function serieMensualBcrp(http: Http, base: string): Promise<PuntoSerie[] | null> {
  const hasta = new Date();
  const desde = new Date(Date.UTC(hasta.getUTCFullYear(), hasta.getUTCMonth() - 6, 1));
  const url = `${base}/${desde.getUTCFullYear()}-${desde.getUTCMonth() + 1}/${hasta.getUTCFullYear()}-${hasta.getUTCMonth() + 1}`;
  let json: unknown;
  try {
    const texto = await http.texto(url);
    const corte = texto.indexOf("<");
    json = JSON.parse(corte === -1 ? texto : texto.slice(0, corte));
  } catch {
    return null;
  }
  const periodos = (json as { periods?: unknown }).periods;
  if (!Array.isArray(periodos) || periodos.length === 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of periodos as { name?: unknown; values?: unknown }[]) {
    if (typeof p.name !== "string" || !Array.isArray(p.values)) return null;
    const m = /^([A-Za-z]{3})\.(\d{4})$/.exec(p.name);
    const mes = m ? MESES_BCRP[m[1]] : undefined;
    if (!m || !mes) return null;
    const fecha = `${m[2]}-${mes}-01`;
    const valor = Math.round(Number(p.values[0]) * 1e6) / 1e6;
    if (!esFechaISO(fecha)) return null;
    if (Number.isFinite(valor)) puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos.slice(-3) : null;
}

const MESES_ES: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8,
  setiembre: 9, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

// El FSD publica en su página "El monto máximo de cobertura (MMC) es S/ 123,000 para el periodo
// Setiembre – Noviembre 2026" (leído el 12/10/2026). El punto se fecha el día 1 del primer mes del
// trimestre; si el periodo cruza el año (diciembre a febrero), el primer mes es del año anterior.
async function coberturaFsd(http: Http): Promise<PuntoSerie[] | null> {
  const html = await http.texto("https://fsd.org.pe/cobertura/", { userAgentNavegador: true });
  const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|\s+/g, " ");
  const m = /monto m[aá]ximo de cobertura.{0,80}?S\/\s*([\d,]+(?:\.\d+)?).{0,120}?periodo\s+([A-Za-zÁÉÍÓÚáéíóú]+)\s*[–-]\s*([A-Za-zÁÉÍÓÚáéíóú]+)\s+(\d{4})/i.exec(texto);
  if (!m) return null;
  const valor = Number(m[1].replace(/,/g, ""));
  const desde = MESES_ES[m[2].toLowerCase()];
  const hasta = MESES_ES[m[3].toLowerCase()];
  if (!Number.isFinite(valor) || !desde || !hasta) return null;
  const anio = Number(m[4]) - (desde > hasta ? 1 : 0);
  const fecha = `${anio}-${String(desde).padStart(2, "0")}-01`;
  if (!esFechaISO(fecha)) return null;
  return [{ fecha, valor }];
}

function aCompacta(d: Date): string {
  return d.toISOString().slice(0, 10).replaceAll("-", "");
}

// El buscador de El Peruano es una app de React Router: con _data=routes/_index devuelve el HTML
// ya renderizado con los resultados, y el título de cada norma está en el enlace "line-clamp-3".
// La fecha no viene en la tarjeta: se lee de la página del dispositivo, solo para los que coinciden.
async function buscarEnElPeruano(http: Http, consulta: string, titulo: RegExp, diasAtras: number): Promise<HallazgoNorma[] | null> {
  const hasta = new Date();
  const desde = new Date(hasta.getTime() - diasAtras * 86_400_000);
  const params = new URLSearchParams({ query: consulta, ci: "all", fechaIni: aCompacta(desde), fechaFin: aCompacta(hasta), _data: "routes/_index" });
  const html = await http.texto(`${BUSCADOR_PERUANO}/?${params}`, { userAgentNavegador: true });
  if (!html.includes("Búsquedas El Peruano")) return null;
  const vistos = new Set<string>();
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<a class="[^"]*line-clamp-3"[^>]*href="(\/dispositivo\/[A-Z]{2}\/[\d-]+)"[^>]*>([^<]+)<\/a>/g)) {
    const [, ruta, texto] = m;
    if (vistos.has(ruta) || !titulo.test(texto)) continue;
    vistos.add(ruta);
    const url = `${BUSCADOR_PERUANO}${ruta}`;
    const pagina = await http.texto(url, { userAgentNavegador: true });
    // React deja un comentario vacío entre la etiqueta y la fecha: "Fecha de publicación: <!-- -->28/09/2026".
    const f = /Fecha de publicaci[oó]n:\s*(?:<!--\s*-->)?\s*(\d{2})\/(\d{2})\/(\d{4})/.exec(pagina);
    const fecha = f ? `${f[3]}-${f[2]}-${f[1]}` : null;
    if (!esFechaISO(fecha)) continue;
    hallazgos.push({ titulo: texto.trim(), url, fecha: fecha as FechaISO });
  }
  return hallazgos;
}

function vigiaElPeruano(id: string, datos: readonly string[], consulta: string, titulo: RegExp): DetectorNorma {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `${BUSCADOR_PERUANO}/`,
    userAgentNavegador: true,
    traer: (http) => buscarEnElPeruano(http, consulta, titulo, 7),
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "pe.tc-sunat-compra",
    carril: "serie",
    serie: "pe.tc-sunat-compra",
    metodo: "html",
    url: URL_TC_SUNAT,
    banda: { min: 2.8, max: 4.5, saltoRelativoMax: 0.05 },
    traer: (http) => tipoCambioSunat(http, 1),
  },
  {
    id: "pe.tc-sunat-venta",
    carril: "serie",
    serie: "pe.tc-sunat-venta",
    metodo: "html",
    url: URL_TC_SUNAT,
    banda: { min: 2.8, max: 4.5, saltoRelativoMax: 0.05 },
    traer: (http) => tipoCambioSunat(http, 2),
  },
  {
    id: "pe.tc-sbs-bcrp",
    carril: "serie",
    serie: "pe.tc-sbs-venta",
    metodo: "api-json",
    url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PD04640PD/json",
    banda: { min: 2.8, max: 4.5, saltoRelativoMax: 0.05 },
    traer(http) {
      return serieDiariaBcrp(http, this.url, 20);
    },
  },
  {
    id: "pe.ipc-bcrp",
    carril: "serie",
    serie: "pe.ipc",
    metodo: "api-json",
    url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PN38705PM/json",
    banda: { min: 110, max: 150, saltoRelativoMax: 0.03 },
    traer(http) {
      return serieMensualBcrp(http, this.url);
    },
  },
  vigiaElPeruano("pe.el-peruano-rmv",["pe.rmv"], "Remuneración Mínima Vital", /remuneraci[oó]n m[ií]nima vital/i),
  vigiaElPeruano("pe.el-peruano-uit", ["pe.uit"], "Unidad Impositiva Tributaria", /valor de la unidad impositiva tributaria/i),
  vigiaElPeruano("pe.el-peruano-cuarta", ["pe.suspension-cuarta", "pe.retencion-cuarta"], "cuarta categoría", /cuarta categor[ií]a/i),
  vigiaElPeruano("pe.el-peruano-cts", ["pe.cts-por-regimen", "pe.cts-libre-disposicion"], "Compensación por Tiempo de Servicios", /compensaci[oó]n por tiempo de servicios/i),
  vigiaElPeruano(
    "pe.el-peruano-gratificacion",
    ["pe.bonificacion-extraordinaria", "pe.gratificacion-por-regimen"],
    "gratificaciones",
    /gratificaci[oó]n(es)? (por|de) (fiestas patrias|navidad)|bonificaci[oó]n extraordinaria/i,
  ),
  // El título solo con "Impuesto General a las Ventas" trae listas de percepciones y exoneraciones
  // (falso positivo del 30/9/2026): se exige que hable de la tasa.
  vigiaElPeruano(
    "pe.el-peruano-igv",
    ["pe.tasa-igv", "pe.tasa-ipm", "pe.tasa-igv-restaurantes"],
    "Impuesto General a las Ventas",
    /(tasa|al[ií]cuota|incremento|reducci[oó]n|reduce|incrementa)[^.]{0,80}(impuesto general a las ventas|promoci[oó]n municipal)|impuesto de promoci[oó]n municipal/i,
  ),
  {
    id: "pe.fsd-cobertura",
    carril: "serie",
    serie: "pe.fsd-cobertura",
    metodo: "html",
    url: "https://fsd.org.pe/cobertura/",
    userAgentNavegador: true,
    banda: { min: 80000, max: 250000, saltoRelativoMax: 0.1 },
    traer: (http) => coberturaFsd(http),
  },
  // Las municipalidades también fijan su TIM (falso positivo probado con marzo de 2021): solo la de SUNAT.
  vigiaElPeruano("pe.el-peruano-tim", ["pe.tim"], "Tasa de Interés Moratorio", /tasa de inter[eé]s moratorio.{0,120}sunat/i),
  vigiaElPeruano(
    "pe.el-peruano-detracciones",
    ["pe.detraccion-servicios", "pe.monto-minimo-detraccion"],
    "Sistema de Pago de Obligaciones Tributarias",
    /sistema de pago de obligaciones tributarias|detracci[oó]n/i,
  ),
  vigiaElPeruano("pe.el-peruano-itf", ["pe.tasa-itf"], "Impuesto a las Transacciones Financieras", /impuesto a las transacciones financieras/i),
  // Solo normas que modifican la ley o los regímenes MYPE: el buscador devuelve muchas resoluciones de
  // trámite que mencionan "impuesto a la renta" sin tocar tasas.
  vigiaElPeruano(
    "pe.el-peruano-renta",
    ["pe.tasa-renta-capital", "pe.deduccion-renta-capital", "pe.tasa-dividendos", "pe.tasa-renta-tercera", "pe.pago-cuenta-tercera", "pe.escala-rmt", "pe.pago-cuenta-rmt", "pe.limite-pago-cuenta-rmt", "pe.limite-rmt", "pe.tasa-rer", "pe.limite-rer", "pe.gasto-deducible"],
    "Ley del Impuesto a la Renta",
    /(modifica|sustituye|incorpora)[^.]{0,80}ley del impuesto a la renta|r[eé]gimen mype tributario|r[eé]gimen especial del impuesto a la renta|gastos? deducibles?/i,
  ),
  vigiaElPeruano(
    "pe.el-peruano-utilidades",
    ["pe.utilidades-por-actividad", "pe.tope-utilidades", "pe.minimo-trabajadores-utilidades"],
    "participación en las utilidades",
    /participaci[oó]n (de los trabajadores )?en las utilidades/i,
  ),
];
