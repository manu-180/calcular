import { definirCasos } from "@/motor/calculo";
import calculadora from "./gpssa-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "AED 25,000 a month",
    origen: {
      tipo: "oficial",
      url: "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/emiratis-employment-in-private-sector",
      detalle: "20% in total: employee 5% (1,250), employer 12.5% (3,125), government 2.5% (625) = 5,000.",
    },
    fecha: "2026-10-17",
    entrada: { salario: 25000 },
    esperado: { empleado: 1250, empleador: 3125, gobierno: 625, total: 5000, anual: 60000 },
  },
  {
    nombre: "No salary is not valid",
    origen: { tipo: "recalculado", detalle: "Salary 0." },
    fecha: "2026-10-17",
    entrada: { salario: 0 },
    esperaError: true,
  },
]);
