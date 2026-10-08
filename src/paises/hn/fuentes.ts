import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";
import { esFechaISO, fechaEnZona } from "@/motor/vigencia";

const ZONA = "America/Tegucigalpa";

// La portada de bch.hn arma el indicador del tipo de cambio desde esta lista de SharePoint, que
// responde a un GET anónimo. Sin el Accept con odata=nometadata SharePoint devuelve XML (Atom).
const URL_TIPO_CAMBIO =
  "https://www.bch.hn/_api/web/lists(guid'08a9876c-c6f1-4e73-8d13-0039b0442fab')/items?$select=Fecha,Valor,Observacion&$top=15&$orderby=Fecha%20desc";

// El BCH guarda la fecha como medianoche de Tegucigalpa expresada en UTC (06:00Z).
export function leerTipoCambio(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null || !Array.isArray((json as { value?: unknown }).value)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of (json as { value: unknown[] }).value) {
    const { Fecha, Valor } = (fila ?? {}) as { Fecha?: unknown; Valor?: unknown };
    if (typeof Fecha !== "string" || typeof Valor !== "number" || !Number.isFinite(Valor) || Valor <= 0) return null;
    const instante = new Date(Fecha);
    if (Number.isNaN(instante.getTime())) return null;
    const fecha = fechaEnZona(instante, ZONA);
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Valor });
  }
  if (puntos.length === 0) return null;
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
  return puntos.filter((p, i) => i === 0 || p.fecha !== puntos[i - 1].fecha);
}

const URL_INFLACION =
  "https://www.bch.hn/_api/web/lists(guid'de39aaba-3f0c-4a14-a5e5-ce7827f2ad4d')/items?$select=Fecha,Valor1,Valor2,Valor3&$top=500";
const MES_CORTO: Readonly<Record<string, number>> = { ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6, jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12 };

// El nivel del IPC del BCH solo sale por su API con clave. Esta lista (la del indicador de la
// portada) trae la inflación acumulada de cada mes desde enero 2021: el índice se arma encadenando
// cada diciembre, con diciembre 2020 = 100. Acumulada y no mensual porque la mensual viene mezclada
// con "pp" en 2022-2024 y porque así el redondeo no se arrastra mes a mes. Si falta un mes o la lista
// ya no empieza en enero 2021, el índice cambiaría de base: mejor null que una serie corrida.
export function reconstruirIpc(json: unknown): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null || !Array.isArray((json as { value?: unknown }).value)) return null;
  const filas: { anio: number; mes: number; acumulada: number }[] = [];
  for (const fila of (json as { value: unknown[] }).value) {
    const { Fecha, Valor2 } = (fila ?? {}) as { Fecha?: unknown; Valor2?: unknown };
    const m = typeof Fecha === "string" ? /^([A-Za-z]{3})\.?\s*(\d{4})$/.exec(Fecha.trim()) : null;
    const mes = m ? MES_CORTO[m[1].toLowerCase()] : undefined;
    const acumulada = typeof Valor2 === "string" ? Number(Valor2.replace(/%/g, "").trim()) : NaN;
    if (!m || !mes || !Number.isFinite(acumulada)) return null;
    filas.push({ anio: Number(m[2]), mes, acumulada });
  }
  filas.sort((a, b) => a.anio - b.anio || a.mes - b.mes);
  if (filas.length === 0 || filas[0].anio !== 2021 || filas[0].mes !== 1) return null;
  const puntos: PuntoSerie[] = [{ fecha: "2020-12-01", valor: 100 }];
  let diciembre = 100;
  for (let i = 0; i < filas.length; i++) {
    const { anio, mes, acumulada } = filas[i];
    if (anio * 12 + mes !== 2021 * 12 + 1 + i) return null;
    const indice = diciembre * (1 + acumulada / 100);
    const fecha = `${anio}-${String(mes).padStart(2, "0")}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: Number(indice.toFixed(4)) });
    if (mes === 12) diciembre = indice;
  }
  return puntos;
}

function sinEntidades(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .trim();
}

// El acuerdo vigente (SETRASS-233-2026) se anunció en el sitio de la STSS entre el 18/4 y el 7/5/2026.
// Solo interesa lo publicado después: un acuerdo nuevo o el ajuste por la cláusula de salvaguarda.
const ULTIMA_PUBLICACION_SALARIO = "2026-05-07";

export function leerFeedSalario(xml: string): HallazgoNorma[] | null {
  if (!/<rss[\s>]/.test(xml)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const titulo = sinEntidades(/<title>([\s\S]*?)<\/title>/.exec(item)?.[1] ?? "");
    const url = sinEntidades(/<link>([\s\S]*?)<\/link>/.exec(item)?.[1] ?? "");
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(item)?.[1];
    if (!titulo || !url.startsWith("https://") || !pub) continue;
    const instante = new Date(pub);
    if (Number.isNaN(instante.getTime())) continue;
    const fecha = fechaEnZona(instante, ZONA);
    if (fecha <= ULTIMA_PUBLICACION_SALARIO) continue;
    if (!/salario\s+m[ií]nimo|salvaguarda/i.test(titulo)) continue;
    hallazgos.push({ titulo, url, fecha });
  }
  return hallazgos;
}

// El SAR publica la tabla progresiva cada enero en una entrada con la fecha en la ruta
// (/2026/01/actualizacion-de-la-tabla-progresiva-2026/). La de 2026 ya está cargada.
const ULTIMO_ANIO_TABLA = 2026;

export function leerBusquedaSar(json: unknown): HallazgoNorma[] | null {
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const r of json as { title?: unknown; url?: unknown }[]) {
    if (typeof r?.title !== "string" || typeof r.url !== "string") continue;
    const m = /^https:\/\/www\.sar\.gob\.hn\/(\d{4})\/(\d{2})\//.exec(r.url);
    if (!m || Number(m[1]) <= ULTIMO_ANIO_TABLA) continue;
    if (!/tabla\s+progresiva/i.test(r.title)) continue;
    const fecha = `${m[1]}-${m[2]}-01` as FechaISO;
    if (!esFechaISO(fecha)) continue;
    hallazgos.push({ titulo: sinEntidades(r.title), url: r.url, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "hn.tipo-cambio-bch",
    carril: "serie",
    serie: "hn.tipo-cambio",
    metodo: "api-json",
    url: URL_TIPO_CAMBIO,
    banda: { min: 24, max: 30, saltoRelativoMax: 0.03 },
    async traer(http) {
      return leerTipoCambio(await http.json(this.url, { encabezados: { Accept: "application/json;odata=nometadata" } }));
    },
  },
  {
    id: "hn.ipc-bch",
    carril: "serie",
    serie: "hn.ipc",
    metodo: "api-json",
    url: URL_INFLACION,
    // Bandas: la mayor inflación mensual desde 2021 fue 1,7 % (abril 2026) y la interanual llegó a 10,9 % (julio 2022).
    banda: { min: 120, max: 180, saltoRelativoMax: 0.04 },
    async traer(http) {
      return reconstruirIpc(await http.json(this.url, { encabezados: { Accept: "application/json;odata=nometadata" } }));
    },
  },
  {
    id: "hn.stss-salario-minimo",
    carril: "norma",
    datos: ["hn.salario-minimo-mensual", "hn.salario-minimo-diario", "hn.salario-minimo-hora"],
    metodo: "api-xml",
    url: "https://www.trabajo.gob.hn/feed/?s=salario+minimo",
    async traer(http) {
      return leerFeedSalario(await http.texto(this.url));
    },
  },
  {
    id: "hn.sar-tabla-progresiva",
    carril: "norma",
    datos: ["hn.isr-tabla", "hn.isr-deduccion-gastos-medicos"],
    metodo: "api-json",
    url: "https://www.sar.gob.hn/wp-json/wp/v2/search?search=tabla%20progresiva&per_page=20",
    async traer(http) {
      return leerBusquedaSar(await http.json(this.url));
    },
  },
];
