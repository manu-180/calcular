import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.ueberstunden-rechner",
  h1: "Calcul des heures supplémentaires en Suisse",
  title: "Heures supplémentaires Suisse : supplément de {{ch.ueberstunden-zuschlag}}",
  description: "Payer les heures supplémentaires selon le Code des obligations : salaire normal plus un supplément d'au moins {{ch.ueberstunden-zuschlag}}. À partir du salaire mensuel ou horaire.",
  intro: [
    "Les heures supplémentaires sont les heures au-delà de la durée de travail convenue ou usuelle. Si elles ne sont pas compensées par un congé, l'employeur doit le salaire normal plus un supplément d'au moins {{ch.ueberstunden-zuschlag}}.",
    "Ce supplément s'applique sauf accord écrit contraire ou disposition d'un contrat-type ou d'une convention collective.",
  ],
  comoSeCalcula: [
    "Salaire horaire à partir du salaire mensuel : salaire mensuel × 12 / 52 / heures par semaine.",
    "Salaire normal pour les heures supplémentaires : salaire horaire × nombre d'heures.",
    "Supplément : {{ch.ueberstunden-zuschlag}} du salaire normal, ou le taux de votre contrat.",
  ],
  ejemplo: [
    "Avec un salaire mensuel de 6500 francs et 42 heures par semaine, 10 heures supplémentaires avec supplément coûtent environ 446 francs.",
  ],
  faq: [
    { pregunta: "Dois-je faire des heures supplémentaires ?", respuesta: "Oui, si elles sont nécessaires, dans la mesure où vous pouvez vous en acquitter et où on peut équitablement l'exiger de vous." },
    { pregunta: "L'employeur peut-il compenser les heures supplémentaires par un congé ?", respuesta: "Oui, avec votre accord et dans un délai convenable. Le congé doit être au moins de même durée que les heures supplémentaires." },
    { pregunta: "Le supplément peut-il être supprimé ?", respuesta: "Oui, si cela est convenu par écrit ou prévu par un contrat-type ou une convention collective. Sans un tel accord, le supplément d'au moins {{ch.ueberstunden-zuschlag}} s'applique." },
  ],
  glosario: [
    { termino: "Heures supplémentaires", definicion: "Travail au-delà de la durée de travail convenue ou usuelle, lorsqu'il est nécessaire." },
  ],
});
