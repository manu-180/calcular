import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Private sector, EC$4,000 a month",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/media-release-pension-contribution-rate-adjustments/", detalle: "Social Security 4,000 x 9% = 360. Medical Benefits 4,000 x 3.5% = 140. Cost 4,000 + 500 = 4,500." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, sector: "private" },
    esperado: { socialSecurity: 360, medical: 140, extras: 500, costoMensual: 4500, costoAnual: 54000 },
  },
  {
    nombre: "Pay above the Social Security ceiling",
    origen: { tipo: "recalculado", detalle: "Social Security 6,500 x 9% = 585. Medical Benefits 9,000 x 3.5% = 315. Cost 9,000 + 900 = 9,900." },
    fecha: "2026-10-29",
    entrada: { bruto: 9000, sector: "private" },
    esperado: { socialSecurity: 585, medical: 315, costoMensual: 9900 },
  },
]);
