import { definirCasos } from "@/motor/calculo";
import calculadora from "./uif-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R15 000 a month",
    origen: { tipo: "recalculado", detalle: "1% of 15 000 = 150 from the employee and 150 from the employer, 300 in total." },
    fecha: "2026-10-14",
    entrada: { salario: 15000 },
    esperado: { empleado: 150, empleador: 150, total: 300, anual: 3600, base: 15000 },
  },
  {
    nombre: "R40 000 a month hits the ceiling",
    origen: { tipo: "oficial", url: "https://www.sars.gov.za/types-of-tax/unemployment-insurance-fund/", detalle: "Ceiling R17 712 a month since 1 June 2021; 1% = 177.12 each." },
    fecha: "2026-10-14",
    entrada: { salario: 40000 },
    esperado: { empleado: 177.12, empleador: 177.12, total: 354.24, base: 17712 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "Pay of 0 is not a valid input." },
    fecha: "2026-10-14",
    entrada: { salario: 0 },
    esperaError: true,
  },
]);
