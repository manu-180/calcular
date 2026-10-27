import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";
const RRA = "https://www.rra.gov.rw/en/domestic-tax-services/";
const MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dosDigitos(n: number): string {
  return String(n).padStart(2, "0");
}

function dma(d: Date): string {
  return `${dosDigitos(d.getUTCDate())}/${dosDigitos(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
}

// "02-Oct-26" → 2026-10-02.
function fechaBnr(texto: string): string | null {
  const m = /^(\d{2})-([A-Za-z]{3})-(\d{2})$/.exec(texto.trim());
  const mes = m ? MESES.indexOf(m[2]) + 1 : 0;
  return m && mes ? `20${m[3]}-${dosDigitos(mes)}-${m[1]}` : null;
}

// fxrates.bnr.rw alimenta la tabla de tipos de cambio de bnr.rw. Sin rango de fechas devuelve vacío,
// así que se piden las últimas dos semanas.
async function cambioBnr(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const hoy = new Date();
  const desde = new Date(hoy.getTime() - 14 * 86400000);
  const json = await http.json(`${url}&start_date=${dma(desde)}&end_date=${dma(hoy)}`);
  if (!Array.isArray(json)) return null;
  const puntos: PuntoSerie[] = [];
  for (const fila of json as { post_date?: unknown; average_rate?: unknown }[]) {
    if (typeof fila.post_date !== "string" || typeof fila.average_rate !== "string") return null;
    const fecha = fechaBnr(fila.post_date);
    const valor = Number(fila.average_rate);
    if (!fecha || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// La portada del NISR enlaza el último informe del IPC; su tabla trae 13 meses del índice urbano,
// rural y nacional ("Sep-25 | 190.9 | 224 | 211").
async function ipcNisr(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const portada = await http.texto(url, { userAgentNavegador: true });
  const ruta = /href="(\/statistical-publications\/price-indices-cpi-ppi\/consumer-price-index-cpi-[a-z]+-\d{4})"/.exec(portada)?.[1];
  if (!ruta) return null;
  const html = await http.texto(`https://statistics.gov.rw${ruta}`, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const fila of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const celdas = [...fila[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1].replace(/<[^>]+>/g, "").trim());
    if (celdas.length !== 4) continue;
    const m = /^([A-Za-z]{3})-(\d{2})$/.exec(celdas[0]);
    const mes = m ? MESES.indexOf(m[1]) + 1 : 0;
    const valor = Number(celdas[1]);
    if (!m || !mes || !Number.isFinite(valor)) continue;
    const fecha = `20${m[2]}-${dosDigitos(mes)}-01`;
    if (esFechaISO(fecha)) puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Las páginas de la RRA no tienen fecha de modificación. Si una deja de mostrar los valores que
// leímos, la tasa cambió o la página se rehízo: en los dos casos hay que volver a leerla.
async function textoRra(http: Http, url: string, esperados: readonly string[], titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/Rwanda Revenue Authority/i.test(html)) return null;
  const faltan = esperados.filter((t) => !html.includes(t));
  return faltan.length ? [{ titulo: `${titulo} (no longer shows ${faltan.join(", ")})`, url, fecha: VERIFICADO }] : [];
}

function rra(id: string, pagina: string, datos: readonly string[], esperados: readonly string[], titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `${RRA}${pagina}` as `https://${string}`,
    userAgentNavegador: true,
    traer(http) {
      return textoRra(http, this.url, esperados, titulo);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "rw.usd-bnr",
    carril: "serie",
    serie: "rw.usd",
    metodo: "api-json",
    url: "https://fxrates.bnr.rw/currency_history/?currency_name=USD",
    banda: { min: 1000, max: 2500, saltoRelativoMax: 0.05 },
    traer(http) {
      return cambioBnr(http, this.url);
    },
  },
  {
    id: "rw.eur-bnr",
    carril: "serie",
    serie: "rw.eur",
    metodo: "api-json",
    url: "https://fxrates.bnr.rw/currency_history/?currency_name=EUR",
    banda: { min: 1100, max: 3000, saltoRelativoMax: 0.05 },
    traer(http) {
      return cambioBnr(http, this.url);
    },
  },
  {
    id: "rw.cpi-nisr",
    carril: "serie",
    serie: "rw.cpi-urban",
    metodo: "html",
    url: "https://statistics.gov.rw/",
    userAgentNavegador: true,
    // Índice mensual: con inflación de dos dígitos puede subir algo más de 3 % en un mes.
    banda: { min: 150, max: 450, saltoRelativoMax: 0.08 },
    traer(http) {
      return ipcNisr(http, this.url);
    },
  },
  rra("rw.rra-paye", "employment-tax-paye/calculate-paye", ["rw.paye-bands"], ["60,001", "100,001", "200,001"], "RRA PAYE bands page changed"),
  rra(
    "rw.rra-wht",
    "withholding-tax-wht/types-of-withholding-tax",
    ["rw.paye-secondary-rate", "rw.wht-rate", "rw.wht-board", "rw.wht-imports", "rw.wht-tenders"],
    ["thirty percent (30%)", "A 15% tax", "A 5% tax", "A 3% tax"],
    "RRA withholding tax page changed",
  ),
  rra("rw.rra-pension", "rssb-contributions/pension-scheme-contribution", ["rw.pension-employee", "rw.pension-employer"], ["6% paid by the employer", "6% by the employee"], "RRA pension contribution page changed"),
  rra("rw.rra-maternity", "rssb-contributions/maternity-leave-contribution", ["rw.maternity-employee", "rw.maternity-employer"], ["0.6%", "0.3%"], "RRA maternity contribution page changed"),
  rra("rw.rra-cbhi", "rssb-contributions/cbhi-contribution", ["rw.cbhi-rate"], ["0.5%"], "RRA CBHI contribution page changed"),
  rra("rw.rra-medical", "rssb-contributions/medical-scheme-contribution", ["rw.medical-employee", "rw.medical-employer"], ["15%", "7.5%"], "RRA medical scheme page changed"),
  rra("rw.rra-vat", "value-added-tax/penalties-and-interest", ["rw.vat-rate"], ["18% for other goods"], "RRA VAT rates page changed"),
  rra("rw.rra-vat-registration", "value-added-tax/default-title-1", ["rw.vat-threshold-year", "rw.vat-threshold-quarter"], ["20 Million", "5 Million"], "RRA VAT registration page changed"),
  rra("rw.rra-rental", "local-government-taxes/rental-income-tax", ["rw.rental-bands", "rw.rental-deduction"], ["180,001", "1,000,000", "50%"], "RRA rental income tax page changed"),
  rra(
    "rw.rra-property",
    "local-government-taxes/default-title",
    ["rw.property-residential", "rw.property-residential-3", "rw.property-residential-4", "rw.property-commercial", "rw.property-industrial", "rw.land-max"],
    ["0.5%", "0.3%", "0.25%", "0.1%", "FRW 80"],
    "RRA immovable property tax page changed",
  ),
  rra("rw.rra-property-sale", "local-government-taxes/default-title-1", ["rw.sale-tax-registered", "rw.sale-tax-other", "rw.sale-tax-allowance"], ["2%", "2.5%", "5,000,000"], "RRA tax on sale of property page changed"),
  rra("rw.rra-trading-licence", "local-government-taxes/trading-license", ["rw.trading-licence", "rw.trading-licence-other"], ["160.000", "280.000", "60.000"], "RRA trading licence page changed"),
  rra("rw.rra-local-penalties", "local-government-taxes/default-title-2", ["rw.local-fine", "rw.local-interest", "rw.local-extra", "rw.local-extra-cap"], ["40%", "1.5%", "10%", "100,000"], "RRA district tax penalties page changed"),
  {
    // La lista de leyes de la RRA crece con cada ley tributaria nueva. La más reciente que leímos es
    // del 27/05/2025 (ingresos, IVA, impuesto turístico, peaje vial).
    id: "rw.rra-laws",
    carril: "norma",
    datos: [
      "rw.paye-bands",
      "rw.casual-rate",
      "rw.casual-threshold",
      "rw.pit-bands",
      "rw.cit-rate",
      "rw.flat-tax",
      "rw.lump-sum-rate",
      "rw.lump-sum-upper",
      "rw.cgt-rate",
      "rw.tourism-tax",
      "rw.road-levy",
      "rw.vat-rate",
      "rw.late-interest",
      "rw.fine-undeclared",
      "rw.fine-unpaid",
    ],
    metodo: "html",
    url: "https://www.rra.gov.rw/en/laws-policies-and-rulings",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Rwanda Revenue Authority/i.test(html)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(/Law\s+n[º°o]\.?\s*(\d+\/\d{4})\s+of\s+(\d{2})\/(\d{2})\/(\d{4})([^<]*)/gi)) {
        const fecha = `${m[4]}-${m[3]}-${m[2]}`;
        if (esFechaISO(fecha) && fecha > "2025-05-27") hallazgos.push({ titulo: `Law ${m[1]}${m[5].trim() ? ` ${m[5].trim()}` : ""}`, url: this.url, fecha });
      }
      return hallazgos;
    },
  },
  {
    id: "rw.rssb-maternity",
    carril: "norma",
    datos: ["rw.maternity-weeks", "rw.maternity-rssb-weeks"],
    metodo: "html",
    url: "https://www.rssb.rw/schemes/maternity-leave-scheme",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Maternity/i.test(html)) return null;
      const igual = /14-week/.test(html) && /final eight weeks/.test(html);
      return igual ? [] : [{ titulo: "RSSB maternity page no longer says 14 weeks with the final eight reimbursed", url: this.url, fecha: VERIFICADO }];
    },
  },
];
