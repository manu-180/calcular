import { definirCasos } from "@/motor/calculo";
import licenciement from "./indemnite-licenciement";

const F987 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F987";

export default definirCasos(licenciement, [
  {
    nombre: "3 ans et 6 mois avec 1 500 € de salaire de référence",
    origen: { tipo: "oficial", url: F987, detalle: "Exemple Service-Public : (1 500 × 1/4 × 3) + (1 500 × 1/4 × 6/12) = 1 312,50 €." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 1500, moyenne3: null, annees: 3, mois: 6, motif: "personnel" },
    esperado: { reference: 1500, indemnite: 1312.5 },
  },
  {
    nombre: "12 ans et 9 mois avec 1 500 €",
    origen: { tipo: "oficial", url: F987, detalle: "Exemple Service-Public : (1 500 × 1/4 × 10) + (1 500 × 1/3 × 2) + (1 500 × 1/3 × 9/12) = 5 125 €." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 1500, moyenne3: null, annees: 12, mois: 9, motif: "personnel" },
    esperado: { indemnite: 5125 },
  },
  {
    nombre: "Les 3 derniers mois sont plus favorables",
    origen: { tipo: "recalculado", detalle: "Référence max(2 400 ; 2 700) = 2 700. 2 700 × 1/4 × 4 = 2 700 €, soit 1 mois." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 2400, moyenne3: 2700, annees: 4, mois: 0, motif: "personnel" },
    esperado: { reference: 2700, indemnite: 2700, enMois: 1 },
  },
  {
    nombre: "7 mois d'ancienneté : pas d'indemnité légale",
    origen: { tipo: "oficial", url: F987, detalle: "Il faut au moins 8 mois d'ancienneté ininterrompus." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 2000, moyenne3: null, annees: 0, mois: 7, motif: "personnel" },
    esperado: { indemnite: 0 },
  },
  {
    nombre: "8 mois d'ancienneté pile",
    origen: { tipo: "recalculado", detalle: "2 000 × 1/4 × 8/12 = 333,33 €." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 2000, moyenne3: null, annees: 0, mois: 8, motif: "personnel" },
    esperado: { indemnite: 333.33 },
  },
  {
    nombre: "Faute grave",
    origen: { tipo: "recalculado", detalle: "Pas d'indemnité légale en cas de faute grave." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 3000, moyenne3: null, annees: 10, mois: 0, motif: "faute-grave" },
    esperado: { indemnite: 0 },
  },
]);
