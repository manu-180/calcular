import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-17";
const MESES: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
  July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};

function fecha(dia: string, mes: string, anio: string): FechaISO | null {
  const f = `${anio}-${MESES[mes] ?? "xx"}-${dia.padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

// La tabla del mes en curso del CBUAE trae una fila por fecha con O/N, 1W, 1M, 3M, 6M y 1Y; el 3M es
// la quinta celda. La página está detrás de una protección anti bots: si devuelve otra cosa, null.
async function eiborCbuae(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/EIBOR/.test(html)) return null;
  const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const puntos: PuntoSerie[] = [];
  const re = /(\d{2}) ([A-Z][a-z]+) (\d{4}) (\d+\.\d+) (\d+\.\d+) (\d+\.\d+) (\d+\.\d+) (\d+\.\d+) (\d+\.\d+)/g;
  for (const m of texto.matchAll(re)) {
    const f = fecha(m[1], m[2], m[3]);
    const valor = Number(m[7]);
    if (!f || !Number.isFinite(valor) || puntos.some((p) => p.fecha === f)) continue;
    puntos.push({ fecha: f, valor });
  }
  if (!puntos.length) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

async function fechasNuevas(http: Http, url: string, valida: RegExp, patron: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!valida.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(patron)) {
    const f = fecha(m[1], m[2], m[3]);
    if (f && f > VERIFICADO && !hallazgos.some((h) => h.fecha === f)) hallazgos.push({ titulo: `${titulo} (${f})`, url, fecha: f });
  }
  return hallazgos;
}

// DEWA publica el recargo por combustible de cada mes con su nombre ("Fuel Surcharge - October 2026"):
// un mes posterior al cargado es un valor nuevo para datos.json.
async function recargoDewa(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = html.match(/Fuel Surcharge - ([A-Z][a-z]+) (\d{4})/);
  if (!m) return null;
  const f = fecha("01", m[1], m[2]);
  if (!f) return null;
  return f > "2026-10-01" ? [{ titulo: `DEWA fuel surcharge for ${m[1]} ${m[2]}`, url, fecha: f }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "ae.eibor-cbuae",
    carril: "serie",
    serie: "ae.eibor-3m",
    metodo: "html",
    url: "https://www.centralbank.ae/en/forex-eibor/eibor-rates/",
    userAgentNavegador: true,
    banda: { min: 0, max: 15, saltoRelativoMax: 0.2 },
    traer(http) {
      return eiborCbuae(http, this.url);
    },
  },
  {
    id: "ae.dewa-fuel-surcharge",
    carril: "norma",
    datos: ["ae.dewa-fuel-surcharge", "ae.dewa-electricity-residential", "ae.dewa-water-residential"],
    metodo: "html",
    url: "https://www.dewa.gov.ae/en/consumer/billing/slab-tariff",
    userAgentNavegador: true,
    traer(http) {
      return recargoDewa(http, this.url);
    },
  },
  {
    id: "ae.mohre-emiratisation",
    carril: "norma",
    datos: ["ae.emirati-minimum-wage", "ae.emiratisation-contribution", "ae.gpssa"],
    metodo: "html",
    url: "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/emiratis-employment-in-private-sector",
    traer(http) {
      return fechasNuevas(http, this.url, /Emiratisation/, /effective (\d{1,2}) ([A-Z][a-z]+) (\d{4})/g, "Emiratisation or Emirati wage change");
    },
  },
  {
    id: "ae.iloe-premiums",
    carril: "norma",
    datos: ["ae.iloe"],
    metodo: "html",
    url: "https://u.ae/en/information-and-services/jobs/Workplace-regulations/insurance/unemployment-insurance-scheme",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/Unemployment Insurance/.test(html)) return null;
      const igual = /no more than 5 AED per month/.test(html) && /no more than 10 AED per month/.test(html) && /60 per cent/.test(html);
      return igual ? [] : [{ titulo: "Unemployment insurance premiums or compensation changed", url: this.url, fecha: VERIFICADO }];
    },
  },
];
