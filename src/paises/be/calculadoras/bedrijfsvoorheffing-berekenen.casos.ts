import { definirCasos } from "@/motor/calculo";
import calculadora from "./bedrijfsvoorheffing-berekenen";

const SIMULATOR = "https://eservices.minfin.fgov.be/myminfin-rest/fisconetPlus/public/document/addenda/SimulatorBV2026novemberverrouille.xlsx" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 2.500 belastbaar, alleenstaand, 1 kind (regels vanaf 1 januari 2026)",
    origen: {
      tipo: "recalculado",
      detalle: "30.000 − 6.070 = 23.930; 4.469,93 + 7.220 × 42,80 % = 7.560,09 − 2.987,98 = 4.572,11 − 624 = 3.948,11; ÷ 12 = 329,01.",
    },
    fecha: "2026-10-14",
    entrada: { belastbaar: 2500, gezin: "alleenstaand", kinderen: 1, alleenstaandeOuder: false },
    esperado: { beroepskosten: 6070, belastbaarJaar: 23930, basisbelasting: 4572.11, jaarbelasting: 3948.11, perMaand: 329.01 },
  },
  {
    nombre: "€ 2.500 belastbaar, alleenstaand, 1 kind (vanaf 1 november 2026)",
    origen: {
      tipo: "oficial",
      url: SIMULATOR,
      detalle: "Formule van de simulator: 7.560,09 − 3.089,63 = 4.470,46 − 684 = 3.786,46; ÷ 12 = 315,54.",
    },
    fecha: "2026-11-15",
    entrada: { belastbaar: 2500, gezin: "alleenstaand", kinderen: 1, alleenstaandeOuder: false },
    esperado: { basisbelasting: 4470.46, jaarbelasting: 3786.46, perMaand: 315.54 },
  },
  {
    nombre: "€ 2.500 belastbaar, partner zonder inkomen (vanaf 1 november 2026)",
    origen: {
      tipo: "oficial",
      url: SIMULATOR,
      detalle: "Huwelijksquotiënt 30 % van 23.930 = 7.179; schaal op 16.751 = 4.487,48 en op 7.179 = 1.920,38; samen 6.407,86 − 6.179,26 = 228,60; ÷ 12 = 19,05.",
    },
    fecha: "2026-11-15",
    entrada: { belastbaar: 2500, gezin: "partner-zonder-inkomen", kinderen: 0, alleenstaandeOuder: false },
    esperado: { basisbelasting: 228.6, perMaand: 19.05 },
  },
  {
    nombre: "Alleenstaande ouder met 2 kinderen, € 3.123,45",
    origen: {
      tipo: "recalculado",
      detalle: "37.481,40 − 6.070 = 31.411,40; 9.944,05 + 1.911,40 × 48,15 % = 10.864,39 − 2.987,98 = 7.876,41 − 1.656 − 624 = 5.596,41; ÷ 12 = 466,37.",
    },
    fecha: "2026-10-14",
    entrada: { belastbaar: 3123.45, gezin: "alleenstaand", kinderen: 2, alleenstaandeOuder: true },
    esperado: { kinderen: 1656, andereLasten: 624, jaarbelasting: 5596.41, perMaand: 466.37 },
  },
  {
    nombre: "Nul is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder loon valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { belastbaar: 0, gezin: "alleenstaand", kinderen: 0, alleenstaandeOuder: false },
    esperaError: true,
  },
]);
