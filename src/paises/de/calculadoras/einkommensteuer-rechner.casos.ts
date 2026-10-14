import { definirCasos } from "@/motor/calculo";
import einkommensteuerRechner from "./einkommensteuer-rechner";

const TARIF = "https://www.gesetze-im-internet.de/estg/__32a.html";

export default definirCasos(einkommensteuerRechner, [
  {
    nombre: "50.000 Euro, Grundtarif, mit Kirche in Hessen",
    origen: {
      tipo: "recalculado",
      url: TARIF,
      detalle: "z = (50000 − 17799) / 10000 = 3,2201; (173,10 × z + 2397) × z + 1034,87 = 10548,34, abgerundet 10548. Soli 0 (unter 20350). KiSt 9 % = 949,32. Grenzsteuersatz (2 × 173,10 × z + 2397) / 100 = 35,12 %.",
    },
    fecha: "2026-10-14",
    entrada: { zvE: 50000, veranlagung: "einzeln", kirche: true, bundesland: "he" },
    esperado: { est: 10548, soli: 0, kirchensteuer: 949.32, gesamt: 11497.32, grenz: 35.1179862 },
    tolerancia: 0.01,
  },
  {
    nombre: "100.000 Euro mit Splitting",
    origen: { tipo: "recalculado", url: TARIF, detalle: "Splitting: 2 × Steuer auf 50000 = 2 × 10548 = 21096. Soli 0 (Freigrenze 40700)." },
    fecha: "2026-10-14",
    entrada: { zvE: 100000, veranlagung: "zusammen", kirche: false, bundesland: "nw" },
    esperado: { est: 21096, soli: 0 },
  },
  {
    nombre: "90.000 Euro: Soli in der Milderungszone",
    origen: { tipo: "recalculado", url: TARIF, detalle: "0,42 × 90000 − 11135,63 = 26664,37 → 26664. Soli: min(5,5 % × 26664 = 1466,52; 11,9 % × (26664 − 20350) = 751,36) = 751,36." },
    fecha: "2026-10-14",
    entrada: { zvE: 90000, veranlagung: "einzeln", kirche: false, bundesland: "nw" },
    esperado: { est: 26664, soli: 751.36, grenz: 42 },
  },
  {
    nombre: "300.000 Euro im Spitzensteuersatz",
    origen: { tipo: "recalculado", url: TARIF, detalle: "0,45 × 300000 − 19470,38 = 115529,62 → 115529. Soli 5,5 % = 6354,09." },
    fecha: "2026-10-14",
    entrada: { zvE: 300000, veranlagung: "einzeln", kirche: false, bundesland: "nw" },
    esperado: { est: 115529, soli: 6354.09, grenz: 45 },
  },
  {
    nombre: "15.000 Euro in der ersten Progressionszone",
    origen: { tipo: "recalculado", url: TARIF, detalle: "y = (15000 − 12348) / 10000 = 0,2652; (914,51 × y + 1400) × y = 435,59 → 435." },
    fecha: "2026-10-14",
    entrada: { zvE: 15000, veranlagung: "einzeln", kirche: false, bundesland: "nw" },
    esperado: { est: 435 },
  },
]);
