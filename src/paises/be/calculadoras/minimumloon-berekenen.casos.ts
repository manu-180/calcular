import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimumloon-berekenen";

const NAR = "https://cnt-nar.be/sites/default/files/documents/fr/Tableau-Tabel-Montants%20CCT-CAO%20Bedragen-2026-07-01.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Voltijds sinds 1 juli 2026",
    origen: { tipo: "oficial", url: NAR, detalle: "GGMMI 18 jaar en ouder vanaf 01.07.2026: 2.233,61. Per uur bij 38 uur: 2.233,61 × 3 ÷ 13 ÷ 38 = 13,56. Per jaar × 12 = 26.803,32." },
    fecha: "2026-10-14",
    entrada: { voltijds: 38, uren: 38, loon: null },
    esperado: { perMaand: 2233.61, voltijdsMaand: 2233.61, perUur: 13.56, perJaar: 26803.32, verschil: null },
  },
  {
    nombre: "Laatste dag van het bedrag van 1 april 2026",
    origen: { tipo: "oficial", url: NAR, detalle: "Vanaf 01.04.2026: 2.189,81." },
    fecha: "2026-06-30",
    entrada: { voltijds: 38, uren: 38, loon: null },
    esperado: { perMaand: 2189.81 },
  },
  {
    nombre: "Deeltijds 30 op 38 uur, loon onder het minimum",
    origen: { tipo: "recalculado", detalle: "2.233,61 × 30 ÷ 38 = 1.763,38; loon 1.700 geeft −63,38." },
    fecha: "2026-10-14",
    entrada: { voltijds: 38, uren: 30, loon: 1700 },
    esperado: { perMaand: 1763.38, verschil: -63.38 },
  },
  {
    nombre: "Meer uren dan voltijds is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "40 uur in een sector met 38 uur voltijds kan niet." },
    fecha: "2026-10-14",
    entrada: { voltijds: 38, uren: 40, loon: null },
    esperaError: true,
  },
]);
