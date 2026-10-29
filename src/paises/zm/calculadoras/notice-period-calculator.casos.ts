import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const LEY = "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Permanent job, notice on 1 November 2026",
    origen: { tipo: "recalculado", url: LEY, detalle: "Section 53(2)(c): 30 days. 1 November + 30 days = 1 December 2026." },
    fecha: "2026-10-26",
    entrada: { contrato: "mas-de-6", fecha: "2026-11-01" },
    esperado: { dias: 30, fin: "2026-12-01" },
  },
  {
    nombre: "Two-month contract",
    origen: { tipo: "recalculado", url: LEY, detalle: "Section 53(2)(b): 14 days." },
    fecha: "2026-10-26",
    entrada: { contrato: "1-a-3", fecha: "2026-10-26" },
    esperado: { dias: 14, fin: "2026-11-09" },
  },
  {
    nombre: "Contract of one month or less",
    origen: { tipo: "recalculado", url: LEY, detalle: "Section 53(2)(a): 24 hours." },
    fecha: "2026-10-26",
    entrada: { contrato: "hasta-1", fecha: "2026-10-26" },
    esperado: { horas: 24, fin: "2026-10-27" },
  },
]);
