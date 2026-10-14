import { definirCasos } from "@/motor/calculo";
import calculadora from "./werkgeverslasten-berekenen";

const LH = "https://download.belastingdienst.nl/belastingdienst/docs/bijlage-nieuwsbrief-loonheffingen-2026-lh2091b63fd.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 3.500 per maand, vast contract, kleine werkgever",
    origen: {
      tipo: "recalculado",
      url: LH,
      detalle: "Loon 42.000 + 8% = 45.360. AWf laag 2,74% = 1.242,86; Aof laag 6,27% = 2.844,07; Wko 0,50% = 226,80; Zvw 6,10% = 2.766,96. Totaal 52.440,70.",
    },
    fecha: "2026-10-14",
    entrada: { maandloon: 3500, vakantiegeld: true, contract: "vast", grootte: "klein", whk: null, pensioen: 0 },
    esperado: { loon: 45360, awf: 1242.86, aof: 2844.07, wko: 226.8, zvw: 2766.96, totaal: 52440.7, opslag: 15.61 },
    tolerancia: 0.01,
  },
  {
    nombre: "Hoog loon boven het maximumpremieloon, flexcontract",
    origen: {
      tipo: "recalculado",
      url: LH,
      detalle: "Loon 84.000 + 8% = 90.720; premies over maximaal 79.409. AWf hoog 7,74% = 6.146,26; Aof hoog 7,63% = 6.058,91; Wko 397,05; Whk 1,5% = 1.191,14; Zvw 4.843,95; pensioen 10% = 9.072. Totaal 118.429,29.",
    },
    fecha: "2026-10-14",
    entrada: { maandloon: 7000, vakantiegeld: true, contract: "flex", grootte: "groot", whk: 1.5, pensioen: 10 },
    esperado: { awf: 6146.26, aof: 6058.91, wko: 397.05, whk: 1191.14, zvw: 4843.95, pensioen: 9072, totaal: 118429.29 },
  },
  {
    nombre: "Nul loon is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { maandloon: 0, vakantiegeld: true, contract: "vast", grootte: "klein", whk: null, pensioen: 0 },
    esperaError: true,
  },
]);
