import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.allocations-familiales",
  h1: "Allocations familiales de la CNSS au Togo",
  title: "Allocations familiales Togo : montant CNSS par enfant",
  description:
    "Calculez les allocations familiales de la CNSS au Togo : {{tg.allocations-familiales[par-enfant]}} par enfant et par mois, et les allocations prénatales.",
  intro: [
    "Les assurés de la CNSS qui ont des enfants à charge reçoivent des allocations familiales chaque mois. La future mère peut aussi recevoir des allocations prénatales.",
    "Indiquez le nombre d'enfants et la durée pour estimer ce que vous versera la CNSS.",
  ],
  comoSeCalcula: [
    "L'allocation familiale est de {{tg.allocations-familiales[par-enfant]}} par enfant et par mois.",
    "Elle est versée pour {{tg.allocations-enfants-max}} enfants de l'assuré au plus.",
    "Les allocations prénatales s'élèvent à {{tg.allocations-familiales[prenatales]}} au total, payées en trois fractions après chacun des trois examens médicaux de la grossesse.",
  ],
  ejemplo: ["Un assuré avec trois enfants à charge reçoit 6 000 F par mois, soit 72 000 F sur l'année."],
  faq: [
    {
      pregunta: "Qui peut recevoir les allocations familiales ?",
      respuesta:
        "Un assuré de la CNSS, homme ou femme, qui justifie d'au moins trois mois de travail consécutifs à la date de sa demande et qui a des enfants à charge.",
    },
    {
      pregunta: "Jusqu'à quel âge un enfant ouvre-t-il droit aux allocations ?",
      respuesta:
        "Jusqu'à 16 ans pour un enfant au primaire, et jusqu'à 21 ans pour un enfant en apprentissage, au secondaire ou infirme.",
    },
    {
      pregunta: "Que faut-il fournir chaque année ?",
      respuesta:
        "Les pièces justificatives des enfants, comme le certificat de scolarité ou le certificat médical, au plus tard le 31 décembre, en général par l'intermédiaire de l'employeur.",
    },
  ],
  glosario: [
    { termino: "Allocations prénatales", definicion: "Aide de la CNSS versée pendant la grossesse, en trois fractions." },
    { termino: "Allocataire", definicion: "L'assuré qui reçoit les prestations familiales." },
  ],
});
