import { definirCasos } from "@/motor/calculo";
import calculadora from "./vacation-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Twelve months and 5 days taken",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Section C18(1): 1 day a month, so 12 earned. 7 days due. A day's pay 3,300 / 22 = 150. Value 1,050." },
    fecha: "2026-10-29",
    entrada: { salario: 3300, diasLaborales: 22, meses: 12, tomados: 5 },
    esperado: { ganados: 12, pendientes: 7, pagoDiario: 150, valor: 1050 },
  },
  {
    nombre: "Eighteen months and none taken",
    origen: { tipo: "recalculado", detalle: "18 x 1 = 18 days. 18 x (4,400 / 22 = 200) = 3,600." },
    fecha: "2026-10-29",
    entrada: { salario: 4400, diasLaborales: 22, meses: 18, tomados: 0 },
    esperado: { ganados: 18, pendientes: 18, valor: 3600 },
  },
  {
    nombre: "Taking more than earned is refused",
    origen: { tipo: "recalculado", detalle: "3 months earn 3 days, so 4 taken is impossible." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, diasLaborales: 22, meses: 3, tomados: 4 },
    esperaError: true,
  },
]);
