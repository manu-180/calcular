import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-security-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Private sector, EC$4,000 a month",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/media-release-pension-contribution-rate-adjustments/", detalle: "4,000 x 7% = 280 for the employee. 4,000 x 9% = 360 for the employer. Total 640." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, sector: "private" },
    esperado: { empleado: 280, empleador: 360, total: 640, base: 4000 },
  },
  {
    nombre: "Public sector, EC$4,000 a month",
    origen: { tipo: "recalculado", detalle: "4,000 x 6% = 240 for the employee. 4,000 x 9% = 360 for the employer." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, sector: "public" },
    esperado: { empleado: 240, empleador: 360, total: 600 },
  },
  {
    nombre: "Pay above the ceiling",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/contributions-faqs/", detalle: "Ceiling 6,500. 6,500 x 7% = 455. 6,500 x 9% = 585." },
    fecha: "2026-10-29",
    entrada: { bruto: 9000, sector: "private" },
    esperado: { base: 6500, empleado: 455, empleador: 585, total: 1040 },
  },
]);
