import { definirCasos } from "@/motor/calculo";
import salariulMinim from "./salariul-minim";

const HG26 = "https://monitorul.gov.md/ro/monitorul/view/pdf/3193/part/2";

export default definirCasos(salariulMinim, [
  {
    nombre: "2026, program complet",
    origen: { tipo: "oficial", url: HG26, detalle: "HG nr. 771/2025: 6.300 de lei lunar pentru 169 de ore, 37,28 lei pe oră. Net: 6.300 − 567 − 390,96 = 5.342,04; cost 6.300 + 1.512 = 7.812." },
    fecha: "2026-10-26",
    entrada: { ore: 8 },
    esperado: { brut: 6300, orar: 37.28, oreLuna: 169, net: 5342.04, cost: 7812 },
  },
  {
    nombre: "2026, 4 ore pe zi",
    origen: { tipo: "recalculado", url: HG26, detalle: "6.300 × 4 / 8 = 3.150." },
    fecha: "2026-10-26",
    entrada: { ore: 4 },
    esperado: { brut: 3150 },
  },
  {
    nombre: "Prima zi din 2026",
    origen: { tipo: "oficial", url: HG26, detalle: "HG nr. 771/2025 intră în vigoare la 1 ianuarie 2026." },
    fecha: "2026-01-01",
    entrada: { ore: 8 },
    esperado: { brut: 6300, orar: 37.28 },
  },
  {
    nombre: "Zero ore",
    origen: { tipo: "recalculado", url: HG26, detalle: "Programul are cel puțin o oră pe zi." },
    fecha: "2026-10-26",
    entrada: { ore: 0 },
    esperaError: true,
  },
]);
