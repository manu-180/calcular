import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Une année complète, 3 ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "Art. 158 : 12 mois × 2 jours ouvrables = 24 jours." },
    fecha: F,
    entrada: { mois: 12, anciennete: 3, mere: "non", enfants: null },
    esperado: { total: 24, normal: 24, anciennete: 0 },
  },
  {
    nombre: "22 ans d'ancienneté",
    origen: { tipo: "recalculado", detalle: "24 jours + 2 jours après vingt ans de service = 26 jours." },
    fecha: F,
    entrada: { mois: 12, anciennete: 22, mere: "non", enfants: null },
    esperado: { total: 26, anciennete: 2 },
  },
  {
    nombre: "31 ans d'ancienneté : plafond de 30 jours",
    origen: { tipo: "recalculado", detalle: "24 + 6 = 30 jours, soit le plafond." },
    fecha: F,
    entrada: { mois: 12, anciennete: 31, mere: "non", enfants: null },
    esperado: { total: 30, anciennete: 6 },
  },
  {
    nombre: "Mère de 30 ans avec 5 enfants à charge",
    origen: { tipo: "recalculado", detalle: "Après 21 ans, 2 jours par enfant à partir du quatrième : 2 enfants × 2 = 4 jours. Total 28." },
    fecha: F,
    entrada: { mois: 12, anciennete: 5, mere: "plus-21", enfants: 5 },
    esperado: { total: 28, meres: 4 },
  },
  {
    nombre: "Mère de 19 ans, 3 mois de service, 1 enfant",
    origen: { tipo: "recalculado", detalle: "Congé normal 6 jours : le supplément est réduit à 1 jour par enfant. Total 7." },
    fecha: F,
    entrada: { mois: 3, anciennete: 0, mere: "moins-21", enfants: 1 },
    esperado: { total: 7, normal: 6, meres: 1 },
  },
]);
