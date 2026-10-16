import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// La API del CBN fecha cada día como "October-15-2026". La tasa NFEM oficial es el promedio
// ponderado por volumen (weightedAvgRate), no el cierre.
function fechaCbn(texto: string): string | null {
  const m = /^([A-Za-z]+)-(\d{1,2})-(\d{4})$/.exec(texto);
  if (!m) return null;
  const mes = MESES.indexOf(m[1]) + 1;
  if (mes === 0) return null;
  return `${m[3]}-${String(mes).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

export const detectores: readonly Detector[] = [
  {
    id: "ng.nfem-cbn",
    carril: "serie",
    serie: "ng.nfem-usd",
    metodo: "api-json",
    url: "https://www.cbn.gov.ng/api/GetAllNFEM_RatesGRAPH",
    // El naira flota: un salto diario de más del 8 % frena la carga para revisarla a mano.
    banda: { min: 500, max: 4000, saltoRelativoMax: 0.08 },
    async traer(http) {
      const json = await http.json(this.url);
      if (!Array.isArray(json)) return null;
      const puntos: PuntoSerie[] = [];
      for (const o of json as { ratedate?: unknown; weightedAvgRate?: unknown }[]) {
        if (typeof o.ratedate !== "string" || typeof o.weightedAvgRate !== "string") return null;
        const fecha = fechaCbn(o.ratedate);
        const valor = Number(o.weightedAvgRate);
        if (!fecha || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
        puntos.push({ fecha, valor });
      }
      puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return puntos.length ? puntos : null;
    },
  },
  {
    // El menú de leyes del NRS lista cada ley con su año en el slug (nigeria-tax-act-2025). Una ley
    // o enmienda de un año posterior puede cambiar bandas, tasas o exenciones.
    id: "ng.nrs-tax-laws",
    carril: "norma",
    datos: [
      "ng.paye-bands",
      "ng.rent-relief-rate",
      "ng.rent-relief-cap",
      "ng.vat",
      "ng.cit-rate",
      "ng.small-company-turnover",
      "ng.small-company-assets",
      "ng.development-levy",
      "ng.stamp-duty-transfer",
      "ng.stamp-duty-transfer-threshold",
      "ng.compensation-exemption",
    ],
    metodo: "html",
    url: "https://www.nrs.gov.ng/tax-laws/nrs-act",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const slugs = new Set([...html.matchAll(/href="\/tax-laws\/([a-z0-9-]+)"/g)].map((m) => m[1]));
      if (!slugs.size) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const slug of slugs) {
        const anio = /-(20\d{2})$/.exec(slug)?.[1];
        const fecha = `${anio}-01-01`;
        if (anio && Number(anio) > 2025 && esFechaISO(fecha)) {
          hallazgos.push({ titulo: slug.replace(/-/g, " "), url: `https://www.nrs.gov.ng/tax-laws/${slug}`, fecha });
        }
      }
      return hallazgos;
    },
  },
];
