import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.senior-deduction",
  h1: "Senior deduction calculator",
  title: "Senior Deduction Calculator: the new {{us.senior-deduction}} for 65+",
  description:
    "Figure the enhanced deduction for seniors, {{us.senior-deduction}} per person 65 or older from 2025 through 2028, with the income phase-out and your estimated tax savings.",
  intro: [
    "People 65 or older can take an extra deduction of up to {{us.senior-deduction}} each on their federal return for 2025 through 2028.",
    "Enter your income and how many people on the return qualify to see your deduction and the tax it saves.",
  ],
  comoSeCalcula: [
    "Each eligible person starts with {{us.senior-deduction}}.",
    "If your MAGI is over {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} on a joint return), each person's amount drops by {{us.senior-deduction-phaseout-rate}} of the excess.",
    "Married couples where both are 65 or older get it twice. Married people filing separately can't claim it.",
  ],
  ejemplo: ["A single filer age 70 with $100,000 of MAGI is $25,000 over the threshold. The deduction drops by $1,500 to $4,500, which saves $990 in the 22% bracket."],
  faq: [
    {
      pregunta: "Is this the same as the extra standard deduction for age 65?",
      respuesta: "No. It is a separate deduction on Schedule 1-A, on top of the extra standard deduction, and you get it even if you itemize.",
    },
    {
      pregunta: "Who qualifies for 2026?",
      respuesta: "Anyone born before January 2, 1962 with a valid Social Security number. If you are married, you have to file a joint return.",
    },
    {
      pregunta: "Does it make Social Security tax free?",
      respuesta: "Not directly. It lowers your taxable income, which can offset tax on part of your benefits, but the rules for taxing Social Security benefits didn't change.",
    },
  ],
  glosario: [
    { termino: "Enhanced deduction for seniors", definicion: "A temporary deduction for people 65 or older, claimed on Schedule 1-A." },
    { termino: "Phase-out", definicion: "The way a deduction shrinks as income rises above a set amount." },
  ],
});
