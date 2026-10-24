import { definirCasos } from "@/motor/calculo";
import calculadora from "./service-incentive-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Two unused days at ₱755",
    origen: { tipo: "recalculado", detalle: "5 days a year, 3 used, 2 left × 755 = 1,510. Full year 5 × 755 = 3,775." },
    fecha: "2026-10-16",
    entrada: { diario: 755, meses: 30, usados: 3 },
    esperado: { efectivo: 1510, restantes: 2, dias: 5, valorAnual: 3775 },
  },
  {
    nombre: "Less than a year of service",
    origen: { tipo: "recalculado", detalle: "Omnibus Rules, Rule V sec. 2 and 3: at least 12 months of service." },
    fecha: "2026-10-16",
    entrada: { diario: 755, meses: 11, usados: 0 },
    esperado: { efectivo: 0, dias: 0 },
  },
  {
    nombre: "More days used than the leave",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { diario: 755, meses: 24, usados: 6 },
    esperaError: true,
  },
]);
