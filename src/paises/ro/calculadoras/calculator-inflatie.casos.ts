import { definirCasos } from "@/motor/calculo";
import calculatorInflatie from "./calculator-inflatie";

const EUROSTAT = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=RO&unit=I25&coicop18=TOTAL";

export default definirCasos(calculatorInflatie, [
  {
    nombre: "1.000 de lei din ianuarie 2020 în septembrie 2026",
    origen: { tipo: "oficial", url: EUROSTAT, detalle: "IAPC România (2025 = 100): ianuarie 2020 = 68,78; septembrie 2026 = 109,19. 1.000 × 109,19 / 68,78 = 1.587,53 lei; inflație 58,75 %." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, de: "2020-01-01", pana: "2026-09-15" },
    esperado: { actualizata: 1587.53, diferenta: 587.53, putere: 629.91, inflatie: 58.7525, lunaDe: "ianuarie 2020", lunaPana: "septembrie 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "Ultimele 12 luni",
    origen: { tipo: "oficial", url: EUROSTAT, detalle: "Septembrie 2025 = 102,48; septembrie 2026 = 109,19: 1.000 × 109,19 / 102,48 = 1.065,48; inflație anuală 6,55 %." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, de: "2025-09-01", pana: "2026-09-01" },
    esperado: { actualizata: 1065.48 },
  },
  {
    nombre: "Luna de sosire încă nepublicată",
    origen: { tipo: "recalculado", url: EUROSTAT, detalle: "Pentru octombrie 2026 nu există încă indice; calculul se oprește la septembrie 2026." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, de: "2025-09-01", pana: "2026-10-24" },
    esperado: { actualizata: 1065.48, lunaPana: "septembrie 2026" },
  },
  {
    nombre: "Lună de pornire înainte de 2000",
    origen: { tipo: "recalculado", url: EUROSTAT, detalle: "Seria din calculator începe în ianuarie 2000." },
    fecha: "2026-10-24",
    entrada: { suma: 1000, de: "1999-12-01", pana: "2026-09-01" },
    esperaError: true,
  },
]);
