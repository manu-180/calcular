import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.retenue-revenus-capitaux-mobiliers",
  h1: "Retenue à la source sur les dividendes et intérêts au Sénégal",
  title: "Retenue sur dividendes et intérêts au Sénégal",
  description: "Calculez la retenue à la source sur vos dividendes ({{sn.rcm[actions]}}), intérêts d'obligations ({{sn.rcm[obligations]}}), comptes de dépôt ({{sn.rcm[depots]}}) et autres revenus.",
  intro: [
    "Les revenus de capitaux mobiliers subissent une retenue à la source dont le taux dépend du type de revenu.",
    "Choisissez le type de revenu et inscrivez le montant brut pour voir la retenue et le net.",
  ],
  comoSeCalcula: [
    "Dividendes : {{sn.rcm[actions]}}. Obligations : {{sn.rcm[obligations]}}, ou {{sn.rcm[obligations-5-ans]}} pour les obligations d'au moins cinq ans émises au Sénégal. Lots : {{sn.rcm[lots]}}.",
    "Autres revenus (jetons de présence, créances, dépôts, cautionnements) : {{sn.rcm[autres]}}, ramené à {{sn.rcm[depots]}} pour les comptes de dépôt et comptes courants. Bons de caisse : {{sn.rcm[bons-de-caisse]}}, libératoire.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux sur les dividendes?",
      respuesta: "{{sn.rcm[actions]}} sur les produits des actions et parts sociales des sociétés passibles de l'impôt sur les sociétés.",
    },
    {
      pregunta: "Quel est le taux sur les intérêts d'un compte d'épargne?",
      respuesta: "{{sn.rcm[depots]}} pour les intérêts des comptes de dépôt et des comptes courants ouverts notamment dans une banque ou un système financier décentralisé.",
    },
    {
      pregunta: "La retenue sur les bons de caisse est-elle définitive?",
      respuesta: "Oui, la retenue de {{sn.rcm[bons-de-caisse]}} est libératoire de tous impôts.",
    },
  ],
  glosario: [
    { termino: "Revenus de capitaux mobiliers", definicion: "Les dividendes, intérêts et autres produits de placements." },
    { termino: "Retenue à la source", definicion: "L'impôt prélevé directement par celui qui verse le revenu." },
  ],
});
