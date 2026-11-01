import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.child-benefit",
  h1: "Child Benefit calculator Ireland {{anio}}",
  title: "Child Benefit Ireland {{anio}}: {{ie.child-benefit-monthly[single]}} a month per child",
  description: "Child Benefit is {{ie.child-benefit-monthly[single]}} a month for each child, with higher rates for twins and multiple births. See your monthly and yearly total.",
  intro: [
    "Child Benefit is a monthly payment for each child in your family. Enter the number of children to see what you get each month and each year.",
    "The rate is {{ie.child-benefit-monthly[single]}} a month for each child, {{ie.child-benefit-monthly[twins]}} for each twin and {{ie.child-benefit-monthly[multiple]}} for each child in triplets or more.",
  ],
  comoSeCalcula: [
    "Each child counts at {{ie.child-benefit-monthly[single]}} a month.",
    "Twins are paid one and a half times the normal rate, so {{ie.child-benefit-monthly[twins]}} each.",
    "Triplets and other multiple births are paid double, so {{ie.child-benefit-monthly[multiple]}} each.",
    "The yearly figure is the monthly total times 12.",
  ],
  ejemplo: ["A family with one child and a pair of twins gets €140 + €210 + €210 = €560 a month, or €6,720 a year."],
  faq: [
    {
      pregunta: "Is there a payment when a baby is born?",
      respuesta: "Yes. A Newborn Baby Grant of €280 is paid with the first month of Child Benefit for children born on or after 1 December 2024.",
    },
    {
      pregunta: "Who pays Child Benefit?",
      respuesta: "The Department of Social Protection pays it each month.",
    },
    {
      pregunta: "Does it change every year?",
      respuesta: "The rate can change in each Budget. This calculator uses the rate in the Department's 2026 Rates of Payment booklet.",
    },
  ],
  glosario: [
    { termino: "Multiple birth", definicion: "Twins, triplets or more born at the same time." },
    { termino: "Newborn Baby Grant", definicion: "A one-off payment with the first Child Benefit payment for a new baby." },
  ],
});
