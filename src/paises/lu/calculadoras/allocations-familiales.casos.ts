import { definirCasos } from "@/motor/calculo";
import allocationsFamiliales from "./allocations-familiales";

const GUICHET = "https://guichet.public.lu/fr/citoyens/outils/parametres-sociaux.html";

export default definirCasos(allocationsFamiliales, [
  {
    nombre: "Trois enfants de 4, 8 et 14 ans",
    origen: {
      tipo: "recalculado",
      url: GUICHET,
      detalle: "3 x 315,04 = 945,12 ; majorations 23,81 + 59,44 : 1028,37 par mois, 12 340,44 par an. Rentrée 115 + 235 = 350. Total 12 690,44.",
    },
    fecha: "2026-10-16",
    entrada: { moins6: 1, de6a11: 1, plus12: 1 },
    esperado: { mensuel: 1028.37, annuel: 12340.44, rentree: 350, total: 12690.44 },
  },
  {
    nombre: "Un enfant de moins de 6 ans",
    origen: { tipo: "oficial", url: GUICHET, detalle: "315,04 euros par enfant et par mois depuis le 1er juin 2026." },
    fecha: "2026-10-16",
    entrada: { moins6: 1, de6a11: 0, plus12: 0 },
    esperado: { mensuel: 315.04, rentree: 0 },
  },
]);
