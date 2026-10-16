import { esFechaISO } from "@/motor/vigencia";
import type { Detector, PuntoSerie } from "@/motor/tipos";

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
];
