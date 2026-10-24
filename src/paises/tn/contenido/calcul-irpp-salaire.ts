import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.calcul-irpp-salaire",
  h1: "Calcul de l'IRPP sur salaire en Tunisie",
  title: "Calcul IRPP Tunisie 2026 : impôt sur salaire et CSS",
  description:
    "Calculez la retenue à la source de l'IRPP sur votre salaire en Tunisie avec le barème en vigueur, les déductions familiales et la contribution sociale de solidarité.",
  intro: [
    "Depuis le 1er janvier 2025, l'impôt sur le revenu des personnes physiques suit un barème de huit tranches, de {{tn.irpp-bareme[0].tasa}} à {{tn.irpp-bareme[-1].tasa}}. L'employeur retient cet impôt chaque mois sur le salaire, avec la contribution sociale de solidarité.",
    "Indiquez votre salaire brut mensuel et votre situation de famille pour connaître la retenue mensuelle et annuelle.",
  ],
  comoSeCalcula: [
    "Salaire brut annuel moins la cotisation CNSS de {{tn.cnss-salarie}}.",
    "Moins les frais professionnels : {{tn.frais-professionnels-taux}} du reste, au plus {{tn.frais-professionnels-plafond}} par an.",
    "Moins les déductions pour charges de famille : {{tn.deductions-famille[chef-de-famille]}} pour le chef de famille et {{tn.deductions-famille[par-enfant]}} par enfant à charge.",
    "Le barème s'applique tranche par tranche : {{tn.irpp-bareme[1].tasa}} de {{tn.irpp-bareme[1].desde}} à {{tn.irpp-bareme[1].hasta}}, {{tn.irpp-bareme[2].tasa}} jusqu'à {{tn.irpp-bareme[2].hasta}}, et ainsi de suite jusqu'à {{tn.irpp-bareme[-1].tasa}} au delà de {{tn.irpp-bareme[-1].desde}}.",
    "La contribution sociale de solidarité ajoute {{tn.css-majoration}} du revenu imposable.",
  ],
  faq: [
    {
      pregunta: "Quel est le barème de l'IRPP en Tunisie ?",
      respuesta:
        "Huit tranches annuelles : {{tn.irpp-bareme[0].tasa}} jusqu'à {{tn.irpp-bareme[0].hasta}}, puis {{tn.irpp-bareme[1].tasa}}, {{tn.irpp-bareme[2].tasa}}, {{tn.irpp-bareme[3].tasa}}, {{tn.irpp-bareme[4].tasa}}, {{tn.irpp-bareme[5].tasa}}, {{tn.irpp-bareme[6].tasa}} et {{tn.irpp-bareme[-1].tasa}} au delà de {{tn.irpp-bareme[-1].desde}}. Chaque taux ne s'applique qu'à la part du revenu comprise dans sa tranche.",
    },
    {
      pregunta: "Qu'est-ce que la contribution sociale de solidarité sur le salaire ?",
      respuesta:
        "C'est une contribution au profit des caisses sociales, calculée en majorant les taux du barème. Les salariés dont le revenu net imposable ne dépasse pas {{tn.css-seuil-exoneration}} par an n'en paient pas.",
    },
    {
      pregunta: "Les frais professionnels sont-ils plafonnés ?",
      respuesta: "Oui. Ils sont fixés forfaitairement à {{tn.frais-professionnels-taux}} du salaire après cotisations, sans dépasser {{tn.frais-professionnels-plafond}} par an.",
    },
  ],
  glosario: [
    { termino: "Retenue à la source", definicion: "Impôt prélevé directement par l'employeur sur le salaire puis reversé au fisc." },
    { termino: "Revenu net imposable", definicion: "Le revenu après cotisations, frais professionnels et déductions familiales, sur lequel s'applique le barème." },
    { termino: "Chef de famille", definicion: "L'époux, ou l'épouse lorsque le mari n'a pas de revenus, qui bénéficie des déductions familiales." },
  ],
});
