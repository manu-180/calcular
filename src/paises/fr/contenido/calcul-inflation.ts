import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.calcul-inflation",
  h1: "Calcul de l'inflation : actualiser un montant en euros",
  title: "Calcul inflation : actualiser un montant avec l'indice Insee",
  description:
    "Combien vaut aujourd'hui une somme d'une autre année ? Actualisez un montant avec l'indice des prix à la consommation de l'Insee, depuis 1996.",
  intro: [
    "L'inflation mesure la hausse générale des prix. Pour comparer une somme d'une autre époque avec aujourd'hui, on la multiplie par l'évolution de l'indice des prix à la consommation (IPC).",
    "La calculatrice utilise l'IPC de l'Insee pour l'ensemble des ménages en France, publié chaque mois. Le dernier indice chargé vaut {{fr.ipc}} et se met à jour dès que l'Insee publie un nouveau mois.",
  ],
  comoSeCalcula: [
    "Coefficient = indice du mois d'arrivée ÷ indice du mois de départ.",
    "Montant équivalent = montant × coefficient.",
    "Inflation cumulée = (coefficient − 1) × 100.",
  ],
  ejemplo: [
    "1 000 € de septembre 2025 équivalent à 1 030 € en septembre 2026 : les prix ont augmenté d'environ 3 % sur un an.",
  ],
  faq: [
    {
      pregunta: "Quel indice utilise ce calcul ?",
      respuesta: "L'indice des prix à la consommation de l'Insee, base 2025, pour l'ensemble des ménages de France (métropole et outre-mer).",
    },
    {
      pregunta: "Peut-on s'en servir pour réviser un loyer ?",
      respuesta: "Non. La révision d'un loyer d'habitation se fait avec l'indice de référence des loyers (IRL), un autre indice publié par l'Insee.",
    },
    {
      pregunta: "Pourquoi le résultat s'arrête-t-il au mois dernier ?",
      respuesta: "L'Insee publie l'indice d'un mois quelques semaines plus tard. Le calcul utilise toujours le dernier indice publié.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Indice des prix à la consommation, qui suit l'évolution des prix des biens et services achetés par les ménages." },
    { termino: "Insee", definicion: "Institut national de la statistique et des études économiques." },
  ],
});
