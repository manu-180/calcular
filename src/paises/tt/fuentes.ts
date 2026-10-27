import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";

function textoPlano(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

// Las páginas del IRD no publican fecha de actualización. Se controla que sigan diciendo lo que
// leímos; si un texto clave desaparece, el dato puede haber cambiado y hay que volver a leerlo.
function vigila(id: string, url: `https://${string}`, datos: readonly string[], textos: readonly string[], titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const texto = textoPlano(await http.texto(this.url, { userAgentNavegador: true }));
      if (texto.length < 1500) return null;
      const faltan = textos.filter((t) => !texto.includes(t));
      return faltan.length ? [{ titulo: `${titulo}: no longer shows ${faltan.join(", ")}`, url: this.url, fecha: VERIFICADO }] : [];
    },
  };
}

function manual(id: string, url: `https://${string}`, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "manual",
    url,
    async traer(): Promise<readonly HallazgoNorma[]> {
      return [];
    },
  };
}

const MONEDAS = { usd: "United States Dollar", cad: "Canadian Dollar", gbp: "Pound Sterling", eur: "Euro" } as const;

// La portada del Banco Central trae la tabla «Exchange Rates» con la fecha del último día hábil
// (`table_date`, AAAA-MM-DD) y, por moneda, la tasa de compra y la de venta.
async function cambioBcc(http: Http, url: string, moneda: keyof typeof MONEDAS, columna: 0 | 1): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const inicio = html.indexOf("Exchange Rates </div>");
  if (inicio < 0) return null;
  const bloque = html.slice(inicio, inicio + 3000);
  const fecha = /class="table_date">\s*(\d{4}-\d{2}-\d{2})\s*</.exec(bloque)?.[1];
  const fila = new RegExp(`<p>${MONEDAS[moneda]}</p></td><td>([\\d.]+)</td><td>([\\d.]+)</td>`).exec(bloque);
  if (!fecha || !fila || !esFechaISO(fecha)) return null;
  const valor = Number(fila[1 + columna]);
  return Number.isFinite(valor) ? [{ fecha, valor }] : null;
}

const BANDAS = {
  usd: { min: 6, max: 8.5 },
  cad: { min: 4, max: 7 },
  gbp: { min: 7.5, max: 12.5 },
  eur: { min: 6.5, max: 10.5 },
} as const;

const detectoresCambio: Detector[] = (Object.keys(MONEDAS) as (keyof typeof MONEDAS)[]).flatMap((m) =>
  (["buy", "sell"] as const).map(
    (lado): Detector => ({
      id: `tt.${m}-${lado}-cbtt`,
      carril: "serie",
      serie: `tt.${m}-${lado}`,
      metodo: "html",
      url: "https://www.central-bank.org.tt/",
      userAgentNavegador: true,
      // El dólar estadounidense se mueve muy poco (régimen administrado); las otras monedas siguen al
      // mercado internacional.
      banda: { ...BANDAS[m], saltoRelativoMax: m === "usd" ? 0.02 : 0.05 },
      async traer(http) {
        return cambioBcc(http, this.url, m, lado === "buy" ? 0 : 1);
      },
    }),
  ),
);

export const detectores: readonly Detector[] = [
  ...detectoresCambio,
  {
    // La página de tasas del NIBTT enlaza la planilla vigente; el nombre del archivo lleva la fecha de
    // inicio («20260105»). Una planilla con otra fecha trae clases o aportes nuevos.
    id: "tt.nib-contribution-rates",
    carril: "norma",
    datos: ["tt.nis-employee-weekly", "tt.nis-employer-weekly", "tt.nis-employee-monthly", "tt.nis-employer-monthly"],
    metodo: "html",
    url: "https://nibtt.net/Contribution_Rates/rates.html",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const fechas = [...html.matchAll(/NISContributions_?(\d{8})\.pdf/g)].map((m) => m[1]);
      if (!fechas.length) return null;
      const nuevas = [...new Set(fechas.filter((f) => f > "20260105"))];
      return nuevas.map((f) => ({ titulo: `New NIBTT contribution table (${f})`, url: this.url, fecha: VERIFICADO }));
    },
  },
  vigila(
    "tt.ird-deductions",
    "https://www.ird.gov.tt/individual/deductions-and-required-supporting-documents",
    ["tt.personal-allowance", "tt.nis-deductible-share", "tt.pension-nis-deduction-cap"],
    ["$90,000 as of 01/01/2023", "70% NIS contributions", "limited to $60,000 as of 01/01/2022"],
    "IRD deductions page",
  ),
  vigila(
    "tt.ird-severance-gratuity",
    "https://www.ird.gov.tt/general-guidelines-for-severance-gratuity",
    ["tt.income-tax-rate", "tt.income-tax-higher-rate", "tt.income-tax-higher-band", "tt.severance-exemption"],
    ["25% up to $1,000,000", "30% in excess of $1,000,000", "The tax exemption for severance payments is $500,000"],
    "IRD severance and gratuity guidelines",
  ),
  vigila(
    "tt.ird-health-surcharge",
    "https://www.ird.gov.tt/health-surcharge",
    ["tt.health-surcharge-high", "tt.health-surcharge-low", "tt.health-surcharge-threshold-monthly", "tt.health-surcharge-threshold-weekly"],
    ["$469.99", "$109.00", "$8.25 per week", "$4.80 per week"],
    "IRD Health Surcharge page",
  ),
  vigila("tt.ird-vat", "https://www.ird.gov.tt/VAT", ["tt.vat-standard", "tt.vat-registration-threshold"], ["VAT is charged at a rate of 12.5%", "$600,000.00"], "IRD VAT page"),
  vigila(
    "tt.ird-stamp-duty-rates",
    "https://www.ird.gov.tt/news/stamp-duty-rates",
    ["tt.stamp-duty-residential", "tt.stamp-duty-land"],
    ["$850,000 or less SHALL BE EXEMPT", "first $400,000 in excess of $850,000", "7.5%", "$450,000 or less shall be EXEMPT", "thereafter in excess of $850,000"],
    "IRD stamp duty rates",
  ),
  vigila("tt.ird-stamp-duty-faqs", "https://www.ird.gov.tt/stamp-duty/FAQs", ["tt.stamp-duty-first-home-exemption"], ["maximum of $1,500,000"], "IRD stamp duty FAQs"),
  // Las órdenes de salario mínimo salen en el suplemento legal de la Gaceta, que no tiene un índice
  // legible por máquina; el cambio se anuncia en el presupuesto de octubre.
  manual("tt.gazette-minimum-wage", "https://www.printery.gov.tt/", ["tt.minimum-wage-hourly", "tt.minimum-wage-daily", "tt.minimum-wage-weekly", "tt.minimum-wage-monthly"]),
  // La reforma de la ley de maternidad (Senate Bill No. 8 of 2026) entra en vigor por proclamación.
  manual("tt.maternity-protection-act", "https://laws.gov.tt/", [
    "tt.maternity-leave-weeks",
    "tt.maternity-leave-before-birth-weeks",
    "tt.maternity-full-pay-months",
    "tt.maternity-half-pay-months",
  ]),
];
