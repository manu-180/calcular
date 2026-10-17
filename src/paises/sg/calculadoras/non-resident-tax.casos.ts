import { definirCasos } from "@/motor/calculo";
import calculadora from "./non-resident-tax";

const IRAS = "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/individual-income-tax-rates";

export default definirCasos(calculadora, [
  {
    nombre: "$60,000 salary: the flat 15% is higher",
    origen: { tipo: "recalculado", url: IRAS, detalle: "15% × 60,000 = 9,000. Resident rates: 550 + 20,000 × 7% = 1,950. The higher is 9,000." },
    fecha: "2026-10-14",
    entrada: { empleo: 60000, otros: 0 },
    esperado: { total: 9000, plano: 9000, progresivo: 1950 },
  },
  {
    nombre: "$500,000 salary: resident rates are higher",
    origen: { tipo: "oficial", url: IRAS, detalle: "Resident rates on the first $500,000 = $84,150, more than 15% × 500,000 = 75,000." },
    fecha: "2026-10-14",
    entrada: { empleo: 500000, otros: 0 },
    esperado: { total: 84150, sobreEmpleo: 84150, plano: 75000 },
  },
  {
    nombre: "Director's fees at 24%",
    origen: { tipo: "recalculado", url: IRAS, detalle: "Other income of 10,000 × 24% = 2,400, plus 15% of 40,000 = 6,000. Total 8,400." },
    fecha: "2026-10-14",
    entrada: { empleo: 40000, otros: 10000 },
    esperado: { total: 8400, sobreOtros: 2400 },
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Both amounts at zero." },
    fecha: "2026-10-14",
    entrada: { empleo: 0, otros: 0 },
    esperaError: true,
  },
]);
