import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.pension-age",
  h1: "Pension age calculator Malta",
  title: "Pension age Malta: when you can retire",
  description:
    "Find your pension age in Malta from your date of birth: {{mt.pension-age[born-1962-or-after]}} if you were born in 1962 or later, from {{mt.pension-age[born-1951-or-before]}} to {{mt.pension-age[born-1959-1961]}} for earlier years.",
  intro: [
    "Malta's pension age depends on the year you were born. It has been rising step by step to {{mt.pension-age[born-1962-or-after]}}.",
    "Enter your date of birth. You get your pension age and the date you reach it.",
  ],
  comoSeCalcula: [
    "Born in 1962 or after: {{mt.pension-age[born-1962-or-after]}}. Born from 1959 to 1961: {{mt.pension-age[born-1959-1961]}}. Born from 1956 to 1958: {{mt.pension-age[born-1956-1958]}}.",
    "Born from 1952 to 1955: {{mt.pension-age[born-1952-1955]}}. Born in 1951 or before: {{mt.pension-age[born-1951-or-before]}}, or {{mt.pension-age[women-1951-or-before]}} for women.",
    "The date is your birthday in the year you reach that age.",
  ],
  ejemplo: ["Someone born on 15 June 1970 reaches pension age, {{mt.pension-age[born-1962-or-after]}}, on 15 June 2035."],
  faq: [
    {
      pregunta: "Is pension age the same as the age I get a pension?",
      respuesta: "It is the age set by the Social Security Act. Whether you get a contributory pension, and how much, also depends on your record of contributions.",
    },
    {
      pregunta: "Which law sets it?",
      respuesta: "The definition of pension age in article 2 of the Social Security Act.",
    },
    {
      pregunta: "Why is it lower for women born before 1952?",
      respuesta: "The Act keeps a pension age of {{mt.pension-age[women-1951-or-before]}} for women born on or before 31 December 1951, one year below men of the same age.",
    },
  ],
  glosario: [
    { termino: "Pension age", definicion: "The age the Social Security Act uses for retirement pensions." },
    { termino: "Contributory pension", definicion: "A pension paid on the basis of the social security contributions you paid or were credited." },
  ],
});
