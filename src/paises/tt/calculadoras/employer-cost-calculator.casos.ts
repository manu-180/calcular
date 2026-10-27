import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$10,000 a month, average month",
    origen: {
      tipo: "recalculado",
      detalle: "Class XII employer contribution 244.00 a week. 244 × 52 ÷ 12 = 1,057.33. Cost 11,057.33. Year: 120,000 + 244 × 52 = 132,688.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 10000, lunes: "promedio" },
    esperado: { costo: 11057.33, nisEmpleador: 1057.33, costoAnual: 132688, clase: 12 },
  },
  {
    nombre: "TT$5,000 a month, 5 Mondays",
    origen: { tipo: "recalculado", detalle: "4,853 to 5,632.99 is class VII: employer 130.60, employee 65.30 a week. Five weeks: 653 and 326.50." },
    fecha: "2026-10-27",
    entrada: { bruto: 5000, lunes: "5" },
    esperado: { costo: 5653, nisEmpleador: 653, nisEmpleado: 326.5 },
  },
]);
