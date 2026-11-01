import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";

function textoPlano(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/\s+/g, " ");
}

// Las páginas de BRA, NISSS, el Ministerio de Trabajo y el Banco Central no publican fecha de
// actualización. Se controla que sigan diciendo lo que leímos; si un texto clave desaparece, el dato
// puede haber cambiado y hay que volver a leerlo. Sin navegador, Cloudflare de algunos sitios corta.
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

// Policy notes que ya leímos en la lista de la BRA. Una nueva sobre impuesto a la renta, créditos o
// VAT puede cambiar las tasas, la desgravación o el CIC.
const NOTAS_CONOCIDAS = new Set([
  "Annual-Alternate-Fuel-Levy",
  "Approved-Rental-Car-Companies",
  "Car-Rental-Levy-and-Discontinuatio",
  "Compensatory-Income-Credit-CIC-Inc",
  "Eligibility-Criteria-for-5-5-Corpo",
  "Excise-Tax-on-Sweetened-Beverages",
  "Failure-to-file-Corporation-Tax-Re",
  "Increase-in-Personal-Allowance-for",
  "International-Financial-Reporting",
  "Items-Zero-Rated-for-Value-Added-T",
  "OGC-No-009-2023-Corporation-Tax-Re",
  "OGC-No-04-2025-Corporation-Tax-Re",
  "POLICY-NOTE-Insurance-Premium-Tax",
  "Pandemic-Contribution-Levy-Compani",
  "Pandemic-Contribution-Levy-Individ",
  "Reduction-of-Personal-Income-Tax-R",
  "Tax-Free-Payment-of-1500-for-Gover",
  "VAT-on-Electricity-Period-Reduction",
  "VAT-on-Electricity-Reduction-Perio",
]);

// Avisos de órdenes de salario mínimo que ya leímos en el sitio del Ministerio de Trabajo.
const AVISOS_SALARIO = new Set([
  "notice-of-intention-to-make-a-minimum-wage-order",
  "notice-of-intention-to-make-a-minimum-wage-order-2",
  "notice-of-intention-to-make-minimum-wage-order-2025",
]);

export const detectores: readonly Detector[] = [
  {
    // La tabla de topes de NISSS suma una fila por año («2027 1258.00 5450.00»). Una fila nueva o un
    // cambio en la fila de clase R anuncia otro tope u otra tasa.
    id: "bb.nis-contribution-rates",
    carril: "norma",
    datos: ["bb.nis-ceiling-monthly", "bb.nis-ceiling-weekly", "bb.nis-employee-rate", "bb.nis-employer-rate", "bb.rrf-employee-rate", "bb.rrf-employer-rate"],
    metodo: "html",
    url: "https://www.nis.gov.bb/contribution-rates/",
    userAgentNavegador: true,
    async traer(http) {
      const texto = textoPlano(await http.texto(this.url, { userAgentNavegador: true }));
      if (!texto.includes("Insurable Earnings Ceilings")) return null;
      const hallazgos: HallazgoNorma[] = [];
      const anios = [...texto.matchAll(/\b(20\d\d)\s+(\d{3,4}\.\d{2})\s+(\d{4}\.\d{2})/g)].map((m) => Number(m[1]));
      const ultimo = Math.max(...anios);
      if (!Number.isFinite(ultimo)) return null;
      if (ultimo > 2027) hallazgos.push({ titulo: `NISSS lists a new insurable earnings ceiling for ${ultimo}`, url: this.url, fecha: VERIFICADO });
      if (!texto.includes("Total 11.00 12.75 23.75")) hallazgos.push({ titulo: "NISSS class R contribution totals changed (was 11.00 / 12.75 / 23.75)", url: this.url, fecha: VERIFICADO });
      if (!texto.includes("Resilience & Regeneration 0.25 0.25 0.50")) hallazgos.push({ titulo: "NISSS Resilience and Regeneration Fund rates changed", url: this.url, fecha: VERIFICADO });
      return hallazgos;
    },
  },
  {
    id: "bb.bra-policy-notes",
    carril: "norma",
    datos: ["bb.income-tax", "bb.personal-allowance", "bb.cic-income-limit", "bb.cic-max", "bb.vat"],
    metodo: "html",
    url: "https://bra.gov.bb/News/Policy-Notes",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const notas = [...new Set([...html.matchAll(/href="\/News\/Policy-Notes\/([^"/]+)"/g)].map((m) => m[1]))];
      if (notas.length < 5) return null;
      return notas
        .filter((n) => !NOTAS_CONOCIDAS.has(n))
        .map((n) => ({ titulo: `New BRA policy note: ${n.replace(/-/g, " ")}`, url: `https://bra.gov.bb/News/Policy-Notes/${n}`, fecha: VERIFICADO }));
    },
  },
  vigila("bb.bra-vat-rates", "https://bra.gov.bb/Popular-Topics/Value-Added-Tax/VAT-Rates", ["bb.vat"], ["7.5% - VAT on accommodating direct tourism services", "17.5% - Rate for standard supplies", "22% - VAT on telecommunications services"], "BRA VAT Rates page"),
  vigila(
    "bb.bra-land-tax",
    "https://www.bra.gov.bb/FAQs/Land-Tax/",
    ["bb.land-tax-residential", "bb.land-tax-non-residential"],
    ["0% for properties valued up to $400,000", "0.1% for properties valued greater than $400,000 but not above $550,000", "0.7% for properties valued greater than $550,000 but not above $950,000", "1.0% for properties valued above $950,000", "0.95% on the improved value"],
    "BRA Land Tax FAQ",
  ),
  {
    id: "bb.labour-minimum-wage",
    carril: "norma",
    datos: ["bb.minimum-wage-hourly", "bb.minimum-wage-weekly", "bb.overtime-multiplier", "bb.public-holiday-multiplier"],
    metodo: "html",
    url: "https://labour.gov.bb/?s=minimum+wage",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const entradas = [...new Set([...html.matchAll(/href="https:\/\/labour\.gov\.bb\/([a-z0-9-]*minimum-wage[a-z0-9-]*)\/"/g)].map((m) => m[1]))];
      if (!entradas.length) return null;
      return entradas
        .filter((e) => !AVISOS_SALARIO.has(e))
        .map((e) => ({ titulo: `New Ministry of Labour post on the minimum wage: ${e.replace(/-/g, " ")}`, url: `https://labour.gov.bb/${e}/`, fecha: VERIFICADO }));
    },
  },
  vigila("bb.nis-sickness", "https://www.nis.gov.bb/sickness-benefits/", ["bb.sickness-benefit-rate", "bb.sickness-max-weeks"], ["66 2/3%", "maximum of 26 weeks"], "NISSS Sickness Benefit page"),
  vigila("bb.nis-maternity", "https://www.nis.gov.bb/maternity-grant-benefits/", ["bb.maternity-benefit-rate", "bb.child-grant"], ["100% of the insured person", "$1,280"], "NISSS Maternity Benefit page"),
  vigila("bb.nis-unemployment", "https://www.nis.gov.bb/unemployment-benefits/", ["bb.unemployment-benefit-rate", "bb.unemployment-max-weeks"], ["60% of the insured person", "maximum of 26 weeks"], "NISSS Unemployment Benefit page"),
  vigila("bb.nis-paternity", "https://www.nis.gov.bb/paternity-benefit/", ["bb.paternity-benefit-rate", "bb.paternity-benefit-weeks"], ["100% of your average insurable weekly earnings", "three (3) weeks"], "NISSS Paternity Benefit page"),
  vigila(
    "bb.nis-pension",
    "https://www.nis.gov.bb/old-age-contributory-pension/",
    ["bb.pension-rate-first-20", "bb.pension-rate-after-20", "bb.pension-max-rate", "bb.pensionable-age", "bb.pension-min-contributions"],
    ["2% of the average annual earnings for the first 1000 contributions", "capped at 60%", "Pensionable age is currently 67 years", "500 contributions"],
    "NISSS Old-Age Contributory Pension page",
  ),
  vigila("bb.cbb-fx-fee", "https://www.centralbank.org.bb/faqs/foreignexchangefee", ["bb.foreign-exchange-fee"], ["The FXF is 2%"], "Central Bank Foreign Exchange Fee FAQ"),
  {
    id: "bb.inflation-bss",
    carril: "serie",
    serie: "bb.inflation",
    // Manual: la variación interanual solo está en el PDF del boletín mensual del Barbados
    // Statistical Service, con tablas en columnas que no se pueden leer de forma segura.
    metodo: "manual",
    url: "https://stats.gov.bb/subjects/economic-statistics/retail-price-index/",
    // Es una variación anual en puntos: puede moverse más de medio punto de un mes a otro.
    banda: { min: -5, max: 20, saltoRelativoMax: 0.8 },
    async traer() {
      return null;
    },
  },
  manual("bb.labour-acts", "https://labour.gov.bb/policies-programmes/labour-legislation/", [
    "bb.holiday-weeks-under-5",
    "bb.holiday-weeks-5-plus",
    "bb.notice-weekly-paid",
    "bb.notice-fortnightly-paid",
    "bb.notice-monthly-paid",
    "bb.employee-notice-weeks",
    "bb.employee-notice-months",
    "bb.shop-daily-hours",
    "bb.shop-weekly-hours",
  ]),
  manual("bb.laws-of-barbados", "https://www.barbadoslawcourts.gov.bb/", [
    "bb.severance-weeks",
    "bb.severance-max-years",
    "bb.severance-min-weeks",
    "bb.maternity-leave-weeks",
    "bb.property-transfer-tax-rate",
    "bb.property-transfer-tax-exemption",
  ]),
  manual("bb.cbb-peg", "https://www.centralbank.org.bb/news/general-press-release/fixed-for-forty-one-years", ["bb.usd-parity"]),
];
