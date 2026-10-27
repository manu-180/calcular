import { definirCasos } from "@/motor/calculo";
import calculadora from "./sshfc-contribution";

export default definirCasos(calculadora, [
  {
    nombre: "NPF on D10,000 basic and D2,000 allowances",
    origen: {
      tipo: "recalculado",
      detalle: "Employee 5% of 10,000 = 500. Employer 10% of 10,000 = 1,000. IICF 1% of 12,000 = 120, capped at 15. Remit 1,515.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 10000, subsidios: 2000, esquema: "npf" },
    esperado: { trabajador: 500, empleador: 1000, pension: 1500, iicf: 15, remitir: 1515 },
  },
  {
    nombre: "FPS on the same pay",
    origen: { tipo: "recalculado", detalle: "Employer 15% of 12,000 = 1,800. Nothing from the employee. IICF 15." },
    fecha: "2026-10-27",
    entrada: { basico: 10000, subsidios: 2000, esquema: "fps" },
    esperado: { trabajador: 0, empleador: 1800, totalEmpleador: 1815 },
  },
  {
    nombre: "IICF below the cap",
    origen: { tipo: "recalculado", detalle: "1% of 1,200 = 12, under the D15 ceiling. NPF 60 and 120." },
    fecha: "2026-10-27",
    entrada: { basico: 1200, subsidios: 0, esquema: "npf" },
    esperado: { iicf: 12, trabajador: 60, empleador: 120 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { basico: 0, subsidios: 0, esquema: "npf" },
    esperaError: true,
  },
]);
