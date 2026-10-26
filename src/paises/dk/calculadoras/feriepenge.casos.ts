import { definirCasos } from "@/motor/calculo";
import feriepenge from "./feriepenge";

const FERIE = "https://www.retsinformation.dk/eli/lta/2024/152";

export default definirCasos(feriepenge, [
  {
    nombre: "Feriegodtgørelse af 400.000 kr. for et helt ferieår",
    origen: { tipo: "recalculado", url: FERIE, detalle: "§ 16, stk. 2: 12,5 % af 400.000 = 50.000. § 5: 12 × 2,08 = 24,96 dage. 50.000 / 24,96 = 2.003,21 pr. dag." },
    fecha: "2026-10-24",
    entrada: { type: "feriegodtgoerelse", loen: 400000, maaneder: 12 },
    esperado: { beloeb: 50000, dage: 24.96, prDag: 2003.21 },
  },
  {
    nombre: "Ferietillæg for fast månedsløn",
    origen: { tipo: "recalculado", url: FERIE, detalle: "§ 16, stk. 1: ferietillæg 1 % af 400.000 = 4.000." },
    fecha: "2026-10-24",
    entrada: { type: "ferietillaeg", loen: 400000, maaneder: 12 },
    esperado: { beloeb: 4000, sats: 1, prDag: null },
  },
  {
    nombre: "Seks måneders ansættelse",
    origen: { tipo: "recalculado", url: FERIE, detalle: "6 × 2,08 = 12,48 dage; 12,5 % af 200.000 = 25.000." },
    fecha: "2026-10-24",
    entrada: { type: "feriegodtgoerelse", loen: 200000, maaneder: 6 },
    esperado: { beloeb: 25000, dage: 12.48 },
  },
  {
    nombre: "Ingen løn",
    origen: { tipo: "recalculado", url: FERIE, detalle: "Uden løn er der ingen feriepenge at beregne." },
    fecha: "2026-10-24",
    entrada: { type: "feriegodtgoerelse", loen: 0, maaneder: 12 },
    esperaError: true,
  },
]);
