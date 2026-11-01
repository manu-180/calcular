import { definirCasos } from "@/motor/calculo";
import calculadora from "./unincorporated-business-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sole trader with EC$120,000",
    origen: { tipo: "recalculado", url: "https://ird.gov.ag/wp-content/uploads/2021/07/Unincorporated-Business-Tax-FAQ.pdf", detalle: "FAQ 10: 0% to 42,000, 8% from 42,001 to 186,000. (120,000 - 42,000) x 8% = 6,240." },
    fecha: "2026-10-29",
    entrada: { ingreso: 120000, socios: 1, tarde: false },
    esperado: { impuesto: 6240, recargo: 0, total: 6240, exento: 42000 },
  },
  {
    nombre: "Sole trader with EC$250,000",
    origen: { tipo: "recalculado", detalle: "(186,000 - 42,000) x 8% = 11,520. (250,000 - 186,000) x 25% = 16,000. Total 27,520." },
    fecha: "2026-10-29",
    entrada: { ingreso: 250000, socios: 1, tarde: false },
    esperado: { impuesto: 27520 },
  },
  {
    nombre: "Two partners with EC$150,000 filing late",
    origen: { tipo: "recalculado", detalle: "FAQ 10 for two partners: 0% to 84,000 and 8% to 228,000. (150,000 - 84,000) x 8% = 5,280. FAQ 12 penalty: greater of 5% = 264 or 500, so 500. Total 5,780." },
    fecha: "2026-10-29",
    entrada: { ingreso: 150000, socios: 2, tarde: true },
    esperado: { impuesto: 5280, recargo: 500, total: 5780, exento: 84000 },
  },
  {
    nombre: "Five partners with EC$400,000",
    origen: { tipo: "recalculado", detalle: "FAQ 10 for five partners: 0% to 210,000, 8% to 354,000, 25% above. (354,000 - 210,000) x 8% = 11,520. (400,000 - 354,000) x 25% = 11,500. Total 23,020." },
    fecha: "2026-10-29",
    entrada: { ingreso: 400000, socios: 5, tarde: false },
    esperado: { impuesto: 23020, exento: 210000 },
  },
]);
