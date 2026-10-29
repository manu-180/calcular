import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$20,000 bonus on a TT$180,000 salary",
    origen: { tipo: "recalculado", detalle: "The salary already uses up the allowance, so the whole bonus is taxed at 25%: 5,000. Net 15,000." },
    fecha: "2026-10-27",
    entrada: { bono: 20000, salario: 180000, nis: 0, pension: 0 },
    esperado: { neto: 15000, impuesto: 5000, tasa: 25 },
  },
  {
    nombre: "Bonus that crosses the allowance",
    origen: { tipo: "recalculado", detalle: "Salary 80,000. With a 20,000 bonus chargeable income is 10,000. Tax 2,500 on the bonus. Net 17,500." },
    fecha: "2026-10-27",
    entrada: { bono: 20000, salario: 80000, nis: 0, pension: 0 },
    esperado: { impuesto: 2500, neto: 17500 },
  },
  {
    nombre: "Bonus that crosses the higher band",
    origen: { tipo: "recalculado", detalle: "Salary 1,050,000: chargeable 960,000. Bonus 100,000: 40,000 at 25% and 60,000 at 30% = 28,000." },
    fecha: "2026-10-27",
    entrada: { bono: 100000, salario: 1050000, nis: 0, pension: 0 },
    esperado: { impuesto: 28000, neto: 72000 },
  },
]);
