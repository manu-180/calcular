import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés (IS) au Maroc",
  title: "Impôt sur les sociétés Maroc 2026 : taux de {{ma.is-taux[normal]}}",
  description:
    "Calculez l'impôt sur les sociétés au Maroc pour les exercices ouverts en 2026 : {{ma.is-taux[normal]}}, {{ma.is-taux[grandes-entreprises]}} pour les très gros bénéfices et {{ma.is-taux[etablissements-financiers]}} pour les banques et assurances.",
  intro: [
    "La réforme de l'impôt sur les sociétés lancée par la loi de finances 2023 arrive à son terme : pour les exercices ouverts à partir du 1er janvier 2026, le taux normal est de {{ma.is-taux[normal]}}.",
    "Les sociétés dont le bénéfice net atteint {{ma.is-seuil}} paient {{ma.is-taux[grandes-entreprises]}}, et les établissements de crédit, Bank Al-Maghrib, la CDG et les entreprises d'assurance {{ma.is-taux[etablissements-financiers]}}.",
  ],
  comoSeCalcula: [
    "Impôt = bénéfice net fiscal × taux.",
    "Le taux s'applique à la totalité du bénéfice : il n'y a pas de tranches comme pour l'impôt sur le revenu.",
  ],
  ejemplo: ["Une société qui réalise 2 000 000 DH de bénéfice net paie 400 000 DH d'impôt sur les sociétés."],
  faq: [
    {
      pregunta: "Pourquoi les taux ont-ils changé entre 2023 et 2026 ?",
      respuesta:
        "La loi de finances 2023 a prévu une convergence progressive des anciens taux vers un taux unique de {{ma.is-taux[normal]}} et un taux de {{ma.is-taux[grandes-entreprises]}} pour les gros bénéfices, sur les exercices ouverts de 2023 à 2026.",
    },
    {
      pregunta: "Le taux de {{ma.is-taux[grandes-entreprises]}} s'applique-t-il à toutes les grandes sociétés ?",
      respuesta:
        "Non. Le code général des impôts en exclut notamment les sociétés ayant le statut Casablanca Finance City et celles installées dans les zones d'accélération industrielle.",
    },
    {
      pregunta: "Et si le bénéfice redescend sous le seuil ?",
      respuesta:
        "Le taux de {{ma.is-taux[normal]}} ne s'applique alors que si le bénéfice reste sous le seuil pendant trois exercices consécutifs, sauf si le dépassement venait de produits non courants.",
    },
  ],
  glosario: [
    { termino: "IS", definicion: "Impôt sur les sociétés, dû par les sociétés sur leur bénéfice fiscal." },
    { termino: "Bénéfice net fiscal", definicion: "Le résultat de l'exercice après les corrections prévues par la loi fiscale." },
  ],
});
