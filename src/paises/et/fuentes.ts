import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const NBE_API = "https://api.nbe.gov.et/api/filter-exchange-rates";
const MOR_API = "https://www.mor.gov.et/api/domestic-proclamations";
const POESSA_PAGINA = "https://www.poessa.gov.et/index.php?rest_route=/wp/v2/pages/443&_fields=id,modified,link";
const MOLS_PAGINA = "https://mols.gov.et/wp-json/wp/v2/pages/9693?_fields=id,modified,link";

// Última proclamación de la lista del Ministry of Revenue que leímos (id 32, la 1434/2018 E.C.).
const ULTIMO_ID_MOR = 32;
const MOLS_LEIDA = "2024-03-22";

interface FilaNbe {
  date?: unknown;
  weighted_average?: unknown;
  currency?: { code?: unknown };
}

function isoUtc(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

// La API del NBE devuelve las tasas de un día por parámetro (?date=AAAA-MM-DD) y una lista vacía sin
// él. Se piden los últimos días corridos porque no publica sábados, domingos ni feriados.
async function dolarNbe(http: Http): Promise<readonly PuntoSerie[] | null> {
  const puntos: PuntoSerie[] = [];
  const hoy = new Date();
  for (let i = 0; i < 7; i++) {
    const dia = isoUtc(new Date(hoy.getTime() - i * 86400000));
    const json = (await http.json(`${NBE_API}?date=${dia}`, { userAgentNavegador: true })) as { data?: FilaNbe[] } | null;
    if (!json || !Array.isArray(json.data)) return null;
    const usd = json.data.find((f) => f.currency?.code === "USD");
    if (!usd) continue;
    const fecha = String(usd.date ?? "");
    const valor = Number(usd.weighted_average);
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    if (!puntos.some((p) => p.fecha === fecha)) puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

interface ProclamacionMor {
  id?: unknown;
  number?: unknown;
  year?: unknown;
  title?: unknown;
  pdfFile?: unknown;
  ProclamationCategory?: { engName?: unknown };
}

// La web del Ministry of Revenue es una SPA que lee esta lista. Una proclamación de renta o de IVA
// con id mayor que la última que leímos puede cambiar tasas o tramos.
async function proclamacionesMor(http: Http, url: string, categoria: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const lista = (await http.json(url, { userAgentNavegador: true })) as ProclamacionMor[] | null;
  if (!Array.isArray(lista)) return null;
  const hoy = isoUtc(new Date()) as FechaISO;
  return lista
    .filter((p) => Number(p.id) > ULTIMO_ID_MOR && categoria.test(String(p.ProclamationCategory?.engName ?? "")))
    .map((p) => ({
      titulo: `${titulo}: Proclamation No. ${String(p.number)}/${String(p.year)}`,
      url: typeof p.pdfFile === "string" && p.pdfFile.startsWith("https://") ? p.pdfFile : "https://www.mor.gov.et/domestic-law-proclamation",
      fecha: hoy,
    }));
}

// Páginas de WordPress: el campo "modified" cambia cuando alguien edita la página.
async function paginaModificada(http: Http, url: string, leida: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url, { userAgentNavegador: true })) as { modified?: unknown; link?: unknown } | null;
  const modificada = typeof json?.modified === "string" ? json.modified.slice(0, 10) : "";
  if (!esFechaISO(modificada)) return null;
  const enlace = typeof json?.link === "string" && json.link.startsWith("https://") ? json.link : url;
  return modificada > leida ? [{ titulo, url: enlace, fecha: modificada as FechaISO }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "et.usd-nbe",
    carril: "serie",
    serie: "et.usd",
    metodo: "api-json",
    url: NBE_API,
    userAgentNavegador: true,
    // El birr flota desde julio de 2024: una banda ancha y un salto diario de hasta 8 %.
    banda: { min: 100, max: 400, saltoRelativoMax: 0.08 },
    traer(http) {
      return dolarNbe(http);
    },
  },
  {
    id: "et.mor-income-tax",
    carril: "norma",
    datos: [
      "et.employment-income-tax",
      "et.rental-income-tax",
      "et.business-income-tax",
      "et.dividend-tax",
      "et.interest-tax",
      "et.royalty-tax",
      "et.royalty-art-tax",
      "et.winnings-tax",
      "et.withholding-rate",
      "et.withholding-goods-threshold",
      "et.withholding-services-threshold",
      "et.withholding-no-tin-rate",
    ],
    metodo: "api-json",
    url: MOR_API,
    userAgentNavegador: true,
    traer(http) {
      return proclamacionesMor(http, this.url, /income tax/i, "New income tax proclamation on the Ministry of Revenue site");
    },
  },
  {
    id: "et.mor-vat",
    carril: "norma",
    datos: ["et.vat", "et.vat-threshold"],
    metodo: "api-json",
    url: MOR_API,
    userAgentNavegador: true,
    traer(http) {
      return proclamacionesMor(http, this.url, /value add/i, "New VAT proclamation on the Ministry of Revenue site");
    },
  },
  {
    id: "et.poessa-pension",
    carril: "norma",
    datos: ["et.pension-employee", "et.pension-employer", "et.pension-base-rate", "et.pension-yearly-rate", "et.pension-min-years", "et.retirement-age", "et.pension-salary-months"],
    metodo: "api-json",
    url: POESSA_PAGINA,
    userAgentNavegador: true,
    traer(http) {
      return paginaModificada(http, this.url, "2024-11-29", "POESSA updated its pension page");
    },
  },
  {
    id: "et.mols-labour-law",
    carril: "norma",
    datos: [
      "et.overtime-rates",
      "et.holiday-pay-rate",
      "et.weekly-hours",
      "et.annual-leave-base",
      "et.severance-first-year",
      "et.severance-cap",
      "et.notice-first-year",
      "et.sick-full-months",
      "et.maternity-postnatal",
    ],
    metodo: "api-json",
    url: MOLS_PAGINA,
    userAgentNavegador: true,
    traer(http) {
      return paginaModificada(http, this.url, MOLS_LEIDA, "The Ministry of Labour and Skills updated its law page");
    },
  },
];
