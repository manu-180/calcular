import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.overuren-berekenen",
  h1: "Calcul des heures supplémentaires en Belgique",
  title: "Heures supplémentaires : sursalaire de {{be.overloon[week]}} ou {{be.overloon[zondag-feestdag]}}",
  description:
    "Calculez ce que rapportent vos heures supplémentaires : salaire horaire plus {{be.overloon[week]}} de sursalaire en semaine ou {{be.overloon[zondag-feestdag]}} le dimanche et les jours fériés.",
  intro: [
    "Si vous travaillez au-delà des limites normales de la durée du travail, vous avez droit à un sursalaire en plus de votre salaire normal. En semaine, samedi compris, il est de {{be.overloon[week]}}. Le dimanche et les jours fériés, de {{be.overloon[zondag-feestdag]}}.",
    "Indiquez votre salaire mensuel, vos heures contractuelles et le nombre d'heures supplémentaires. Vous voyez votre salaire horaire, le sursalaire et le total.",
  ],
  comoSeCalcula: [
    "Salaire horaire : salaire mensuel × 3 ÷ 13 (les semaines d'un trimestre) ÷ vos heures par semaine.",
    "Heures supplémentaires en semaine : salaire horaire × heures × (1 + {{be.overloon[week]}}).",
    "Le dimanche ou un jour férié : salaire horaire × heures × (1 + {{be.overloon[zondag-feestdag]}}).",
  ],
  ejemplo: [
    "Avec 3.250 € bruts et 38 heures par semaine, votre salaire horaire est de 19,74 €. Cinq heures supplémentaires en semaine rapportent 98,70 € plus 49,35 € de sursalaire.",
  ],
  faq: [
    {
      pregunta: "Quand ai-je droit à un sursalaire ?",
      respuesta:
        "Pour chaque heure au-delà de 9 heures par jour ou de 40 heures par semaine, ou au-delà de la limite plus basse fixée par une convention collective. Depuis 2003, la durée du travail est en principe de 38 heures par semaine.",
    },
    {
      pregunta: "Sur quel salaire le sursalaire est-il calculé ?",
      respuesta:
        "Sur votre rémunération ordinaire, avec les primes directement liées à vos prestations et payées avec le salaire, comme une prime d'équipe ou de nuit. Une prime de fin d'année n'en fait pas partie.",
    },
    {
      pregunta: "Ai-je aussi droit à un repos compensatoire ?",
      respuesta:
        "Souvent, oui. Les heures supplémentaires donnent dans beaucoup de cas droit à un repos compensatoire : vous recevez alors le sursalaire avec la paie suivante et votre salaire normal quand vous prenez le repos.",
    },
  ],
  glosario: [
    { termino: "Sursalaire", definicion: "Le supplément légal ajouté à votre salaire horaire normal pour les heures supplémentaires." },
    { termino: "Repos compensatoire", definicion: "Du temps libre accordé pour compenser les heures supplémentaires prestées." },
  ],
});
