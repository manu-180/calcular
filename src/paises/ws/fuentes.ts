import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";
const MESES: Readonly<Record<string, string>> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function sinEtiquetas(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

// La página de tasas diarias del Banco Central de Samoa cotiza unidades de moneda extranjera por tala y
// trae "Last updated 29 Oct 2026". Si el nombre de la moneda o la fecha no aparecen, devuelve null.
function cotizacion(nombre: string): (http: Http, url: string) => Promise<readonly PuntoSerie[] | null> {
  return async (http, url) => {
    const texto = sinEtiquetas(await http.texto(url));
    const valor = new RegExp(`${nombre}\\s+([\\d.]+)`).exec(texto)?.[1];
    const f = /Last updated (\d{1,2}) ([A-Z][a-z]{2}) (\d{4})/.exec(texto);
    const mes = f ? MESES[f[2]] : undefined;
    if (!f || !mes) return null;
    const fecha = `${f[3]}-${mes}-${f[1].padStart(2, "0")}`;
    const n = Number(valor);
    if (!esFechaISO(fecha) || !Number.isFinite(n)) return null;
    return [{ fecha, valor: n }];
  };
}

const CBS = "https://www.cbs.gov.ws/daily-exchange-rates";

function detectorTasa(codigo: string, nombre: string, min: number, max: number): Detector {
  const leer = cotizacion(nombre);
  return {
    id: `ws.cbs-${codigo}`,
    carril: "serie",
    serie: `ws.${codigo}`,
    metodo: "html",
    url: CBS,
    banda: { min, max, saltoRelativoMax: 0.05 },
    async traer(http) {
      return leer(http, this.url);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorTasa("usd", "United States Dollar", 0.3, 0.45),
  detectorTasa("nzd", "New Zealand Dollar", 0.5, 0.8),
  detectorTasa("aud", "Australian Dollar", 0.4, 0.65),
  detectorTasa("eur", "Euro", 0.25, 0.4),
  detectorTasa("gbp", "Great Britain Pound", 0.2, 0.35),
  detectorTasa("fjd", "Fijian Dollar", 0.6, 1.0),
  {
    // El Ministerio publica las hojas IS01 e IS02 con el año en el nombre del archivo: si el enlace cambia, las tablas se volvieron a publicar.
    id: "ws.revenue-info-sheets",
    carril: "norma",
    datos: ["ws.paye-fortnightly-bands", "ws.income-tax-bands", "ws.company-tax-rate", "ws.resident-wht-rate", "ws.nonresident-wht-rate", "ws.provisional-tax-minimum"],
    metodo: "html",
    url: "https://www.revenue.gov.ws/inland-revenue-services/",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/Salary and Wage/i.test(html)) return null;
      const igual = html.includes("IS01_Income-Tax-1-2026.pdf") && html.includes("IS02_Salary-and-Wage-Income-Tax-2026.pdf");
      return igual ? [] : [{ titulo: "Ministry for Revenue republished its IS01 or IS02 information sheet", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "ws.revenue-vagst",
    carril: "norma",
    datos: ["ws.vagst-rate", "ws.vagst-threshold"],
    metodo: "html",
    url: "https://www.revenue.gov.ws/inland-revenue-services/",
    async traer(http) {
      const texto = sinEtiquetas(await http.texto(this.url));
      if (!/VAGST/.test(texto)) return null;
      const igual = /VAGST of 15% is added/.test(texto) && /SAT\$130,000/.test(texto);
      return igual ? [] : [{ titulo: "Ministry for Revenue no longer shows VAGST at 15% with a SAT$130,000 threshold", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "ws.mcil-minimum-wage",
    carril: "norma",
    datos: ["ws.min-wage-hourly"],
    metodo: "html",
    url: "https://www.mcil.gov.ws/services/employment",
    async traer(http) {
      const texto = sinEtiquetas(await http.texto(this.url));
      if (!/Minimum Wage/i.test(texto)) return null;
      const igual = /\$5\.24 per hour/.test(texto) && /\$5\.65 per hour/.test(texto) && /\$6\.05 per hour/.test(texto);
      return igual ? [] : [{ titulo: "MCIL changed the minimum wage steps of 5.24, 5.65 and 6.05 an hour", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "ws.npf-employers-guide",
    carril: "norma",
    datos: ["ws.npf-employee-rate", "ws.npf-employer-rate", "ws.npf-late-surcharge", "ws.npf-due-day"],
    metodo: "html",
    url: "https://www.npf.ws/employers-guide",
    async traer(http) {
      const texto = sinEtiquetas(await http.texto(this.url));
      if (!/Employer Guide/i.test(texto)) return null;
      const igual = /employee’s portion of 10%/.test(texto) && /matching portion of 10%/.test(texto) && /surcharge of 2% per month/.test(texto);
      return igual ? [] : [{ titulo: "NPF Employers Guide no longer shows the 10% and 10% contribution", url: this.url, fecha: VERIFICADO }];
    },
  },
];
