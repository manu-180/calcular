import { definirCasos } from "@/motor/calculo";
import calculadora from "./vakantiedagen-berekenen";

const BW = "https://wetten.overheid.nl/BWBR0005290/2026-01-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Fulltime, heel jaar",
    origen: { tipo: "recalculado", url: BW, detalle: "Artikel 7:634 BW: 4 × 40 uur = 160 uur; 8 uur per dag = 20 dagen." },
    fecha: "2026-10-14",
    entrada: { urenPerWeek: 40, dagenPerWeek: 5, maanden: 12, extraDagen: 0 },
    esperado: { wettelijkeUren: 160, wettelijkeDagen: 20, totaalDagen: 20 },
  },
  {
    nombre: "Parttime 24 uur in 3 dagen",
    origen: { tipo: "recalculado", url: BW, detalle: "4 × 24 = 96 uur; 8 uur per dag = 12 dagen." },
    fecha: "2026-10-14",
    entrada: { urenPerWeek: 24, dagenPerWeek: 3, maanden: 12, extraDagen: 0 },
    esperado: { wettelijkeUren: 96, wettelijkeDagen: 12 },
  },
  {
    nombre: "Zes maanden in dienst met 5 bovenwettelijke dagen",
    origen: { tipo: "recalculado", detalle: "Wettelijk 4 × 36 × 6/12 = 72 uur; 7,2 uur per dag = 10 dagen. Extra 5 × 6/12 = 2,5 dagen = 18 uur. Totaal 90 uur, 12,5 dagen." },
    fecha: "2026-10-14",
    entrada: { urenPerWeek: 36, dagenPerWeek: 5, maanden: 6, extraDagen: 5 },
    esperado: { wettelijkeUren: 72, wettelijkeDagen: 10, extraDagen: 2.5, extraUren: 18, totaalUren: 90, totaalDagen: 12.5 },
  },
  {
    nombre: "Zonder uren geen berekening",
    origen: { tipo: "recalculado", detalle: "Nul uur per week is geen geldige invoer." },
    fecha: "2026-10-14",
    entrada: { urenPerWeek: 0, dagenPerWeek: 5, maanden: 12, extraDagen: 0 },
    esperaError: true,
  },
]);
