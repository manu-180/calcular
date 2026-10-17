import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

const MOM = "https://www.mom.gov.sg/employment-practices/hours-of-work-overtime-and-rest-days";

export default definirCasos(calculadora, [
  {
    nombre: "MOM example: non-workman at $2,600, 2 hours",
    origen: { tipo: "oficial", url: MOM, detalle: "$13.60 × 1.5 × 2 hours = $40.80." },
    fecha: "2026-10-14",
    entrada: { basico: 2600, categoria: "no-manual", horas: 2 },
    esperado: { pago: 40.8, porHora: 13.6 },
  },
  {
    nombre: "Non-workman at $2,000, 10 hours",
    origen: { tipo: "recalculado", url: MOM, detalle: "(12 × 2,000) / (52 × 44) = 10.49. 10.49 × 1.5 × 10 = 157.35." },
    fecha: "2026-10-14",
    entrada: { basico: 2000, categoria: "no-manual", horas: 10 },
    esperado: { pago: 157.35, porHora: 10.49, tarifa: 15.74 },
  },
  {
    nombre: "Workman at $3,000, 20 hours",
    origen: { tipo: "recalculado", url: MOM, detalle: "(12 × 3,000) / 2,288 = 15.73. 15.73 × 1.5 × 20 = 471.90." },
    fecha: "2026-10-14",
    entrada: { basico: 3000, categoria: "manual", horas: 20 },
    esperado: { pago: 471.9, porHora: 15.73 },
  },
  {
    nombre: "Non-workman above $2,600 is not covered",
    origen: { tipo: "oficial", url: MOM, detalle: "Overtime applies to non-workmen earning $2,600 or less." },
    fecha: "2026-10-14",
    entrada: { basico: 3500, categoria: "no-manual", horas: 10 },
    esperado: { pago: null },
  },
]);
