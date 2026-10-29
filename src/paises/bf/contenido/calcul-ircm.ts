import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.calcul-ircm",
  h1: "Calcul de l'IRCM sur dividendes et intérêts",
  title: "IRCM Burkina Faso : impôt sur dividendes et intérêts",
  description:
    "Calculez l'impôt sur le revenu des capitaux mobiliers : {{bf.ircm-taux[dividendes]}} sur les dividendes, {{bf.ircm-taux[creances]}} sur les créances, {{bf.ircm-taux[obligations]}} sur les obligations.",
  intro: [
    "Les dividendes, intérêts et autres revenus de placements supportent l'impôt sur le revenu des capitaux mobiliers (IRCM), retenu à la source.",
    "Choisissez la nature du revenu et indiquez son montant brut. Vous obtenez l'impôt retenu et le net perçu.",
  ],
  comoSeCalcula: [
    "Revenus des créances et revenus sans taux spécifique : {{bf.ircm-taux[creances]}}. Intérêts des comptes de dépôt et des comptes courants : {{bf.ircm-taux[comptes]}}.",
    "Obligations émises au Burkina Faso : {{bf.ircm-taux[obligations]}}. Dividendes et autres produits de valeurs mobilières : {{bf.ircm-taux[dividendes]}}.",
    "Les dividendes distribués pendant les trois premiers exercices d'une société nouvelle sont taxés à moitié du taux.",
  ],
  ejemplo: ["Un dividende de 1 000 000 F : 125 000 F d'IRCM, 875 000 F perçus."],
  faq: [
    {
      pregunta: "Les intérêts de mon compte bancaire sont-ils taxés ?",
      respuesta: "Oui, à {{bf.ircm-taux[comptes]}} : le taux des créances est réduit de moitié pour les comptes de dépôt et les comptes courants ouverts dans une banque, un établissement financier ou au Trésor public.",
    },
    {
      pregunta: "Combien de temps dure le taux réduit des sociétés nouvelles ?",
      respuesta: "Les trois premiers exercices sociaux après la constitution, sans dépasser quarante-deux mois en tout.",
    },
    {
      pregunta: "Une convention fiscale peut-elle changer le taux ?",
      respuesta: "Oui. Les taux s'appliquent sous réserve des conventions internationales contre les doubles impositions.",
    },
  ],
  glosario: [
    { termino: "Capitaux mobiliers", definicion: "Actions, parts sociales, obligations, créances et dépôts qui rapportent un revenu." },
    { termino: "Retenue à la source", definicion: "Impôt prélevé par celui qui verse le revenu, avant le paiement." },
  ],
});
