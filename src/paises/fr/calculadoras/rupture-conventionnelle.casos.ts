import { definirCasos } from "@/motor/calculo";
import rupture from "./rupture-conventionnelle";

const F987 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F987";
const vide = { moyenne3: null, negocie: null, remunerationAnnuelle: null } as const;

export default definirCasos(rupture, [
  {
    nombre: "Minimum légal, 3 ans et 6 mois à 1 500 €",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19030",
      detalle: "L'indemnité spécifique ne peut pas être inférieure à l'indemnité légale (fiche F19030). Exemple de la fiche F987 : 1 312,50 €.",
    },
    fecha: "2026-10-14",
    entrada: { ...vide, moyenne12: 1500, annees: 3, mois: 6 },
    esperado: { minimum: 1312.5, indemnite: 1312.5, exonereImpot: 1312.5, imposable: 0 },
  },
  {
    nombre: "6 mois d'ancienneté : indemnité au prorata",
    origen: { tipo: "recalculado", detalle: "Pas de condition d'ancienneté pour la rupture conventionnelle : 2 000 × 1/4 × 6/12 = 250 €." },
    fecha: "2026-10-14",
    entrada: { ...vide, moyenne12: 2000, annees: 0, mois: 6 },
    esperado: { minimum: 250 },
  },
  {
    nombre: "Indemnité de 120 000 € dont 70 000 € de minimum",
    origen: {
      tipo: "oficial",
      url: F987,
      detalle: "Exemple Service-Public : 120 000 € dont 70 000 € dus au minimum, rémunération de 40 000 €. Exonération à hauteur de 80 000 €, 40 000 € imposables.",
    },
    fecha: "2026-10-14",
    entrada: { moyenne12: 5600, moyenne3: null, annees: 40, mois: 0, negocie: 120000, remunerationAnnuelle: 40000 },
    esperado: { minimum: 70000, exonereImpot: 80000, imposable: 40000, exonereCotisations: 80000 },
  },
  {
    nombre: "100 000 € exonérés d'impôt, cotisations plafonnées",
    origen: {
      tipo: "oficial",
      url: F987,
      detalle: "Exemple Service-Public : une indemnité de 100 000 € exonérée d'impôt n'est exonérée de cotisations que dans la limite de 96 120 €.",
    },
    fecha: "2026-10-14",
    entrada: { moyenne12: 2500, moyenne3: null, annees: 5, mois: 0, negocie: 100000, remunerationAnnuelle: 60000 },
    esperado: { minimum: 3125, exonereImpot: 100000, imposable: 0, exonereCotisations: 96120 },
  },
  {
    nombre: "Négociation sous le minimum",
    origen: { tipo: "recalculado", detalle: "1 000 € négociés contre 3 125 € de minimum : le minimum est retenu." },
    fecha: "2026-10-14",
    entrada: { moyenne12: 2500, moyenne3: null, annees: 5, mois: 0, negocie: 1000, remunerationAnnuelle: null },
    esperado: { minimum: 3125, indemnite: 3125 },
  },
]);
