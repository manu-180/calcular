import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-14";

function isoDesdeDma(d: string, m: string, a: string): string {
  return `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export const detectores: readonly Detector[] = [
  {
    // El listado de la División de Presupuesto trae cada memorándum seguido de su fecha dd.mm.aaaa. Un
    // memo nuevo de "Small Savings" cambia (o confirma) las tasas del trimestre siguiente.
    id: "in.dea-small-savings",
    carril: "norma",
    datos: ["in.small-savings-rates", "in.kvp-months"],
    metodo: "html",
    url: "https://dea.gov.in/budget-division/475",
    userAgentNavegador: true,
    // dea.gov.in no manda el certificado intermedio y Node corta la conexión sin tlsTolerante.
    tlsTolerante: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true, tlsTolerante: true });
      const re = /(Revision of [^<]{0,40}rates?[^<]{0,40}Small Sav[^<]{0,80})<[\s\S]{0,400}?(\d{2})\.(\d{2})\.(\d{4})/gi;
      let vistos = 0;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(re)) {
        vistos++;
        const fecha = isoDesdeDma(m[2], m[3], m[4]);
        if (!esFechaISO(fecha) || fecha <= VERIFICADO) continue;
        hallazgos.push({ titulo: m[1].replace(/\s+/g, " ").trim(), url: this.url, fecha });
      }
      return vistos === 0 ? null : hallazgos;
    },
  },
  {
    // indiabudget.gov.in anuncia en la portada el presupuesto vigente ("Budget 2026-2027"). Cuando
    // aparece uno posterior, el Finance Bill puede cambiar tramos, rebaja, recargo o ganancias de capital.
    id: "in.union-budget",
    carril: "norma",
    datos: [
      "in.new-regime-slabs",
      "in.old-regime-slabs",
      "in.old-regime-slabs-senior",
      "in.old-regime-slabs-super-senior",
      "in.surcharge-new",
      "in.surcharge-old",
      "in.standard-deduction-new",
      "in.standard-deduction-old",
      "in.rebate-new-limit",
      "in.rebate-new-max",
      "in.rebate-old-limit",
      "in.rebate-old-max",
      "in.cess",
      "in.section-123-limit",
      "in.stcg-equity-rate",
      "in.ltcg-equity-rate",
      "in.ltcg-equity-exemption",
      "in.advance-tax-threshold",
      "in.advance-tax-instalments",
      "in.hra-salary-percent",
      "in.hra-rent-excess",
    ],
    metodo: "html",
    url: "https://www.indiabudget.gov.in/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Budget\s+(20\d{2})-(20\d{2})/gi)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      if (ultimo <= 2026) return [];
      return [{ titulo: `Union Budget ${ultimo}-${ultimo + 1} published`, url: "https://www.indiabudget.gov.in/doc/memo.pdf", fecha: `${ultimo}-02-01` }];
    },
  },
  {
    // La portada del GST Council lista las reuniones con su fecha; las tasas cambian por recomendación
    // de una reunión.
    id: "in.gst-council",
    carril: "norma",
    datos: ["in.gst-rates"],
    metodo: "html",
    url: "https://gstcouncil.gov.in/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const re = /(\d{2}(?:st|nd|rd|th) GST Council Meeting) \((\d{2})-(\d{2})-(\d{4})\)/gi;
      const vistos = new Map<string, string>();
      for (const m of html.matchAll(re)) vistos.set(m[1], isoDesdeDma(m[2], m[3], m[4]));
      if (!vistos.size) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const [titulo, fecha] of vistos) {
        if (esFechaISO(fecha) && fecha > VERIFICADO) hallazgos.push({ titulo, url: this.url, fecha });
      }
      return hallazgos;
    },
  },
];
