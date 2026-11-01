import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.bareme-irpp",
  h1: "Barème de l'IRPP en Tunisie : calcul par tranches",
  title: "Barème IRPP Tunisie {{anio}} : calcul de l'impôt par tranche",
  description:
    "Appliquez le barème progressif de l'impôt sur le revenu tunisien à votre revenu net imposable : de {{tn.irpp-bareme[0].tasa}} à {{tn.irpp-bareme[-1].tasa}}, avec la contribution sociale de solidarité.",
  intro: [
    "Le barème de l'IRPP compte huit tranches depuis la loi de finances 2025. Chaque taux ne frappe que la part du revenu située dans sa tranche.",
    "Indiquez votre revenu net imposable annuel pour obtenir l'impôt, la contribution sociale de solidarité et votre taux moyen.",
  ],
  comoSeCalcula: [
    "Jusqu'à {{tn.irpp-bareme[0].hasta}} : {{tn.irpp-bareme[0].tasa}}.",
    "De {{tn.irpp-bareme[1].desde}} à {{tn.irpp-bareme[1].hasta}} : {{tn.irpp-bareme[1].tasa}}. De {{tn.irpp-bareme[2].desde}} à {{tn.irpp-bareme[2].hasta}} : {{tn.irpp-bareme[2].tasa}}. De {{tn.irpp-bareme[3].desde}} à {{tn.irpp-bareme[3].hasta}} : {{tn.irpp-bareme[3].tasa}}.",
    "De {{tn.irpp-bareme[4].desde}} à {{tn.irpp-bareme[4].hasta}} : {{tn.irpp-bareme[4].tasa}}. De {{tn.irpp-bareme[5].desde}} à {{tn.irpp-bareme[5].hasta}} : {{tn.irpp-bareme[5].tasa}}. De {{tn.irpp-bareme[6].desde}} à {{tn.irpp-bareme[6].hasta}} : {{tn.irpp-bareme[6].tasa}}.",
    "Au delà de {{tn.irpp-bareme[-1].desde}} : {{tn.irpp-bareme[-1].tasa}}.",
    "Contribution sociale de solidarité : {{tn.css-majoration}} du revenu imposable.",
  ],
  faq: [
    {
      pregunta: "Le barème de l'IRPP a-t-il changé en 2025 ?",
      respuesta: "Oui. La loi de finances 2025 a remplacé l'ancien barème par huit tranches, applicables aux revenus réalisés à partir du 1er janvier 2025.",
    },
    {
      pregunta: "Quelle est la différence entre taux marginal et taux moyen ?",
      respuesta: "Le taux marginal est celui de la dernière tranche atteinte. Le taux moyen rapporte l'impôt total au revenu : il est toujours plus bas, car les premières tranches sont moins taxées.",
    },
    {
      pregunta: "Qui est exonéré de la contribution sociale de solidarité ?",
      respuesta: "Les personnes qui ne perçoivent que des salaires ou des pensions et dont le revenu net imposable annuel ne dépasse pas {{tn.css-seuil-exoneration}}.",
    },
  ],
  glosario: [
    { termino: "Tranche", definicion: "Partie du revenu soumise à un même taux." },
    { termino: "Taux marginal", definicion: "Taux appliqué au dernier dinar gagné." },
    { termino: "Taux moyen", definicion: "Impôt total divisé par le revenu imposable." },
  ],
});
