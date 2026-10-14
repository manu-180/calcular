import { definirCasos } from "@/motor/calculo";
import straordinari from "./straordinari";

export default definirCasos(straordinari, [
  {
    nombre: "10 ore al 25% con divisore 173",
    origen: { tipo: "recalculado", detalle: "2.000 / 173 = 11,56; +25% = 14,45; × 10 = 144,50; maggiorazione 144,50 − 115,60 = 28,90." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 2000, divisore: 173, ore: 10, maggiorazione: 25 },
    esperado: { pagaOraria: 11.56, oraStraordinaria: 14.45, totale: 144.5, maggiorazioneTotale: 28.9 },
  },
  {
    nombre: "Straordinario festivo al 50% con divisore 168",
    origen: { tipo: "recalculado", detalle: "1.680 / 168 = 10; +50% = 15; × 8 = 120." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 1680, divisore: 168, ore: 8, maggiorazione: 50 },
    esperado: { pagaOraria: 10, oraStraordinaria: 15, totale: 120, maggiorazioneTotale: 40 },
  },
  {
    nombre: "Divisore a zero",
    origen: { tipo: "recalculado", detalle: "Non si può dividere per zero." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 1680, divisore: 0, ore: 8, maggiorazione: 50 },
    esperaError: true,
  },
]);
