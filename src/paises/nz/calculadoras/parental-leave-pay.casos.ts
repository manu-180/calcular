import { definirCasos } from "@/motor/calculo";
import calculadora from "./parental-leave-pay";

const IRD = "https://www.ird.govt.nz/paid-parental-leave/working-out-your-entitlement/employees";

export default definirCasos(calculadora, [
  {
    nombre: "Inland Revenue example: Hannah",
    origen: {
      tipo: "oficial",
      url: IRD,
      detalle: "Ordinary weekly pay $1,100; best 26 weeks $26,980 (average $1,037.69). The higher is $1,100, capped at $811.05 a week, $1,622.10 a fortnight.",
    },
    fecha: "2026-10-14",
    entrada: { tipo: "employee", semanaOrdinaria: 1100, mejores26: 26980, neto12: 0, neto6: 0 },
    esperado: { semanal: 811.05, quincenal: 1622.1, promedio: 1100, total: 21087.3 },
  },
  {
    nombre: "Under the cap",
    origen: { tipo: "recalculado", detalle: "OWP 500, best 26 weeks 13,520 / 26 = 520. Higher 520. 26 weeks: 13,520." },
    fecha: "2026-10-14",
    entrada: { tipo: "employee", semanaOrdinaria: 500, mejores26: 13520, neto12: 0, neto6: 0 },
    esperado: { semanal: 520, total: 13520 },
  },
  {
    nombre: "Cap before 1 July 2026",
    origen: { tipo: "oficial", url: IRD, detalle: "1 July 2025 to 30 June 2026: maximum $788.66 a week." },
    fecha: "2026-06-15",
    entrada: { tipo: "employee", semanaOrdinaria: 1100, mejores26: 26980, neto12: 0, neto6: 0 },
    esperado: { semanal: 788.66 },
  },
  {
    nombre: "Self-employed on a low income gets the minimum",
    origen: { tipo: "recalculado", detalle: "10,000 / 52 = 192.31 and 4,000 / 26 = 153.85. Below the $239.50 minimum, so 239.50." },
    fecha: "2026-10-14",
    entrada: { tipo: "self-employed", semanaOrdinaria: 0, mejores26: 0, neto12: 10000, neto6: 4000 },
    esperado: { semanal: 239.5 },
  },
  {
    nombre: "Self-employed uses the better 6 months",
    origen: { tipo: "recalculado", detalle: "24,000 / 52 = 461.54; 15,600 / 26 = 600. Higher 600." },
    fecha: "2026-10-14",
    entrada: { tipo: "self-employed", semanaOrdinaria: 0, mejores26: 0, neto12: 24000, neto6: 15600 },
    esperado: { semanal: 600, promedio: 600 },
  },
  {
    nombre: "No income entered",
    origen: { tipo: "recalculado", detalle: "Employee with no pay and no earnings." },
    fecha: "2026-10-14",
    entrada: { tipo: "employee", semanaOrdinaria: 0, mejores26: 0, neto12: 0, neto6: 0 },
    esperaError: true,
  },
]);
