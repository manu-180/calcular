import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "Four years, 1.5 weeks of leave, full notice",
    origen: { tipo: "recalculado", detalle: "Weekly 9,000 ÷ 30 × 7 = 2,100. Gratuity 3 × 4 × 2,100 = 25,200. Leave 1.5 × 2,100 = 3,150. Total 28,350." },
    fecha: "2026-10-26",
    entrada: { basico: 9000, anios: 4, vacaciones: 1.5, pendiente: 0, preaviso: "cumplido", articulo61: false, metodoSemanal: "30" },
    esperado: { gratuidad: 25200, vacaciones: 3150, preaviso: 0, total: 28350 },
  },
  {
    nombre: "Employer ends the contract without notice after four years",
    origen: { tipo: "recalculado", detalle: "After the second year: two months × 9,000 = 18,000. Total 25,200 + 3,150 + 18,000 + 3,000 unpaid = 49,350." },
    fecha: "2026-10-26",
    entrada: { basico: 9000, anios: 4, vacaciones: 1.5, pendiente: 3000, preaviso: "empleador", articulo61: false, metodoSemanal: "30" },
    esperado: { preaviso: 18000, total: 49350 },
  },
  {
    nombre: "Employee leaves without notice after 18 months",
    origen: { tipo: "recalculado", detalle: "Weekly 6,000 ÷ 30 × 7 = 1,400. Gratuity 3 × 1.5 × 1,400 = 6,300. Notice one month: -6,000. Total 300." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, anios: 1.5, vacaciones: 0, pendiente: 0, preaviso: "empleado", articulo61: false, metodoSemanal: "30" },
    esperado: { gratuidad: 6300, preaviso: -6000, total: 300 },
  },
  {
    nombre: "Dismissal under Article 61",
    origen: { tipo: "recalculado", detalle: "No gratuity and no notice: only leave 2 × 1,400 = 2,800." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, anios: 3, vacaciones: 2, pendiente: 0, preaviso: "empleador", articulo61: true, metodoSemanal: "30" },
    esperado: { gratuidad: 0, preaviso: 0, total: 2800 },
  },
]);
