import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.indemnite-arret-maladie",
  h1: "Indemnités journalières d'arrêt maladie en Algérie",
  title: "Arrêt maladie Algérie : calcul des indemnités de la CNAS",
  description:
    "La CNAS verse {{dz.maladie-taux[reduit]}} du salaire journalier net pendant {{dz.maladie-jours-reduits}} à compter de l'arrêt, puis {{dz.maladie-taux[plein]}}. Calculez vos indemnités.",
  intro: [
    "Le salarié en arrêt de travail pour maladie, constaté par un médecin, reçoit des indemnités journalières de la CNAS à la place de son salaire.",
    "Indiquez votre salaire brut et la durée de l'arrêt pour connaître le montant des indemnités et l'écart avec votre salaire net.",
  ],
  comoSeCalcula: [
    "Salaire journalier = salaire net mensuel, après cotisation de sécurité sociale et IRG, divisé par {{dz.indemnite-diviseur}}.",
    "Pendant {{dz.maladie-jours-reduits}} à compter de l'arrêt : {{dz.maladie-taux[reduit]}} du salaire journalier.",
    "À partir du jour suivant : {{dz.maladie-taux[plein]}} du salaire journalier.",
    "Maladie de longue durée ou hospitalisation : {{dz.maladie-taux[plein]}} dès le premier jour d'arrêt.",
  ],
  faq: [
    {
      pregunta: "Les jours de week-end sont-ils indemnisés ?",
      respuesta: "Oui. L'indemnité journalière est due pour chaque jour de l'arrêt, ouvrable ou non, selon l'article 15 de la loi n° 83-11 relative aux assurances sociales.",
    },
    {
      pregunta: "Dans quel délai faut-il envoyer l'arrêt de travail ?",
      respuesta:
        "Toute maladie qui peut ouvrir droit aux indemnités doit être portée à la connaissance de la CNAS dans le délai fixé par voie réglementaire. Sans déclaration, les indemnités peuvent être refusées pour la période où le contrôle a été impossible.",
    },
    {
      pregunta: "Combien de temps peut durer l'indemnisation ?",
      respuesta:
        "Pour une affection de longue durée, jusqu'à trois ans par affection. Pour les autres maladies, trois cents indemnités journalières au plus sur deux années consécutives.",
    },
  ],
  glosario: [
    { termino: "CNAS", definicion: "Caisse nationale des assurances sociales des travailleurs salariés." },
    { termino: "Indemnité journalière", definicion: "Somme versée par la sécurité sociale pour chaque jour d'arrêt de travail." },
  ],
});
