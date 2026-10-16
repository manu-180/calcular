import { definirCasos } from "@/motor/calculo";
import calculadora from "./ietc-calculator";

const IRD = "https://www.ird.govt.nz/income-tax/income-tax-for-individuals/individual-tax-credits/independent-earner-tax-credit-ietc";

export default definirCasos(calculadora, [
  {
    nombre: "$50,000 gets the full credit",
    origen: { tipo: "oficial", url: IRD, detalle: "Inland Revenue: $10 a week ($520 a year) for income between $24,000 and $66,000." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, excluido: false },
    esperado: { credito: 520, semanal: 10, quincenal: 20 },
  },
  {
    nombre: "$68,000 is abated",
    origen: { tipo: "recalculado", detalle: "520 − (68,000 − 66,000) × 13% = 520 − 260 = 260." },
    fecha: "2026-10-14",
    entrada: { ingreso: 68000, excluido: false },
    esperado: { credito: 260 },
  },
  {
    nombre: "$70,000 gets nothing",
    origen: { tipo: "recalculado", detalle: "520 − 4,000 × 13% = 0." },
    fecha: "2026-10-14",
    entrada: { ingreso: 70000, excluido: false },
    esperado: { credito: 0 },
  },
  {
    nombre: "Under $24,000",
    origen: { tipo: "recalculado", detalle: "23,999 is under the lower threshold." },
    fecha: "2026-10-14",
    entrada: { ingreso: 23999, excluido: false },
    esperado: { credito: 0 },
  },
  {
    nombre: "On Working for Families",
    origen: { tipo: "oficial", url: IRD, detalle: "No IETC if you or your partner get Working for Families." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, excluido: true },
    esperado: { credito: 0 },
  },
  {
    nombre: "Negative income",
    origen: { tipo: "recalculado", detalle: "Negative income is not valid." },
    fecha: "2026-10-14",
    entrada: { ingreso: -5, excluido: false },
    esperaError: true,
  },
]);
