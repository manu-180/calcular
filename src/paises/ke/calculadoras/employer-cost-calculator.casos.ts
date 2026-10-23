import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on KSh 60,000",
    origen: { tipo: "recalculado", detalle: "Employer NSSF 540 + 6% × 51,000 = 3,600. Housing Levy 1.5% = 900. Cost 60,000 + 3,600 + 900 = 64,500." },
    fecha: "2026-10-17",
    entrada: { bruto: 60000, empleados: 1 },
    esperado: { porEmpleado: 64500, nssfEmpleador: 3600, housingLevy: 900, cargas: 4500, total: 64500, anual: 774000 },
  },
  {
    nombre: "Three employees above the NSSF ceiling",
    origen: { tipo: "recalculado", detalle: "NSSF capped at 6,480. Housing Levy 1.5% × 200,000 = 3,000. 209,480 × 3 = 628,440." },
    fecha: "2026-10-17",
    entrada: { bruto: 200000, empleados: 3 },
    esperado: { porEmpleado: 209480, nssfEmpleador: 6480, total: 628440 },
  },
]);
