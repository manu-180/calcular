import { definirCasos } from "@/motor/calculo";
import salaireSocialMinimum from "./salaire-social-minimum";

const GUICHET = "https://guichet.public.lu/fr/citoyens/outils/parametres-sociaux.html";

export default definirCasos(salaireSocialMinimum, [
  {
    nombre: "Non qualifié, temps plein",
    origen: { tipo: "oficial", url: GUICHET, detalle: "À partir du 1er juin 2026 : 2.771,33 euros par mois, 16,0192 euros de l'heure." },
    fecha: "2026-10-16",
    entrada: { categorie: "non-qualifie", heures: 173 },
    esperado: { mensuel: 2771.33, horaire: 16.0192 },
  },
  {
    nombre: "Qualifié",
    origen: { tipo: "oficial", url: GUICHET, detalle: "3.325,59 euros par mois, 19,2231 euros de l'heure." },
    fecha: "2026-10-16",
    entrada: { categorie: "qualifie", heures: 173 },
    esperado: { mensuel: 3325.59, horaire: 19.2231 },
  },
  {
    nombre: "Adolescent de 15 à 17 ans",
    origen: { tipo: "oficial", url: GUICHET, detalle: "75 % : 2.078,49 euros par mois, 12,0144 euros de l'heure." },
    fecha: "2026-10-16",
    entrada: { categorie: "15-17", heures: 173 },
    esperado: { mensuel: 2078.49, horaire: 12.0144 },
  },
  {
    nombre: "Adolescent de 17 à 18 ans",
    origen: { tipo: "oficial", url: GUICHET, detalle: "80 % : 2.217,06 euros par mois, 12,8154 euros de l'heure." },
    fecha: "2026-10-16",
    entrada: { categorie: "17-18", heures: 173 },
    esperado: { mensuel: 2217.06, horaire: 12.8154 },
  },
  {
    nombre: "Mi-temps non qualifié",
    origen: { tipo: "recalculado", url: GUICHET, detalle: "86,5 heures x 16,0192 = 1385,66 (tronqué)." },
    fecha: "2026-10-16",
    entrada: { categorie: "non-qualifie", heures: 86.5 },
    esperado: { mensuel: 1385.66 },
  },
]);
