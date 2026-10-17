import { definirCasos } from "@/motor/calculo";
import calculadora from "./absd-calculator";

const IRAS = "https://www.iras.gov.sg/taxes/stamp-duty/for-property/buying-or-acquiring-property/additional-buyer's-stamp-duty-(absd)";

export default definirCasos(calculadora, [
  {
    nombre: "IRAS example: foreigner at $2 million",
    origen: { tipo: "oficial", url: IRAS, detalle: "60% of $2,000,000 = $1,200,000. BSD recalculated: 1,800 + 3,600 + 19,200 + 20,000 + 500,000 × 5% = 69,600." },
    fecha: "2026-10-14",
    entrada: { precio: 2000000, perfil: "extranjero" },
    esperado: { absd: 1200000, bsd: 69600, total: 1269600 },
  },
  {
    nombre: "Citizen buying a second home at $1.5 million",
    origen: { tipo: "recalculado", url: IRAS, detalle: "20% × 1,500,000 = 300,000. BSD 1,800 + 3,600 + 19,200 + 20,000 = 44,600." },
    fecha: "2026-10-14",
    entrada: { precio: 1500000, perfil: "sc-2" },
    esperado: { absd: 300000, bsd: 44600, total: 344600 },
  },
  {
    nombre: "PR buying a first home at $900,000",
    origen: { tipo: "recalculado", detalle: "5% × 900,000 = 45,000. BSD 1,800 + 3,600 + 540,000 × 3% = 21,600." },
    fecha: "2026-10-14",
    entrada: { precio: 900000, perfil: "pr-1" },
    esperado: { absd: 45000, bsd: 21600 },
  },
  {
    nombre: "Citizen's first home pays no ABSD",
    origen: { tipo: "recalculado", detalle: "SC first residential property: not applicable." },
    fecha: "2026-10-14",
    entrada: { precio: 900000, perfil: "sc-1" },
    esperado: { absd: 0, tasa: 0 },
  },
]);
