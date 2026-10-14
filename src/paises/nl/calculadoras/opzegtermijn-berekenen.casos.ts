import { definirCasos } from "@/motor/calculo";
import calculadora from "./opzegtermijn-berekenen";

const BW = "https://wetten.overheid.nl/BWBR0005290/2026-01-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Werkgever zegt op na 11 jaar",
    origen: { tipo: "oficial", url: BW, detalle: "Artikel 7:672 lid 2c BW: 10 tot 15 jaar = 3 maanden. 14-10-2026 + 3 maanden = 14-01-2027, tegen het einde van de maand: 31-01-2027." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", begin: "2015-06-01", opzegdatum: "2026-10-14", aow: false, contract: null },
    esperado: { termijn: 3, jaren: 11, einddatum: "2027-01-31" },
  },
  {
    nombre: "Werknemer zegt op op de laatste dag van de maand",
    origen: { tipo: "oficial", url: BW, detalle: "Artikel 7:672 lid 4 BW: één maand. 31-03-2026 + 1 maand = 30-04-2026." },
    fecha: "2026-10-14",
    entrada: { wie: "werknemer", begin: "2020-01-01", opzegdatum: "2026-03-31", aow: false, contract: null },
    esperado: { termijn: 1, einddatum: "2026-04-30" },
  },
  {
    nombre: "Werkgever zegt op na bijna 4 jaar",
    origen: { tipo: "oficial", url: BW, detalle: "Korter dan 5 jaar: één maand. 14-10-2026 + 1 maand = 14-11-2026, einde maand 30-11-2026." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", begin: "2022-11-01", opzegdatum: "2026-10-14", aow: false, contract: null },
    esperado: { termijn: 1, jaren: 3, einddatum: "2026-11-30" },
  },
  {
    nombre: "Verlengde termijn voor de werknemer verdubbelt die van de werkgever",
    origen: { tipo: "oficial", url: BW, detalle: "Artikel 7:672 lid 8 BW: werknemer 3 maanden, werkgever minstens 6. Wettelijk na 6 jaar 2 maanden, dus 6." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", begin: "2020-01-01", opzegdatum: "2026-10-14", aow: false, contract: 3 },
    esperado: { termijn: 6, einddatum: "2027-04-30" },
  },
  {
    nombre: "AOW-leeftijd bereikt",
    origen: { tipo: "oficial", url: BW, detalle: "Artikel 7:672 lid 3 BW: één maand na de AOW-leeftijd." },
    fecha: "2026-10-14",
    entrada: { wie: "werkgever", begin: "1990-01-01", opzegdatum: "2026-10-14", aow: true, contract: null },
    esperado: { termijn: 1 },
  },
  {
    nombre: "Opzegging voor de begindatum",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { wie: "werknemer", begin: "2026-05-01", opzegdatum: "2026-01-01", aow: false, contract: null },
    esperaError: true,
  },
]);
