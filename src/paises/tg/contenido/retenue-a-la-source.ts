import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.retenue-a-la-source",
  h1: "Retenue à la source sur les honoraires au Togo",
  title: "Retenue à la source Togo : honoraires et prestations",
  description:
    "Calculez la retenue à la source sur les honoraires au Togo : {{tg.retenue-prestations[attestation]}}, {{tg.retenue-prestations[nif]}} ou {{tg.retenue-prestations[autres]}} selon la situation fiscale du prestataire.",
  intro: [
    "Les entreprises, l'État, les ONG et les projets qui paient une profession libérale ou un intermédiaire établi au Togo retiennent une partie de la somme et la versent à l'administration fiscale.",
    "Indiquez le montant et la situation du prestataire pour connaître la retenue et la somme à lui verser.",
  ],
  comoSeCalcula: [
    "Le taux est de {{tg.retenue-prestations[attestation]}} si le prestataire présente une attestation de régularité fiscale en cours de validité.",
    "Il est de {{tg.retenue-prestations[nif]}} s'il a seulement un numéro d'identification fiscale, et de {{tg.retenue-prestations[autres]}} dans les autres cas.",
    "La retenue est versée au plus tard le 15 du mois suivant, avec une attestation remise au prestataire.",
  ],
  ejemplo: ["Pour 500 000 F d'honoraires versés à un consultant qui a un NIF, la retenue est de 25 000 F et il reçoit 475 000 F."],
  faq: [
    {
      pregunta: "Qui subit cette retenue ?",
      respuesta:
        "Les professions non commerciales, comme les consultants ou les professions libérales, et les intermédiaires tels que les agents d'assurance, courtiers, commissionnaires et agents d'affaires.",
    },
    {
      pregunta: "La retenue est-elle définitive ?",
      respuesta:
        "Non. Le prestataire la déduit de ses propres impôts grâce à l'attestation de retenue. Le crédit restant est apuré par compensation.",
    },
    {
      pregunta: "Pourquoi un taux de {{tg.retenue-prestations[autres]}} ?",
      respuesta:
        "C'est le taux applicable au prestataire qui ne présente ni attestation de régularité fiscale ni numéro d'identification fiscale.",
    },
  ],
  glosario: [
    { termino: "NIF", definicion: "Numéro d'identification fiscale attribué par l'OTR." },
    { termino: "Attestation de régularité fiscale", definicion: "Document qui atteste que le contribuable est à jour de ses obligations fiscales." },
  ],
});
