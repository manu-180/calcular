import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const MESES: Readonly<Record<string, number>> = {
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

function fecha(anio: number, mes: number, dia: number): FechaISO | null {
  const f = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

export interface TasaPortada {
  fecha: FechaISO;
  compra: number;
  venta: number;
}

// El archivo diario del BCRD es un XLSX (binario) y el Http del cron solo devuelve texto: por eso se lee
// el recuadro «Tipo de cambio» de la portada, que trae la tasa del último día publicado. El cron corre
// todos los días y la serie se arma punto a punto.
export function parsearPortadaBcrd(html: string): TasaPortada | null {
  const i = html.indexOf("alt='Tipo de cambio'");
  if (i < 0) return null;
  const bloque = html.slice(i, i + 3000);
  const f = /text-bolder-gb'>\s*(\d{1,2}) de ([A-Za-zé]+) (\d{4})\s*</.exec(bloque);
  const compra = /Compra<\/small>\s*<h5>\s*([\d.]+)\s*<\/h5>/.exec(bloque);
  const venta = /Venta<\/small>\s*<h5>\s*([\d.]+)\s*<\/h5>/.exec(bloque);
  if (!f || !compra || !venta) return null;
  const mes = MESES[f[2].toLowerCase()];
  const dia = mes ? fecha(Number(f[3]), mes, Number(f[1])) : null;
  const c = Number(compra[1]);
  const v = Number(venta[1]);
  if (!dia || !Number.isFinite(c) || !Number.isFinite(v) || c > v) return null;
  return { fecha: dia, compra: c, venta: v };
}

async function tasaPortada(http: Http): Promise<TasaPortada | null> {
  try {
    return parsearPortadaBcrd(await http.texto("https://www.bancentral.gov.do/"));
  } catch {
    return null;
  }
}

export function parsearPostsWordpress(json: unknown, tema: RegExp, desde: FechaISO): HallazgoNorma[] | null {
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const p of json) {
    const { date, link, title } = (p ?? {}) as { date?: unknown; link?: unknown; title?: { rendered?: unknown } };
    const titulo = typeof title?.rendered === "string" ? title.rendered.replace(/<[^>]+>/g, "").replace(/&#8211;|&#8212;/g, ",").replace(/\s+/g, " ").trim() : null;
    const f = typeof date === "string" ? date.slice(0, 10) : "";
    if (!titulo || typeof link !== "string" || !esFechaISO(f)) return null;
    if (f < desde || !tema.test(titulo)) continue;
    hallazgos.push({ titulo, url: link, fecha: f });
  }
  return hallazgos;
}

const DESDE_NORMAS: FechaISO = "2026-01-01";
const ULTIMA_TABLA_DGII = 2023;

// La DGII publica una tabla de retención para asalariados por año cuando cambia la escala. La última es
// la de 2023; una tabla de un año posterior quiere decir que hay escala nueva para cargar.
export function parsearTablasDgii(html: string): HallazgoNorma[] | null {
  if (!html.includes("Tabla de Retenciones")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/href="([^"]*Retenciones[^"]*?(\d{4})\.pdf)"/g)) {
    const anio = Number(m[2]);
    if (anio <= ULTIMA_TABLA_DGII) continue;
    const url = new URL(m[1].replace(/ /g, "%20"), "https://dgii.gov.do").toString();
    if (hallazgos.some((h) => h.url === url)) continue;
    hallazgos.push({ titulo: `Tabla de retención para asalariados ${anio}`, url, fecha: `${anio}-01-01` as FechaISO });
  }
  return hallazgos;
}


// Datos revisados a mano el 12/10/2026: los detectores nuevos avisan solo de lo publicado después.
const REVISADO_HASTA: FechaISO = "2026-10-12";
const ULTIMO_AJUSTE_DGII = 2026;

function fechaDdMmAaaa(texto: string): FechaISO | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto.trim());
  return m ? fecha(Number(m[3]), Number(m[2]), Number(m[1])) : null;
}

// Cada enero la DGII publica la resolución DDG-AR1-<año>-00001 con los montos ajustados por inflación
// (exento del IPI, tope del RST, límites para devolver la retención por intereses). Una del año
// siguiente al último cargado es la señal para actualizar esos datos.
export function parsearResolucionesAjuste(html: string): HallazgoNorma[] | null {
  if (!html.includes("AR1-")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/href="([^"]*DDG-\s*AR1-(\d{4})-00001\.pdf)"/g)) {
    const anio = Number(m[2]);
    if (anio <= ULTIMO_AJUSTE_DGII) continue;
    const url = new URL(m[1].replace(/ /g, "%20"), "https://dgii.gov.do").toString();
    if (hallazgos.some((h) => h.url === url)) continue;
    hallazgos.push({ titulo: `Resolución DDG-AR1-${anio}-00001: montos ajustados por inflación`, url, fecha: `${anio}-01-01` as FechaISO });
  }
  return hallazgos;
}

export function parsearAvisosDgii(html: string, tema: RegExp, desde: FechaISO): HallazgoNorma[] | null {
  if (!html.includes("avisosInformativos/Documents")) return null;
  const hallazgos: HallazgoNorma[] = [];
  const tarjeta = /<li data-title="([^"]+)" data-type="pdf" data-modified="([^"]+)"[\s\S]*?href="([^"]+)"[\s\S]*?file-card__date">([^<]*)</g;
  for (const m of html.matchAll(tarjeta)) {
    const f = fechaDdMmAaaa(m[2]);
    const descripcion = m[4].replace(/\s+/g, " ").trim();
    if (!f || f <= desde || !tema.test(descripcion)) continue;
    hallazgos.push({ titulo: `${m[1]}: ${descripcion}`, url: new URL(m[3].replace(/ /g, "%20"), "https://dgii.gov.do").toString(), fecha: f });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "do.dolar-compra-bcrd",
    carril: "serie",
    serie: "do.dolar-compra",
    metodo: "html",
    url: "https://www.bancentral.gov.do/",
    banda: { min: 45, max: 85, saltoRelativoMax: 0.05 },
    async traer(http) {
      const t = await tasaPortada(http);
      return t ? [{ fecha: t.fecha, valor: t.compra }] : null;
    },
  },
  {
    id: "do.dolar-venta-bcrd",
    carril: "serie",
    serie: "do.dolar-venta",
    metodo: "html",
    url: "https://www.bancentral.gov.do/",
    banda: { min: 45, max: 85, saltoRelativoMax: 0.05 },
    async traer(http): Promise<readonly PuntoSerie[] | null> {
      const t = await tasaPortada(http);
      return t ? [{ fecha: t.fecha, valor: t.venta }] : null;
    },
  },
  {
    id: "do.mt-salario-minimo",
    carril: "norma",
    datos: ["do.salario-minimo", "do.salario-minimo-hogar", "do.salario-minimo-zona-franca"],
    metodo: "api-json",
    url: "https://mt.gob.do/wp-json/wp/v2/posts?search=salario%20m%C3%ADnimo&per_page=30&_fields=date,link,title",
    async traer(http) {
      return parsearPostsWordpress(await http.json(this.url), /salari|aumento|Comit[eé] Nacional de Salarios|CNS/i, DESDE_NORMAS);
    },
  },
  {
    id: "do.tss-topes-tasas",
    carril: "norma",
    datos: [
      "do.salario-minimo-nacional",
      "do.tope-sfs",
      "do.tope-afp",
      "do.tope-srl",
      "do.sfs-trabajador",
      "do.afp-trabajador",
      "do.sfs-empleador",
      "do.afp-empleador",
      "do.srl-fijo",
    ],
    metodo: "api-json",
    url: "https://tss.gob.do/wp-json/wp/v2/posts?search=topes&per_page=30&_fields=date,link,title",
    async traer(http) {
      return parsearPostsWordpress(await http.json(this.url), /tope|cotizaci|salario m[ií]nimo|porcentaje|tasa/i, DESDE_NORMAS);
    },
  },
  {
    id: "do.dgii-tabla-retenciones",
    carril: "norma",
    datos: ["do.isr-asalariados"],
    metodo: "html",
    url: "https://dgii.gov.do/publicacionesOficiales/tablaRetenciones/Paginas/default.aspx",
    async traer(http) {
      return parsearTablasDgii(await http.texto(this.url));
    },
  },
  {
    id: "do.dgii-ajuste-inflacion",
    carril: "norma",
    datos: ["do.ipi-exento", "do.devolucion-intereses-limites", "do.rst-tope-ingresos"],
    metodo: "html",
    url: "https://dgii.gov.do/legislacion/resoluciones/Paginas/default.aspx",
    async traer(http) {
      return parsearResolucionesAjuste(await http.texto(this.url));
    },
  },
  {
    id: "do.dgii-avisos-tributarios",
    carril: "norma",
    datos: [
      "do.retencion-honorarios",
      "do.retencion-alquileres",
      "do.retencion-premios-loteria",
      "do.retencion-premios-bancas",
      "do.retencion-intereses",
      "do.retencion-dividendos",
      "do.impuesto-transferencias",
      "do.gastos-educativos-tope-ingreso",
      "do.gastos-educativos-tope-exento",
      "do.gastos-educativos-tope-discapacidad",
      "do.ipi-tasa",
      "do.ganancia-capital-inmuebles",
    ],
    metodo: "html",
    url: "https://dgii.gov.do/publicacionesOficiales/avisosInformativos/Paginas/default.aspx",
    async traer(http) {
      return parsearAvisosDgii(
        await http.texto(this.url),
        /retenci|transferencia|cheque|educativ|patrimonio|IPI|ganancia de capital|dividend|premio|30-26|Ley n[uú]m/i,
        REVISADO_HASTA,
      );
    },
  },
  {
    id: "do.dida-subsidios",
    carril: "norma",
    datos: ["do.maternidad-semanas", "do.maternidad-semanas-antes", "do.lactancia-porcentaje", "do.lactancia-meses", "do.enfermedad-ambulatoria", "do.enfermedad-hospitalaria", "do.enfermedad-semanas"],
    metodo: "api-json",
    url: "https://www.dida.gob.do/wp-json/wp/v2/posts?search=subsidio&per_page=30&_fields=date,link,title",
    async traer(http) {
      return parsearPostsWordpress(await http.json(this.url), /maternidad|lactancia|enfermedad|subsidio/i, REVISADO_HASTA);
    },
  },
];
