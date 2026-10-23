import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.preavis-licenciement",
  h1: "Calcul du préavis de licenciement au Luxembourg",
  title: "Préavis de licenciement Luxembourg : date de fin",
  description: "Préavis au Luxembourg selon l'ancienneté : 2, 4 ou 6 mois en cas de licenciement, la moitié en cas de démission. Début le 15 ou le 1er du mois.",
  intro: [
    "En cas de licenciement, le préavis dépend de l'ancienneté : 2 mois avant 5 ans, 4 mois de 5 à moins de 10 ans, 6 mois à partir de 10 ans.",
    "En cas de démission, le préavis est de la moitié : 1, 2 ou 3 mois.",
  ],
  comoSeCalcula: [
    "Si la résiliation est notifiée avant le 15 du mois, le préavis commence le 15. Sinon, il commence le 1er du mois suivant.",
    "La fin du contrat tombe la veille du même jour, un, deux, quatre ou six mois plus tard.",
    "Le calculateur compte l'ancienneté en années complètes jusqu'à la date de notification.",
  ],
  ejemplo: [
    "Un licenciement notifié le 10 octobre 2026 après 6 ans d'ancienneté fait courir un préavis de 4 mois du 15 octobre 2026 au 14 février 2027.",
  ],
  faq: [
    { pregunta: "Comment le licenciement doit-il être notifié ?", respuesta: "Par lettre recommandée à la poste. La signature du salarié sur le double de la lettre vaut accusé de réception." },
    { pregunta: "Et en cas de démission ?", respuesta: "Le salarié résilie aussi par lettre recommandée. Son préavis est égal à la moitié de celui de l'employeur." },
    { pregunta: "Une petite entreprise peut-elle prolonger le préavis ?", respuesta: "Un employeur de moins de vingt salariés peut choisir un préavis prolongé au lieu de verser l'indemnité de départ, à partir de cinq ans d'ancienneté." },
  ],
  glosario: [
    { termino: "Préavis", definicion: "Délai entre la notification de la résiliation et la fin du contrat de travail." },
  ],
});
