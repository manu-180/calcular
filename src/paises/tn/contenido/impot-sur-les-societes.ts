import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés en Tunisie",
  title: "Impôt sur les sociétés Tunisie 2026 : taux IS et CSS",
  description:
    "Calculez l'impôt sur les sociétés tunisien au taux de {{tn.is-taux[normal]}}, {{tn.is-taux[reduit]}} ou {{tn.is-taux[majore]}}, avec la contribution sociale de solidarité et son minimum.",
  intro: [
    "Le taux normal de l'impôt sur les sociétés est de {{tn.is-taux[normal]}}. Certaines activités bénéficient du taux de {{tn.is-taux[reduit]}}, d'autres supportent {{tn.is-taux[majore]}}. S'y ajoute la contribution sociale de solidarité.",
    "Indiquez le bénéfice imposable et le taux qui s'applique à la société.",
  ],
  comoSeCalcula: [
    "Impôt sur les sociétés : bénéfice arrondi au dinar inférieur × taux.",
    "Contribution sociale de solidarité : {{tn.css-is-points[taux-inferieur]}} points du bénéfice pour les sociétés à {{tn.is-taux[normal]}} ou {{tn.is-taux[reduit]}}, {{tn.css-is-points[taux-35-et-plus]}} points pour celles à {{tn.is-taux[majore]}}.",
    "La contribution ne peut pas être inférieure à {{tn.css-is-minimum[taux-20]}} au taux normal, {{tn.css-is-minimum[taux-10]}} au taux réduit et {{tn.css-is-minimum[taux-35-et-plus]}} au taux majoré.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de l'impôt sur les sociétés en Tunisie ?",
      respuesta: "{{tn.is-taux[normal]}} pour la plupart des sociétés. {{tn.is-taux[reduit]}} pour certaines activités agricoles, de pêche, de développement régional ou de coopératives. {{tn.is-taux[majore]}} notamment pour les télécoms, les hydrocarbures, les grandes surfaces et les concessionnaires automobiles. Les banques et les établissements financiers sont à {{tn.is-taux[banques-et-assurances]}}.",
    },
    {
      pregunta: "La contribution sociale de solidarité est-elle déductible ?",
      respuesta: "Non. Elle n'est pas déductible de la base de l'impôt sur les sociétés.",
    },
    {
      pregunta: "Depuis quand le taux normal est-il de {{tn.is-taux[normal]}} ?",
      respuesta: "Le code de l'impôt l'applique aux bénéfices réalisés à partir du 1er janvier 2024.",
    },
  ],
  glosario: [
    { termino: "IS", definicion: "Impôt sur les sociétés, dû sur le bénéfice imposable." },
    { termino: "CSS", definicion: "Contribution sociale de solidarité, ajoutée à l'impôt au profit des caisses sociales." },
    { termino: "Bénéfice imposable", definicion: "Résultat fiscal après les réintégrations et déductions prévues par le code." },
  ],
});
