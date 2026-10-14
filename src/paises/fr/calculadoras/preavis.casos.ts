import { definirCasos } from "@/motor/calculo";
import preavis from "./preavis";

const F2855 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F2855";
const base = { salaire: null, handicap: false, fauteGrave: false } as const;

export default definirCasos(preavis, [
  {
    nombre: "1 an d'ancienneté : 1 mois",
    origen: { tipo: "oficial", url: F2855, detalle: "Entre 6 mois et 2 ans d'ancienneté, la durée du préavis est fixée à 1 mois." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 1, mois: 0, notification: "2026-10-15" },
    esperado: { duree: 1, fin: "2026-11-15" },
  },
  {
    nombre: "3 ans d'ancienneté avec indemnité compensatrice",
    origen: { tipo: "oficial", url: F2855, detalle: "Au moins 2 ans : 2 mois. Indemnité 2 × 2 400 = 4 800 €." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 3, mois: 0, notification: "2026-12-31", salaire: 2400 },
    esperado: { duree: 2, fin: "2027-02-28", indemnite: 4800 },
  },
  {
    nombre: "Travailleur handicapé avec 5 ans : plafonné à 3 mois",
    origen: { tipo: "oficial", url: F2855, detalle: "Double de la durée normale (2 × 2 = 4 mois), dans la limite de 3 mois." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 5, mois: 0, notification: "2026-10-01", handicap: true },
    esperado: { duree: 3, fin: "2027-01-01" },
  },
  {
    nombre: "Travailleur handicapé avec 1 an : 2 mois",
    origen: { tipo: "oficial", url: F2855, detalle: "Double de 1 mois = 2 mois, sous la limite de 3 mois." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 1, mois: 6, notification: "2026-10-01", handicap: true },
    esperado: { duree: 2 },
  },
  {
    nombre: "Moins de 6 mois : selon la convention",
    origen: { tipo: "oficial", url: F2855, detalle: "Moins de 6 mois : durée fixée par la convention collective ou les usages." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 0, mois: 4, notification: "2026-10-01" },
    esperado: { duree: null },
  },
  {
    nombre: "Faute grave : pas de préavis",
    origen: { tipo: "oficial", url: F2855, detalle: "En cas de faute grave ou lourde, le salarié n'a pas droit à un préavis." },
    fecha: "2026-10-14",
    entrada: { ...base, annees: 8, mois: 0, notification: "2026-10-01", fauteGrave: true },
    esperado: { duree: 0 },
  },
]);
