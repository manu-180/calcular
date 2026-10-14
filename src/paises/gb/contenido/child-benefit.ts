import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.child-benefit",
  h1: "Child Benefit calculator with the high income charge",
  title: "Child Benefit calculator 2026/27 and high income charge",
  description:
    "See how much Child Benefit you get ({{gb.child-benefit-rates[eldest]}} a week for the eldest child) and how much the High Income Child Benefit Charge takes back above {{gb.hicbc-threshold}}.",
  intro: [
    "Child Benefit is paid for each child under 16, or under 20 if they stay in approved education or training. There is no income limit to claim it, but if one parent earns over {{gb.hicbc-threshold}}, part or all of it is paid back as a tax charge.",
    "Enter how many children you claim for and the income of the higher earner to see what you keep.",
  ],
  comoSeCalcula: [
    "You get {{gb.child-benefit-rates[eldest]}} a week for the eldest or only child and {{gb.child-benefit-rates[additional]}} a week for each other child.",
    "If the higher earner's adjusted net income is over {{gb.hicbc-threshold}}, they pay back 1% of the benefit for every {{gb.hicbc-step}} of income above it.",
    "At £80,000 or more, the charge equals the whole benefit.",
  ],
  ejemplo: ["With two children you get £44.95 a week, or £2,337.40 a year. If the higher earner has £70,000, half is paid back, so you keep £1,168.70."],
  faq: [
    {
      pregunta: "Should I claim if I earn over £80,000?",
      respuesta:
        "Usually yes, and then opt out of the payments. Claiming gets a parent who is not working National Insurance credits for the State Pension, and gets your child a National Insurance number automatically.",
    },
    {
      pregunta: "Whose income counts?",
      respuesta: "Only the income of the partner who earns more. It does not matter who receives the Child Benefit. Two incomes of £55,000 pay no charge.",
    },
    {
      pregunta: "Can a pension contribution reduce the charge?",
      respuesta: "Yes. The charge uses adjusted net income, which goes down when you pay into a pension or give to charity through Gift Aid.",
    },
  ],
  glosario: [
    { termino: "High Income Child Benefit Charge", definicion: "A tax charge that claws back Child Benefit when the higher earner's income is over the threshold." },
    { termino: "Adjusted net income", definicion: "Your total taxable income minus things like pension contributions and Gift Aid donations." },
  ],
});
