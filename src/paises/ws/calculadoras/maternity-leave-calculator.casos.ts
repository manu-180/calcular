import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const URL = "https://www.mcil.gov.ws/sites/default/files/documents/2013-01/Consolidated-Labour-and-Employment-Relations-Act-2013.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Option A from 2 November 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "4 weeks full pay and 2 unpaid: 6 weeks, ending 13 December. Pay 4 × 692.3077 = 2,769.23." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-11-02", opcion: "a", pagoMensual: 3000 },
    esperado: { semanasTotal: 6, semanasPagadas: 4, pago: 2769.23, ultimo: "2026-12-13", regreso: "2026-12-14" },
  },
  {
    nombre: "Option B from 2 November 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "6 weeks at two-thirds: 6 × 692.3077 = 4,153.85, × 66.6667% = 2,769.23." },
    fecha: "2026-10-29",
    entrada: { inicio: "2026-11-02", opcion: "b", pagoMensual: 3000 },
    esperado: { semanasTotal: 6, pago: 2769.23, ultimo: "2026-12-13" },
  },
]);
