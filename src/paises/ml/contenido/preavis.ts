import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.preavis",
  h1: "Calcul de la durée du préavis au Mali",
  title: "Préavis de licenciement ou de démission au Mali",
  description: "Trouvez la durée légale de votre préavis au Mali selon votre catégorie, et l'indemnité compensatrice due si le préavis n'est pas effectué.",
  intro: [
    "Un contrat à durée indéterminée ne peut être rompu qu'après un préavis notifié par écrit, avec le motif de la rupture. Le préavis court à partir de la remise de la notification.",
    "Choisissez votre situation et indiquez votre salaire. Vous voyez la durée minimale du préavis et l'indemnité due si elle n'est pas respectée.",
  ],
  comoSeCalcula: [
    "Sans convention collective plus favorable, le préavis est de {{ml.preavis-jours}} pour le personnel payé à la journée ou à la semaine et de {{ml.preavis-mois[mensuel]}} pour le travailleur payé au mois.",
    "Il passe à {{ml.preavis-mois[maitrise]}} pour les agents de maîtrise et assimilés, et à {{ml.preavis-mois[cadre]}} pour les cadres et le personnel de direction.",
    "Si le préavis n'est pas respecté, la partie responsable verse l'équivalent de la rémunération de la période non effectuée.",
  ],
  ejemplo: ["Un cadre payé 500 000 F par mois a droit à 3 mois de préavis. Dispensé sans être payé, il doit recevoir 1 500 000 F."],
  faq: [
    {
      pregunta: "Le préavis est-il dû en cas de faute lourde ?",
      respuesta: "Non. Le contrat peut être rompu sans préavis en cas de faute lourde, sous réserve de l'appréciation du juge.",
    },
    {
      pregunta: "Puis-je chercher un emploi pendant le préavis ?",
      respuesta: "Oui. Après avoir prévenu l'employeur, vous pouvez vous absenter un jour par semaine sans perte de salaire, en cas de licenciement comme de démission. Ces jours peuvent être regroupés à la fin du préavis.",
    },
    {
      pregunta: "Ces durées sont-elles des minimums ?",
      respuesta: "Oui. Elles s'appliquent en l'absence de convention collective ou de décret en tenant lieu. Un texte plus favorable l'emporte.",
    },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Délai entre la notification de la rupture du contrat et la fin effective du travail." },
    { termino: "Indemnité compensatrice", definicion: "La rémunération du préavis versée quand il n'est pas effectué." },
  ],
});
