import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

const CT = "https://adala.justice.gov.ma/api/uploads/2024/04/30/code%20du%20travail-1714463246806.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Année complète, 7 ans d'ancienneté",
    origen: { tipo: "recalculado", url: CT, detalle: "12 × 1,5 = 18 jours + 1 tranche de 5 ans × 1,5 = 19,5 jours." },
    fecha: "2026-10-16",
    entrada: { mois: 12, anciennete: 7, mineur: false },
    esperado: { jours: 19.5, base: 18, majoration: 1.5 },
  },
  {
    nombre: "Année complète, 25 ans d'ancienneté",
    origen: { tipo: "recalculado", url: CT, detalle: "18 + 5 × 1,5 = 25,5 jours (sous le maximum de 30)." },
    fecha: "2026-10-16",
    entrada: { mois: 12, anciennete: 25, mineur: false },
    esperado: { jours: 25.5 },
  },
  {
    nombre: "45 ans d'ancienneté : plafond de 30 jours",
    origen: { tipo: "recalculado", url: CT, detalle: "18 + 9 × 1,5 = 31,5, ramené à 30." },
    fecha: "2026-10-16",
    entrada: { mois: 12, anciennete: 45, mineur: false },
    esperado: { jours: 30, majoration: 12 },
  },
  {
    nombre: "Salarié de moins de 18 ans",
    origen: { tipo: "recalculado", url: CT, detalle: "12 × 2 = 24 jours." },
    fecha: "2026-10-16",
    entrada: { mois: 12, anciennete: 1, mineur: true },
    esperado: { jours: 24 },
  },
  {
    nombre: "Moins de six mois de service",
    origen: { tipo: "recalculado", url: CT, detalle: "Pas de droit avant six mois de service continu." },
    fecha: "2026-10-16",
    entrada: { mois: 4, anciennete: 0, mineur: false },
    esperado: { jours: 0 },
  },
]);
