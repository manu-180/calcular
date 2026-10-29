import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-security-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$9,000 basic wage",
    origen: { tipo: "recalculado", detalle: "0.9% × 9,000 = 81 each. Total 162." },
    fecha: "2026-10-27",
    entrada: { basico: 9000 },
    esperado: { empleado: 81, empleador: 81, total: 162, base: 9000 },
  },
  {
    nombre: "Above the ceiling in October 2026",
    origen: { tipo: "recalculado", detalle: "Ceiling N$12,500 (GN 236 of 2026). 0.9% × 12,500 = 112.50 each." },
    fecha: "2026-10-27",
    entrada: { basico: 30000 },
    esperado: { empleado: 112.5, empleador: 112.5, total: 225, base: 12500 },
  },
  {
    nombre: "Above the ceiling in February 2026",
    origen: { tipo: "recalculado", detalle: "Ceiling N$11,000 (GN 275 of 2024) until 28 February 2026. 0.9% × 11,000 = 99." },
    fecha: "2026-02-28",
    entrada: { basico: 30000 },
    esperado: { empleado: 99, base: 11000 },
  },
  {
    nombre: "Above the ceiling from 1 March 2027",
    origen: { tipo: "recalculado", detalle: "Ceiling N$14,000 from 1 March 2027. 0.9% × 14,000 = 126." },
    fecha: "2027-03-01",
    entrada: { basico: 30000 },
    esperado: { empleado: 126, base: 14000 },
  },
  {
    nombre: "Below the N$500 floor",
    origen: { tipo: "recalculado", detalle: "A basic wage of 300 counts as 500: 0.9% × 500 = 4.50." },
    fecha: "2026-10-27",
    entrada: { basico: 300 },
    esperado: { empleado: 4.5, base: 500 },
  },
]);
