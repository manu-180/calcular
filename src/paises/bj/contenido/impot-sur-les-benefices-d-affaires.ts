import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.impot-sur-les-benefices-d-affaires",
  h1: "Impôt sur les bénéfices d'affaires (IBA) {{anio}} au Bénin",
  title: "IBA {{anio}} au Bénin : impôt sur les bénéfices d'affaires",
  description:
    "Calculez l'impôt sur les bénéfices d'affaires d'une entreprise individuelle : taux de {{bj.iba-taux[general]}}, minimum de {{bj.iba-minimum-taux[general]}} des produits et plancher de {{bj.impot-minimum-plancher}}.",
  intro: [
    "L'impôt sur les bénéfices d'affaires, ou IBA, est de {{bj.iba-taux[general]}} du bénéfice. Il concerne les personnes physiques et les sociétés de personnes qui exercent une activité commerciale, industrielle, artisanale ou libérale. Les sociétés de capitaux relèvent de l'impôt sur les sociétés.",
    "Renseignez le bénéfice, les produits encaissables et le secteur. Le calcul compare l'impôt sur le bénéfice aux deux minimums prévus par la loi.",
  ],
  comoSeCalcula: [
    "L'impôt est de {{bj.iba-taux[general]}} du bénéfice imposable, et de {{bj.iba-taux[enseignement]}} pour les établissements privés d'enseignement (article 63).",
    "Il ne peut être inférieur à {{bj.iba-minimum-taux[general]}} des produits encaissables, ou {{bj.iba-minimum-taux[btp]}} dans le bâtiment et travaux publics et {{bj.iba-minimum-taux[immobilier]}} pour l'immobilier (article 64).",
    "Un plancher absolu de {{bj.impot-minimum-plancher}} s'applique aussi. Une redevance de 4 000 F pour la radiodiffusion et télévision s'ajoute, payable avec l'acompte du 10 mars.",
  ],
  ejemplo: [
    "Un grossiste réalise 8 000 000 F de bénéfice sur 60 000 000 F de produits. À 30 %, l'impôt est de 2 400 000 F, supérieur au minimum de 900 000 F. Avec la redevance, il paie 2 404 000 F. Si son bénéfice n'était que de 500 000 F sur 40 000 000 F de produits, le minimum de 600 000 F remplacerait les 150 000 F calculés.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de l'IBA au Bénin ?",
      respuesta: "L'article 63 du Code général des impôts fixe {{bj.iba-taux[general]}} du bénéfice imposable, réduit à {{bj.iba-taux[enseignement]}} pour l'enseignement privé.",
    },
    {
      pregunta: "Quel est le minimum d'impôt ?",
      respuesta: "L'article 64 retient {{bj.iba-minimum-taux[general]}} des produits encaissables, avec des taux propres au BTP et à l'immobilier, et jamais moins de {{bj.impot-minimum-plancher}}.",
    },
    {
      pregunta: "Quand l'IBA est-il payé ?",
      respuesta: "L'impôt est réglé en acomptes, dont celui du 10 mars qui porte aussi la redevance de 4 000 F (article 64, paragraphe 4).",
    },
  ],
  glosario: [
    { termino: "IBA", definicion: "Impôt sur les bénéfices d'affaires, dû par les entreprises individuelles et assimilées." },
    { termino: "Produits encaissables", definicion: "Les produits ayant donné ou pouvant donner lieu à un encaissement, base du minimum de perception." },
    { termino: "Acompte", definicion: "Un versement d'avance sur l'impôt de l'exercice." },
  ],
});
