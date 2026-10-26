import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

const LMP = "https://www.mlss.gov.jm/wp-content/uploads/2024/07/Labour-Management-Procedures-LMP-JAMAICA-SPIRO-FINAL.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "80 weeks with the employer, J$40,000 a week",
    origen: { tipo: "recalculado", url: LMP, detalle: "Maternity Leave Act: 12 weeks of leave, 8 of them paid. 8 × 40,000 = 320,000." },
    fecha: "2026-10-24",
    entrada: { semanal: 40000, semanas: 80, veces: 0, domestica: false, menor: false },
    esperado: { pago: 320000, licencia: 12, pagadas: 8, sinPago: 4, extension: 14 },
  },
  {
    nombre: "Only 40 weeks with the employer",
    origen: { tipo: "recalculado", url: LMP, detalle: "Fewer than 52 weeks of continuous employment: the leave is unpaid." },
    fecha: "2026-10-24",
    entrada: { semanal: 40000, semanas: 40, veces: 0, domestica: false, menor: false },
    esperado: { pago: 0, pagadas: 0, sinPago: 12 },
  },
  {
    nombre: "Fourth paid leave with the same employer",
    origen: { tipo: "recalculado", url: LMP, detalle: "Paid maternity leave is limited to three times with one employer." },
    fecha: "2026-10-24",
    entrada: { semanal: 40000, semanas: 300, veces: 3, domestica: false, menor: false },
    esperado: { pago: 0 },
  },
  {
    nombre: "Household worker",
    origen: { tipo: "recalculado", url: LMP, detalle: "Domestic workers use the NIS maternity benefit instead." },
    fecha: "2026-10-24",
    entrada: { semanal: 20000, semanas: 100, veces: 0, domestica: true, menor: false },
    esperado: { pago: 0 },
  },
]);
