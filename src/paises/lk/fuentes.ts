import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";
const IRD = "https://www.ird.gov.lk/en";

// El gráfico semanal del CBSL baja un texto plano «AAAA-MM-DD<tab>valor» por línea. La búsqueda por
// fechas de la misma serie solo responde a un POST de formulario, que el Http del cron no hace.
async function dolarCbsl(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const texto = await http.texto(url, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const m of texto.matchAll(/^(\d{4}-\d{2}-\d{2})\s+([\d.]+)\s*$/gm)) {
    const valor = Number(m[2]);
    if (esFechaISO(m[1]) && Number.isFinite(valor)) puntos.push({ fecha: m[1], valor });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// La página de tablas APIT lista una carpeta por año de evaluación («APIT_Tax_Tables/2025-2026»).
// Una carpeta de un año posterior quiere decir que el IRD publicó tablas nuevas.
async function tablasApit(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const anios = [...html.matchAll(/APIT_Tax_Tables\/(20\d{2})-20\d{2}/g)].map((m) => Number(m[1]));
  if (!anios.length) return null;
  const ultimo = Math.max(...anios);
  return ultimo > 2025 ? [{ titulo: `IRD published APIT tax tables for ${ultimo}/${ultimo + 1}`, url, fecha: VERIFICADO }] : [];
}

// Las páginas de impuestos del IRD listan cada Inland Revenue (Amendment) Act con su número y año.
// Leímos hasta la No. 11 de 2026: cualquier ley posterior puede cambiar tasas o alivios.
async function leyesIrd(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const leyes = [...html.matchAll(/Amendment\)\s*Act,?\s*No\.?\s*(\d+)\s*of\s*(20\d{2})/gi)].map((m) => ({ n: Number(m[1]), anio: Number(m[2]) }));
  if (!leyes.length) return null;
  const nuevas = leyes.filter((l) => l.anio > 2026 || (l.anio === 2026 && l.n > 11));
  return nuevas.map((l) => ({ titulo: `Inland Revenue (Amendment) Act, No. ${l.n} of ${l.anio}`, url, fecha: VERIFICADO }));
}

// Páginas sin fecha: si deja de aparecer el texto con la tasa que leímos, la tasa cambió.
function sinCambio(id: string, url: `https://${string}`, datos: readonly string[], firma: RegExp, control: RegExp, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!control.test(html)) return null;
      return firma.test(html) ? [] : [{ titulo, url: this.url, fecha: VERIFICADO }];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "lk.usd-cbsl",
    carril: "serie",
    serie: "lk.usd",
    metodo: "html",
    url: "https://www.cbsl.gov.lk/cbsl_custom/charts/usd/oneweek.php",
    userAgentNavegador: true,
    banda: { min: 200, max: 500, saltoRelativoMax: 0.05 },
    traer(http) {
      return dolarCbsl(http, this.url);
    },
  },
  {
    id: "lk.ird-apit-tables",
    carril: "norma",
    datos: ["lk.apit-table-1"],
    metodo: "html",
    url: `${IRD}/publications/sitepages/apit_tax_tables.aspx?menuid=1502`,
    userAgentNavegador: true,
    traer(http) {
      return tablasApit(http, this.url);
    },
  },
  {
    id: "lk.ird-income-tax-acts",
    carril: "norma",
    datos: [
      "lk.apit-table-1",
      "lk.income-tax-bands",
      "lk.personal-relief",
      "lk.terminal-benefits-bands",
      "lk.cgt-rate",
      "lk.wht-interest",
      "lk.wht-dividend",
      "lk.wht-rent",
      "lk.wht-rent-limit",
    ],
    metodo: "html",
    url: `${IRD}/Type%20of%20Taxes/SitePages/Income%20Tax.aspx?menuid=1201`,
    userAgentNavegador: true,
    traer(http) {
      return leyesIrd(http, this.url);
    },
  },
  {
    id: "lk.ird-vat",
    carril: "norma",
    datos: ["lk.vat", "lk.vat-threshold-year", "lk.vat-threshold-quarter"],
    metodo: "html",
    url: `${IRD}/Type%20of%20Taxes/SitePages/Value%20Added%20Tax%20(VAT).aspx?menuid=1204`,
    userAgentNavegador: true,
    // La página lista cada tasa estándar como «From dd.mm.aaaa - n%»; la última que leímos es la de 2024.
    async traer(http) {
      const html = (await http.texto(this.url, { userAgentNavegador: true })).replace(/<[^>]+>|&nbsp;|​/g, " ");
      if (!/From 01\.01\.2024\s*-\s*18%/.test(html)) return /VAT Rates/.test(html) ? [{ titulo: "IRD VAT page no longer shows 18% from 01.01.2024", url: this.url, fecha: VERIFICADO }] : null;
      const nueva = /From (\d{2})\.(\d{2})\.(20(?:2[5-9]|[3-9]\d))\s*-\s*\d+%/.exec(html);
      const umbral = /exceeds Rs\.\s*60 million for 12 months/.test(html);
      const hallazgos: HallazgoNorma[] = [];
      if (nueva) hallazgos.push({ titulo: `IRD VAT page lists a new rate from ${nueva[1]}.${nueva[2]}.${nueva[3]}`, url: this.url, fecha: `${nueva[3]}-${nueva[2]}-${nueva[1]}` as FechaISO });
      if (!umbral) hallazgos.push({ titulo: "IRD VAT page no longer shows the Rs. 60 million registration threshold", url: this.url, fecha: VERIFICADO });
      return hallazgos;
    },
  },
  sinCambio(
    "lk.ird-sscl",
    `${IRD}/Type%20of%20Taxes/SitePages/Social%20Security%20Contribution%20Levy%20(SSCL).aspx?menuid=1206`,
    ["lk.sscl-rate", "lk.sscl-liable-share", "lk.sscl-threshold-quarter", "lk.sscl-threshold-year"],
    /rate of 2\.5 per centum/,
    /Social Security Contribution Levy/,
    "IRD SSCL page no longer shows the 2.5 per centum rate",
  ),
  sinCambio(
    "lk.cbsl-epf",
    "https://www.cbsl.gov.lk/en/employees-provident-fund",
    ["lk.epf-employee", "lk.epf-employer"],
    /12 per cent and 8 per cent/,
    /Provident Fund/,
    "CBSL EPF page no longer shows minimum rates of 12 per cent and 8 per cent",
  ),
];
