import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.help-to-buy",
  h1: "Help to Buy calculator",
  title: "Help to Buy calculator: up to {{ie.htb-max}} back",
  description: "See how much Help to Buy you can get on a new home: the lesser of {{ie.htb-max}}, {{ie.htb-percent}} of the price or the Income Tax and DIRT you paid in 4 years.",
  intro: [
    "Help to Buy is a refund of Income Tax and DIRT for first-time buyers of a new home, or people who build their own.",
    "Enter the price, your mortgage and the tax you paid in the last four years to see your refund.",
  ],
  comoSeCalcula: [
    "The home has to cost {{ie.htb-max-value}} or less, and the mortgage has to be at least {{ie.htb-min-mortgage-percent}} of the price.",
    "Your refund is the smallest of three amounts: {{ie.htb-max}}, {{ie.htb-percent}} of the purchase price, and the Income Tax and DIRT you paid in the four years before you apply.",
    "USC and PRSI do not count towards the tax you paid.",
  ],
  ejemplo: ["On a new home costing €400,000 with €50,000 of tax paid, 10% of the price is €40,000, so the refund is the maximum of €35,000."],
  faq: [
    {
      pregunta: "How much can I claim if I signed before 7 October 2026?",
      respuesta: "Contracts signed from 23 July 2020 to 6 October 2026 had a cap of €30,000. From 7 October 2026 to 31 December 2029 the cap is {{ie.htb-max}}.",
    },
    {
      pregunta: "Who gets the money?",
      respuesta: "If you buy, the refund is paid to your Revenue-approved contractor. If you self-build, it goes into a bank account you hold with your mortgage provider.",
    },
    {
      pregunta: "Can more than one person claim on the same home?",
      respuesta: "Yes, but the cap applies per property, however many buyers there are. All of the buyers have to be first-time buyers.",
    },
    {
      pregunta: "Can Revenue take the refund back?",
      respuesta: "Revenue has rules for clawing back a refund. One condition of the scheme is that you live in the home as your main home for five years after you buy or build it.",
    },
  ],
  glosario: [
    { termino: "DIRT", definicion: "Deposit Interest Retention Tax, the tax taken from interest on savings." },
    { termino: "First-time buyer", definicion: "Someone who has never bought or built a house or apartment, alone or with others, in Ireland or abroad." },
  ],
});
