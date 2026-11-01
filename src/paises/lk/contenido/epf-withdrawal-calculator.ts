import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.epf-withdrawal-calculator",
  h1: "EPF 30% withdrawal calculator",
  title: "EPF 30% withdrawal calculator: housing or medical treatment",
  description:
    "Check how much of your EPF you can take out before retirement for house construction or medical treatment: up to {{lk.epf-withdrawal-share}}, at most {{lk.epf-withdrawal-max}}.",
  intro: [
    "You do not have to wait until retirement to use part of your EPF. Members with enough service and a large enough balance can withdraw part of it to build a house or pay for medical treatment.",
    "Enter your balance and your years of service.",
  ],
  comoSeCalcula: [
    "You qualify with more than {{lk.epf-withdrawal-min-years}} years of service and a balance above {{lk.epf-withdrawal-min-balance}}.",
    "You can then withdraw up to {{lk.epf-withdrawal-share}} of your balance, with a maximum of {{lk.epf-withdrawal-max}}.",
  ],
  ejemplo: ["With Rs. 3,000,000 in your account and 12 years of service, you can withdraw up to Rs. 900,000."],
  faq: [
    {
      pregunta: "Which law allows this?",
      respuesta: "The EPF (Amendment) Act, No. 2 of 2012. The Central Bank says the withdrawal has applied since 2015.",
    },
    {
      pregunta: "When can I take out my whole EPF?",
      respuesta: "At the retirement age of 50 for women and 55 for men. Members can also claim on migration, permanent disability, joining a pensionable job and, for women, leaving work on marriage.",
    },
    {
      pregunta: "Can I borrow against my EPF instead?",
      respuesta: "Yes. You can pledge your balance for a housing loan from one of the approved lending institutions.",
    },
  ],
  glosario: [
    { termino: "EPF balance", definicion: "Your contributions and those of your employers, with the interest credited each year." },
    { termino: "Member statement", definicion: "The yearly statement of your EPF account." },
  ],
});
