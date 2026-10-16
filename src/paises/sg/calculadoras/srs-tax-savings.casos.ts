import { definirCasos } from "@/motor/calculo";
import calculadora from "./srs-tax-savings";

const SRS = "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/supplementary-retirement-scheme-(srs)-relief";

export default definirCasos(calculadora, [
  {
    nombre: "Citizen at $120,000 putting in the full $15,300",
    origen: { tipo: "recalculado", url: SRS, detalle: "Before: 7,950. After: 104,700 → 3,350 + 24,700 × 11.5% = 6,190.50. Saving 1,759.50." },
    fecha: "2026-10-14",
    entrada: { gravable: 120000, perfil: "ciudadano-pr", aporte: 15300 },
    esperado: { ahorro: 1759.5, antes: 7950, despues: 6190.5, alivio: 15300 },
  },
  {
    nombre: "Foreigner at $200,000 putting in $35,700",
    origen: { tipo: "recalculado", url: SRS, detalle: "Before: 21,150. After: 164,300 → 13,950 + 4,300 × 18% = 14,724. Saving 6,426." },
    fecha: "2026-10-14",
    entrada: { gravable: 200000, perfil: "extranjero", aporte: 35700 },
    esperado: { ahorro: 6426, alivio: 35700 },
  },
  {
    nombre: "Contribution above the limit",
    origen: { tipo: "recalculado", detalle: "Citizen or PR limit is 15,300, so relief is 15,300 even if 20,000 is put in." },
    fecha: "2026-10-14",
    entrada: { gravable: 120000, perfil: "ciudadano-pr", aporte: 20000 },
    esperado: { alivio: 15300, ahorro: 1759.5 },
  },
]);
