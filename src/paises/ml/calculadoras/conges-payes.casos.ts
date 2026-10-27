import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

export default definirCasos(calculadora, [
  {
    nombre: "Une année complète, 5 ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "12 × 2,5 = 30 jours ; allocation 2 400 000 / 12 = 200 000 ; pas de jours d'ancienneté avant 15 ans." },
    fecha: "2026-10-27",
    entrada: { mois: 12, remuneration: 2400000, anciennete: 5, enfants: 0 },
    esperado: { joursPrincipal: 30, allocation: 200000, joursAnciennete: 0, joursEnfants: 0 },
  },
  {
    nombre: "Six mois, 16 ans d'ancienneté, mère de deux enfants",
    origen: { tipo: "recalculado", detalle: "6 × 2,5 = 15 jours ; 900 000 / 12 = 75 000 ; 2 jours après 15 ans ; 1 jour par enfant." },
    fecha: "2026-10-27",
    entrada: { mois: 6, remuneration: 900000, anciennete: 16, enfants: 2 },
    esperado: { joursPrincipal: 15, allocation: 75000, joursAnciennete: 2, joursEnfants: 2 },
  },
  {
    nombre: "25 ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "Article L.154 : 6 jours ouvrables après 25 ans." },
    fecha: "2026-10-27",
    entrada: { mois: 12, remuneration: 3600000, anciennete: 25, enfants: 0 },
    esperado: { joursAnciennete: 6, allocation: 300000 },
  },
]);
