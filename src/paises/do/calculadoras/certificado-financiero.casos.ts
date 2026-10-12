import { definirCasos } from "@/motor/calculo";
import certificadoFinanciero from "./certificado-financiero";

export default definirCasos(certificadoFinanciero, [
  {
    nombre: "RD$100,000 al 8 % por 90 días",
    origen: { tipo: "recalculado", detalle: "100,000 × 8 % × 90 ÷ 365 = 1,972.60. Retención 10 % (art. 306 bis) = 197.26. Neto 1,775.34." },
    fecha: "2026-10-12",
    entrada: { capital: 100000, tasa: 8, dias: 90, base: "365" },
    esperado: { interes: 1972.6, retencion: 197.26, neto: 1775.34, final: 101775.34 },
  },
  {
    nombre: "RD$500,000 al 10.5 % por 180 días, base 360",
    origen: { tipo: "recalculado", detalle: "500,000 × 10.5 % × 180 ÷ 360 = 26,250. Retención 2,625. Neto 23,625." },
    fecha: "2026-10-12",
    entrada: { capital: 500000, tasa: 10.5, dias: 180, base: "360" },
    esperado: { interes: 26250, retencion: 2625, neto: 23625, final: 523625 },
  },
]);
