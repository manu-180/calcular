import { definirCasos } from "@/motor/calculo";
import calculadora from "./grsia-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Basic 25,000, social 3,000, housing 7,000",
    origen: { tipo: "recalculado", detalle: "Law 1/2022 art. 11-12: base 25,000 + 3,000 + min(7,000; 6,000) = 34,000. Employee 7% = 2,380. Employer 14% = 4,760. Total 7,140." },
    fecha: "2026-10-26",
    entrada: { basico: 25000, social: 3000, vivienda: 7000 },
    esperado: { base: 34000, empleado: 2380, empleador: 4760, total: 7140, anual: 85680 },
  },
  {
    nombre: "Salary above the cap",
    origen: { tipo: "recalculado", detalle: "95,000 + 5,000 + 6,000 = 106,000, capped at 100,000. 7% = 7,000. 14% = 14,000." },
    fecha: "2026-10-26",
    entrada: { basico: 95000, social: 5000, vivienda: 6000 },
    esperado: { base: 100000, empleado: 7000, empleador: 14000 },
  },
  {
    nombre: "Day the law came into force",
    origen: { tipo: "recalculado", detalle: "3 January 2023: base 10,000. 7% = 700." },
    fecha: "2023-01-03",
    entrada: { basico: 10000, social: 0, vivienda: 0 },
    esperado: { empleado: 700, empleador: 1400 },
  },
]);
