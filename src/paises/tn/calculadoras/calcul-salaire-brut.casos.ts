import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-brut";

export default definirCasos(calculadora, [
  {
    nombre: "1 500 DT net, chef de famille, 2 enfants",
    origen: { tipo: "recalculado", detalle: "Brut 1 934,327 : CNSS 177,571 ; IRPP 241,272 ; CSS 15,484 ; net 1 934,327 − 434,327 = 1 500." },
    fecha: "2026-10-24",
    entrada: { net: 1500, chef: true, enfants: 2, etudiants: 0, infirmes: 0 },
    esperado: { net: 1500, brut: 1934.327, cnss: 177.571, irpp: 241.272, css: 15.484 },
    tolerancia: 0.005,
  },
  {
    nombre: "700 DT net, sans charges de famille",
    origen: { tipo: "recalculado", detalle: "Brut annuel 9 840,252 ; CNSS 903,335 ; frais 893,692 ; base 8 043,225 ; IRPP 15 % × 3 043,225 = 456,484 ; CSS 80,432. Mensuel : 820,021 − 75,278 − 38,040 − 6,703 = 700." },
    fecha: "2026-10-24",
    entrada: { net: 700, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperado: { net: 700, brut: 820.021, cnss: 75.278, irpp: 38.04, css: 6.703 },
    tolerancia: 0.005,
  },
  {
    nombre: "Net nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { net: 0, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperaError: true,
  },
]);
