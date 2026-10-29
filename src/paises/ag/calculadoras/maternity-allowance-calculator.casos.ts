import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-allowance-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "EC$41,600 over 52 weeks",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/maternity-benefits/", detalle: "41,600 / 52 = 800 a week. 60% = 480. 13 weeks = 6,240." },
    fecha: "2026-10-29",
    entrada: { ganancias: 41600, semanas: 52 },
    esperado: { promedio: 800, base: 800, semanal: 480, semanasPago: 13, total: 6240 },
  },
  {
    nombre: "Average above the weekly ceiling",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/contributions-faqs/", detalle: "104,000 / 52 = 2,000. Ceiling 1,500. 60% = 900. 13 weeks = 11,700." },
    fecha: "2026-10-29",
    entrada: { ganancias: 104000, semanas: 52 },
    esperado: { promedio: 2000, base: 1500, semanal: 900, total: 11700 },
  },
  {
    nombre: "Fewer than 26 weeks is refused",
    origen: { tipo: "recalculado", detalle: "The Board's page says the number of weeks worked cannot be less than 26." },
    fecha: "2026-10-29",
    entrada: { ganancias: 10000, semanas: 20 },
    esperaError: true,
  },
]);
