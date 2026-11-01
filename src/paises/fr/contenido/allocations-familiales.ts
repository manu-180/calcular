import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.allocations-familiales",
  h1: "Montant des allocations familiales {{anio}}",
  title: "Allocations familiales {{anio}} : montant selon vos ressources",
  description:
    "Calculez vos allocations familiales selon le nombre d'enfants et les ressources du foyer : {{fr.af-montant-1[e2]}} par mois pour 2 enfants sous le premier plafond.",
  intro: [
    "Les allocations familiales sont versées par la CAF (ou la MSA) aux familles qui ont au moins 2 enfants à charge de moins de 20 ans. Elles sont versées quel que soit le niveau de revenus : seul le montant change.",
    "Le montant dépend du nombre d'enfants, des ressources du foyer de l'avant-dernière année et de l'âge des enfants.",
  ],
  comoSeCalcula: [
    "Trois niveaux selon les ressources de 2024 : sous le premier plafond, entre les deux plafonds (montant divisé par deux), au-dessus du second plafond (divisé par quatre).",
    "Pour 2 enfants, le premier plafond est de {{fr.af-plafond-1[e2]}} et le second de {{fr.af-plafond-2[e2]}}. Ils augmentent avec chaque enfant en plus.",
    "Une majoration pour âge s'ajoute pour chaque enfant de 14 ans ou plus (né avant le 1er mars 2012) ou de 18 ans ou plus (né depuis). Avec 2 enfants, l'aîné n'y ouvre pas droit.",
    "Si vos ressources dépassent un plafond de peu, un complément dégressif évite une baisse brutale : (plafond + 12 × montant du niveau inférieur − ressources) ÷ 12.",
  ],
  ejemplo: [
    "Une famille de 3 enfants a 87 000 € de ressources, juste au-dessus du premier plafond. Elle reçoit 173,67 € plus un complément dégressif, soit 317,65 € par mois.",
  ],
  faq: [
    {
      pregunta: "A-t-on droit aux allocations familiales avec un seul enfant ?",
      respuesta: "Non, en métropole il faut au moins 2 enfants à charge. D'autres aides peuvent exister pour un enfant unique, comme la prestation d'accueil du jeune enfant.",
    },
    {
      pregunta: "Quelles ressources sont prises en compte ?",
      respuesta: "Le revenu net catégoriel de l'avant-dernière année : pour 2026, celui de 2024. Il figure dans les données transmises par l'administration fiscale à la CAF.",
    },
    {
      pregunta: "Faut-il faire une demande ?",
      respuesta: "Si vous êtes déjà allocataire, la CAF les verse automatiquement à l'arrivée du 2e enfant. Sinon, il faut s'inscrire en ligne sur le site de la CAF ou de la MSA.",
    },
  ],
  glosario: [
    { termino: "CAF", definicion: "Caisse d'allocations familiales, qui verse les prestations familiales." },
    { termino: "Majoration pour âge", definicion: "Supplément versé pour un enfant à partir de 14 ou 18 ans selon sa date de naissance." },
    { termino: "Complément dégressif", definicion: "Somme versée quand les ressources dépassent légèrement un plafond." },
  ],
});
