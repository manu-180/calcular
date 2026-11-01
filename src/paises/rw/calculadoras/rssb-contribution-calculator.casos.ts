import { definirCasos } from "@/motor/calculo";
import calculadora from "./rssb-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 300,000 gross, no RAMA",
    origen: {
      tipo: "recalculado",
      detalle: "Employee: pension 18,000 + maternity 900 + CBHI 1,136 = 20,036. Employer: pension 18,000 + maternity 900 = 18,900. Total 38,936.",
    },
    fecha: "2026-10-26",
    entrada: { bruto: 300000, rama: false, basico: null },
    esperado: { total: 38936, empleado: 20036, empleador: 18900, cbhi: 1136 },
  },
  {
    nombre: "RWF 500,000 gross on RAMA with RWF 300,000 basic",
    origen: {
      tipo: "recalculado",
      detalle: "Employee: 30,000 + 1,500 + 22,500 + CBHI 1,773 = 55,773. Employer: 30,000 + 1,500 + 22,500 = 54,000. Total 109,773.",
    },
    fecha: "2026-10-26",
    entrada: { bruto: 500000, rama: true, basico: 300000 },
    esperado: { total: 109773, empleado: 55773, empleador: 54000, medicoEmpleador: 22500 },
  },
]);
