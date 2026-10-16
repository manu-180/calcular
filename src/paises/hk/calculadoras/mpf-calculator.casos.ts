import { definirCasos } from "@/motor/calculo";
import calculadora from "./mpf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Between the minimum and maximum: 5% each",
    origen: { tipo: "oficial", url: "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees", detalle: "$7,100 to $30,000: relevant income x 5% for both. 25,000 x 5% = 1,250." },
    fecha: "2026-10-16",
    entrada: { ingreso: 25000 },
    esperado: { empleado: 1250, empleador: 1250, total: 2500, neto: 23750 },
  },
  {
    nombre: "Below $7,100: only the employer contributes",
    origen: { tipo: "oficial", url: "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees", detalle: "Less than $7,100: employee nil, employer relevant income x 5%. 6,000 x 5% = 300." },
    fecha: "2026-10-16",
    entrada: { ingreso: 6000 },
    esperado: { empleado: 0, empleador: 300 },
  },
  {
    nombre: "Above $30,000: capped at $1,500 each",
    origen: { tipo: "oficial", url: "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees", detalle: "More than $30,000: $1,500 for the employee and $1,500 for the employer." },
    fecha: "2026-10-16",
    entrada: { ingreso: 45000 },
    esperado: { empleado: 1500, empleador: 1500, anualEmpleado: 18000 },
  },
  {
    nombre: "Exactly $7,100: both contribute",
    origen: { tipo: "oficial", url: "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees", detalle: "$7,100 to $30,000 band. 7,100 x 5% = 355." },
    fecha: "2026-10-16",
    entrada: { ingreso: 7100 },
    esperado: { empleado: 355, empleador: 355 },
  },
  {
    nombre: "No income is not valid",
    origen: { tipo: "recalculado", detalle: "Income 0." },
    fecha: "2026-10-16",
    entrada: { ingreso: 0 },
    esperaError: true,
  },
]);
