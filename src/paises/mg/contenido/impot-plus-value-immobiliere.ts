import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.impot-plus-value-immobiliere",
  h1: "Calcul de l'impôt sur la plus-value immobilière (IPVI)",
  title: "IPVI Madagascar : impôt sur la vente d'un bien immobilier",
  description: "Calculez l'IPVI dû par un particulier qui vend un terrain ou une maison à Madagascar : {{mg.ipvi-taux}} d'une plus-value forfaitaire.",
  intro: [
    "Le particulier qui vend un bien immobilier paie l'impôt sur les plus-values immobilières (IPVI) lors de l'enregistrement de la vente.",
    "La plus-value n'est pas calculée sur le prix d'achat réel : le Code des impôts fixe un prix de revient forfaitaire.",
  ],
  comoSeCalcula: [
    "Le prix retenu est le prix de vente, sans pouvoir être inférieur à la valeur minimale fixée par l'administration.",
    "Le prix de revient est fixé à {{mg.ipvi-prix-revient}} de ce prix. La plus-value est la différence, taxée à {{mg.ipvi-taux}}.",
  ],
  ejemplo: ["Pour une maison vendue 200 000 000 Ar, la plus-value forfaitaire est de 50 000 000 Ar et l'IPVI de 10 000 000 Ar."],
  faq: [
    {
      pregunta: "Le prix d'achat réel est-il pris en compte ?",
      respuesta: "Non. Le prix de revient est toujours égal à {{mg.ipvi-prix-revient}} du prix de cession, quel que soit le prix payé à l'origine.",
    },
    {
      pregunta: "Qui paie l'IPVI ?",
      respuesta: "Le vendeur. S'il ne paie pas, l'impôt peut être réclamé à l'acheteur.",
    },
    {
      pregunta: "Y a-t-il des exonérations ?",
      respuesta: "Oui, pour les ventes de biens de l'État ou des collectivités et pour les indemnités d'expropriation pour cause d'utilité publique.",
    },
  ],
  glosario: [
    { termino: "IPVI", definicion: "Impôt sur les plus-values immobilières, payé par les particuliers qui vendent un bien immobilier." },
    { termino: "Valeur minimale", definicion: "Prix plancher fixé par l'administration pour un bien selon sa situation et ses caractéristiques." },
  ],
});
