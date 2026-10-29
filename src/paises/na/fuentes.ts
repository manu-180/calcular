import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";
const MESES: Readonly<Record<string, string>> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

// Si una página oficial deja de mostrar los textos que leímos, el dato pudo cambiar: se abre revisión.
function cambio(textos: readonly string[], html: string, titulo: string, url: string): HallazgoNorma[] {
  return textos.every((t) => html.includes(t)) ? [] : [{ titulo, url, fecha: VERIFICADO }];
}

interface FondoSsc {
  fund?: unknown;
  effectiveFrom?: unknown;
  metadata?: { contributionRate?: unknown; maxContributionWages?: unknown };
}

export const detectores: readonly Detector[] = [
  {
    id: "na.usd-bon",
    carril: "serie",
    serie: "na.usd",
    metodo: "api-json",
    // La portada del Bank of Namibia lee de este servicio el tipo de cambio del día.
    url: "https://services.bon.com.na/ratestable/api/rates",
    banda: { min: 12, max: 25, saltoRelativoMax: 0.05 },
    async traer(http) {
      const json = (await http.json(this.url)) as { rateDollar?: unknown; rateDollarDate?: unknown };
      if (typeof json?.rateDollar !== "string" || typeof json.rateDollarDate !== "string") return null;
      const m = /^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})$/.exec(json.rateDollarDate.trim());
      const valor = Number(json.rateDollar);
      if (!m || !MESES[m[2]] || !Number.isFinite(valor) || valor <= 0) return null;
      const fecha = `${m[3]}-${MESES[m[2]]}-${m[1].padStart(2, "0")}`;
      if (!esFechaISO(fecha)) return null;
      return [{ fecha, valor }];
    },
  },
  {
    // El portal de empleadores de la SSC trae en su HTML la tabla de tasas y techos que aplica.
    id: "na.ssc-portal",
    carril: "norma",
    datos: ["na.ssc-employee-rate", "na.ssc-employer-rate", "na.ssc-ceiling", "na.ssc-floor"],
    metodo: "html",
    url: "https://www.ssc.org.na/",
    async traer(http) {
      const html = await http.texto(this.url);
      const m = /<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html);
      if (!m) return null;
      let datos: unknown[];
      try {
        datos = JSON.parse(m[1]) as unknown[];
      } catch {
        return null;
      }
      if (!Array.isArray(datos)) return null;
      const leer = (v: unknown) => (typeof v === "number" ? datos[v] : undefined);
      const vistos: string[] = [];
      for (const fila of datos) {
        const f = fila as FondoSsc;
        if (!f || typeof f !== "object" || leer(f.fund) !== "MSD") continue;
        const meta = leer(f.metadata) as FondoSsc["metadata"];
        if (!meta) return null;
        vistos.push(`${String(leer(f.effectiveFrom))}:${String(leer(meta.contributionRate))}:${String(leer(meta.maxContributionWages))}`);
      }
      if (!vistos.length) return null;
      const leidos = ["2026-09-01:0.018:12500", "2027-03-01:0.018:14000", "2028-03-01:0.018:15000", "2029-03-01:0.018:16000"];
      return leidos.every((l) => vistos.includes(l)) && vistos.length === 6
        ? []
        : [{ titulo: "Social Security contribution table changed on the SSC portal", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "na.namra-calculator",
    carril: "norma",
    datos: ["na.income-tax-bands", "na.retirement-deduction-cap"],
    metodo: "html",
    url: "https://itas.namra.org.na/tax/income-tax/calculator",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/Namibia Revenue Agency/i.test(html)) return null;
      return cambio(["1-March-2024 to 28-Feb-2025", "1550000"], html, "NamRA updated the tax rates on its income tax calculator", this.url);
    },
  },
  {
    id: "na.namra-taxes",
    carril: "norma",
    datos: ["na.vat", "na.withholding-tax"],
    metodo: "html",
    url: "https://itas.namra.org.na/taxes",
    async traer(http) {
      const html = await http.texto(this.url);
      if (!/Value Added Tax/i.test(html)) return null;
      const textos = ["standard rate of 15%", "withhold tax at a rate of 10%", "royalties at a rate of 10%", "holds at least 25% of the capital and 20%"];
      return cambio(textos, html, "NamRA changed its page on VAT or withholding tax rates", this.url);
    },
  },
  {
    id: "na.nta-vet-levy",
    carril: "norma",
    datos: ["na.vet-levy-rate", "na.vet-levy-threshold"],
    metodo: "html",
    url: "https://www.nta.com.na/vet-levy/",
    // nta.com.na responde 406 a clientes que no se presentan como navegador.
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/VET Levy/i.test(html)) return null;
      return cambio(["levy rate is 1%", "N$ 1 000 000"], html, "The NTA changed its VET levy page", this.url);
    },
  },
  {
    id: "na.gazette-labour",
    carril: "norma",
    datos: [
      "na.minimum-wage",
      "na.max-weekly-hours",
      "na.weeks-per-month",
      "na.overtime-factor",
      "na.overtime-sunday-holiday-factor",
      "na.night-work-rate",
      "na.sunday-factor",
      "na.public-holiday-factor",
      "na.annual-leave-weeks",
      "na.sick-leave-days",
      "na.sick-leave-first-year-divisor",
      "na.maternity-weeks",
      "na.severance-weeks-per-year",
      "na.notice-period",
      "na.ssc-maternity-rate",
      "na.ssc-maternity-cap",
      "na.transfer-duty-natural",
      "na.transfer-duty-other",
      "na.stamp-duty-transfer",
      "na.corporate-tax-rate",
    ],
    // Manual: estas normas solo se publican en la Government Gazette, en PDF escaneado, y la web del
    // Ministerio de Trabajo bloquea clientes automáticos. Se revisan a mano con el índice anual de
    // gazettes.africa; proximaRevision avisa antes de cada cambio anunciado.
    metodo: "manual",
    url: "https://gazettes.africa/gazettes/na/2026",
    async traer() {
      return null;
    },
  },
];
