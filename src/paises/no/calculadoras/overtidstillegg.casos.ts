import { definirCasos } from "@/motor/calculo";
import overtidstillegg from "./overtidstillegg";

const AML = "https://lovdata.no/lov/2005-06-17-62/%C2%A710-6";

export default definirCasos(overtidstillegg, [
  {
    nombre: "Timelønn 300 kr, 10 timer med 40 %",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 10-6 (11): tillegg 40 % = 120 per time. 420 × 10 = 4 200." },
    fecha: "2026-10-24",
    entrada: { modus: "time", timelonn: 300, manedslonn: null, ukeTimer: null, timer: 10, tillegg: 40 },
    esperado: { totalt: 4200, perTime: 420, tilleggTotalt: 1200 },
  },
  {
    nombre: "Månedslønn 50 000 kr og 37,5 timer i uken",
    origen: { tipo: "recalculado", url: AML, detalle: "Timelønn 600 000 / (37,5 × 52) = 307,69. Tillegg 123,08, per time 430,77, 10 timer 4 307,70." },
    fecha: "2026-10-24",
    entrada: { modus: "mnd", timelonn: null, manedslonn: 50000, ukeTimer: 37.5, timer: 10, tillegg: 40 },
    esperado: { timelonn: 307.69, perTime: 430.77, totalt: 4307.7 },
  },
  {
    nombre: "50 % etter avtale",
    origen: { tipo: "recalculado", url: AML, detalle: "300 + 50 % = 450 per time; 5 timer = 2 250." },
    fecha: "2026-10-24",
    entrada: { modus: "time", timelonn: 300, manedslonn: null, ukeTimer: null, timer: 5, tillegg: 50 },
    esperado: { totalt: 2250 },
  },
  {
    nombre: "Tillegg under loven",
    origen: { tipo: "recalculado", url: AML, detalle: "25 % er under minstetillegget på 40 %." },
    fecha: "2026-10-24",
    entrada: { modus: "time", timelonn: 300, manedslonn: null, ukeTimer: null, timer: 5, tillegg: 25 },
    esperaError: true,
  },
]);
