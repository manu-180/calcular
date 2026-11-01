import { definirCasos } from "@/motor/calculo";
import kpiKalkulator from "./kpi-kalkulator";

const SSB = "https://data.ssb.no/api/pxwebapi/v2/tables/14700/data?lang=no&valueCodes%5BVareTjenesteGrp%5D=00&valueCodes%5BContentsCode%5D=KpiIndMnd&valueCodes%5BTid%5D=*&outputFormat=json-stat2";

export default definirCasos(kpiKalkulator, [
  {
    nombre: "1 000 kr fra januar 2015 til september 2026",
    origen: { tipo: "oficial", url: SSB, detalle: "KPI januar 2015 = 71,6 og september 2026 = 104,0 (2025=100). 1 000 × 104 / 71,6 = 1 452,51." },
    fecha: "2026-10-24",
    entrada: { belop: 1000, fra: "2015-01-01", til: "2026-09-15" },
    esperado: { verdi: 1452.51, okning: 452.51, kjopekraft: 688.46, fraManed: "januar 2015", tilManed: "september 2026" },
  },
  {
    nombre: "Siste tolv måneder",
    origen: { tipo: "oficial", url: SSB, detalle: "September 2025 = 100,6, september 2026 = 104,0: 3,38 %." },
    fecha: "2026-10-24",
    entrada: { belop: 1000, fra: "2025-09-01", til: "2026-09-01" },
    esperado: { verdi: 1033.8, endring: 3.3797 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Sluttmåned uten tall ennå",
    origen: { tipo: "oficial", url: SSB, detalle: "Oktober 2026 er ikke publisert 24.10.2026: regner til september." },
    fecha: "2026-10-24",
    entrada: { belop: 1000, fra: "2000-01-01", til: "2026-10-24" },
    esperado: { verdi: 1922.37, tilManed: "september 2026" },
  },
  {
    nombre: "Startmåned før tallene",
    origen: { tipo: "oficial", url: SSB, detalle: "Serien starter i januar 2000." },
    fecha: "2026-10-24",
    entrada: { belop: 1000, fra: "1999-06-01", til: "2026-09-01" },
    esperaError: true,
  },
]);
