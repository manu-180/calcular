import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.inflation-calculator",
  h1: "Calculatrice d'inflation pour le Canada (IPC)",
  title: "Calculatrice d'inflation : combien ça vaut aujourd'hui?",
  description: "Ramenez un montant de janvier 2000 à aujourd'hui avec l'indice des prix à la consommation de Statistique Canada. Inflation cumulée et sur 12 mois.",
  intro: [
    "Inscrivez un montant et le mois d'où il vient pour voir ce qu'il vaut un mois plus tard, ajusté selon l'indice des prix à la consommation.",
    "Le calcul utilise l'IPC d'ensemble du Canada (2002=100) publié par Statistique Canada, chaque mois depuis janvier 2000.",
  ],
  comoSeCalcula: [
    "Le montant est multiplié par l'IPC du mois d'arrivée et divisé par l'IPC du mois de départ.",
    "L'inflation cumulée est ce rapport moins 1. Le taux sur 12 mois compare le mois d'arrivée au même mois un an plus tôt.",
    "Si vous choisissez un mois qui n'est pas encore publié, le calcul s'arrête au dernier IPC disponible.",
  ],
  ejemplo: [
    "1 000 $ de janvier 2020 (IPC 136,8) valent 1 241,23 $ en août 2026 (IPC 169,8) : une inflation cumulée de 24,12 %.",
  ],
  faq: [
    {
      pregunta: "Quel IPC est utilisé?",
      respuesta: "L'indice des prix à la consommation d'ensemble du Canada, 2002=100, du tableau 18-10-0004-01 de Statistique Canada. Il est mis à jour quand Statistique Canada publie un nouveau mois.",
    },
    {
      pregunta: "Pourquoi le résultat s'arrête-t-il avant le mois choisi?",
      respuesta: "L'IPC d'un mois est publié après la fin du mois. Si vous choisissez un mois qui n'est pas encore publié, la calculatrice utilise le dernier mois disponible et vous indique lequel.",
    },
    {
      pregunta: "Le calcul vaut-il pour le Québec?",
      respuesta: "Il utilise l'IPC national : le résultat est une moyenne pour l'ensemble du Canada.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Indice des prix à la consommation, qui mesure les prix d'un panier de biens et de services achetés par les ménages." },
    { termino: "2002=100", definicion: "L'IPC vaut 100 pour l'année 2002 : 169,8 signifie que les prix sont 69,8 % plus élevés qu'en 2002." },
  ],
});
