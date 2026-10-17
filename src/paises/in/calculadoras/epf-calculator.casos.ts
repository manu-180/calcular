import { definirCasos } from "@/motor/calculo";
import calculadora from "./epf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One year on ₹20,000 basic, no interest",
    origen: {
      tipo: "recalculado",
      detalle: "Your PF 12% = 2,400. Employer 2,400, of which EPS 8.33% of 20,000 = 1,666, so 734 goes to EPF. 12 × (2,400 + 734) = 37,608.",
    },
    fecha: "2026-10-15",
    entrada: { basico: 20000, edad: 57, retiro: 58, saldo: 0, aumento: 0, interes: 0, pf: "full" },
    esperado: { saldo: 37608, tuyo: 28800, empleador: 8808, epsMes: 1666, empleadorMes: 734 },
  },
  {
    nombre: "One year with interest on the monthly balance",
    origen: { tipo: "recalculado", detalle: "3,134 a month at 1% a month: interest 3,134 × 0.01 × (1 + 2 + ... + 12) = 2,444.52. Balance 37,608 + 2,444.52 = 40,052.52." },
    fecha: "2026-10-15",
    entrada: { basico: 20000, edad: 57, retiro: 58, saldo: 0, aumento: 0, interes: 12, pf: "full" },
    esperado: { saldo: 40052.52, interes: 2444.52 },
  },
  {
    nombre: "PF on the ₹25,000 wage ceiling",
    origen: { tipo: "recalculado", detalle: "Wage for PF 25,000: your PF 3,000; EPS 8.33% of 25,000 = 2,082.50; employer EPF 917.50." },
    fecha: "2026-10-15",
    entrada: { basico: 40000, edad: 30, retiro: 31, saldo: 0, aumento: 0, interes: 0, pf: "ceiling" },
    esperado: { tuyoMes: 3000, epsMes: 2082.5, empleadorMes: 917.5, saldo: 47010 },
  },
  {
    nombre: "Retirement age below current age",
    origen: { tipo: "recalculado", detalle: "There are no years left to save." },
    fecha: "2026-10-15",
    entrada: { basico: 40000, edad: 40, retiro: 40, saldo: 0, aumento: 0, interes: 8, pf: "full" },
    esperaError: true,
  },
]);
