import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-irg-prime",
  h1: "Calcul de l'IRG sur une prime en Algérie",
  title: "IRG sur prime Algérie : retenue de {{dz.irg-primes}} sur PRI et rappels",
  description:
    "Calculez le net d'une prime trimestrielle, d'une prime de rendement ou d'un rappel en Algérie : cotisation de {{dz.cnas[salarie]}} puis IRG au taux fixe de {{dz.irg-primes}}.",
  intro: [
    "Les primes, indemnités et rappels qui ne sont pas versés chaque mois ne passent pas par le barème progressif. Ils forment une mensualité distincte, soumise à une retenue d'IRG au taux fixe de {{dz.irg-primes}}.",
    "Indiquez le montant brut de la prime. Le calcul retire la cotisation de sécurité sociale si elle s'applique, puis l'IRG.",
  ],
  comoSeCalcula: [
    "Cotisation de sécurité sociale du travailleur : {{dz.cnas[salarie]}} de la prime, si elle y est soumise.",
    "IRG : {{dz.irg-primes}} du montant restant (article 104-II-3-b du code des impôts directs). Comme pour le salaire, le calcul retient la prime après cotisation.",
    "Prime nette = prime brute − cotisation − IRG.",
  ],
  faq: [
    {
      pregunta: "La prime de rendement trimestrielle est-elle imposée au barème ?",
      respuesta: "Non. Versée tous les trois mois, elle est traitée comme une mensualité distincte et imposée au taux fixe de {{dz.irg-primes}}.",
    },
    {
      pregunta: "Et une prime versée chaque mois ?",
      respuesta: "Elle s'ajoute au salaire du mois et suit le barème progressif, avec l'abattement. Utilisez le calcul de l'IRG sur salaire.",
    },
    {
      pregunta: "Les rappels de salaire sont-ils concernés ?",
      respuesta: "Oui. Les rappels de rémunérations, indemnités, primes et allocations sont soumis à la même retenue de {{dz.irg-primes}}.",
    },
  ],
  glosario: [
    { termino: "PRI", definicion: "Prime de rendement individuel, souvent versée chaque trimestre." },
    { termino: "Rappel", definicion: "Somme versée après coup pour une période passée, par exemple après une augmentation rétroactive." },
  ],
});
