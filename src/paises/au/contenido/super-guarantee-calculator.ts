import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.super-guarantee-calculator",
  h1: "Super guarantee calculator",
  title: "Super calculator: your {{au.super-guarantee}} super guarantee",
  description: "Work out the super your employer must pay at the {{au.super-guarantee}} super guarantee rate, per pay period and per year, up to the maximum contribution base.",
  intro: [
    "Your employer has to pay super for you on top of your pay. The minimum is the super guarantee, {{au.super-guarantee}} of your earnings.",
    "Enter your earnings for a year, month, fortnight or week to see the super that should go into your fund.",
  ],
  comoSeCalcula: [
    "Your earnings are multiplied by the super guarantee rate of {{au.super-guarantee}}.",
    "From 1 July 2026 the maximum contribution base is {{au.super-base-maxima}} a year. Your employer does not have to pay super guarantee on earnings above it.",
    "The yearly amount is split into your pay periods.",
  ],
  ejemplo: ["On $85,000 a year your employer pays at least $10,200 into your super, so your total package is $95,200."],
  faq: [
    {
      pregunta: "When does my employer have to pay my super?",
      respuesta: "With Payday Super, from 1 July 2026 employers pay super guarantee for each payday. Before that, they paid it at least every quarter.",
    },
    {
      pregunta: "Is super guarantee taken out of my salary?",
      respuesta: "No. It is paid on top of your salary, unless your contract states a package that already includes super.",
    },
    {
      pregunta: "Has the rate changed?",
      respuesta: "It rose from 11.5% in 2024-25 to {{au.super-guarantee}} from 1 July 2025, and the ATO lists the same rate for later years.",
    },
  ],
  glosario: [
    { termino: "Super guarantee", definicion: "The minimum super your employer must pay into your fund." },
    { termino: "Maximum contribution base", definicion: "The earnings limit above which your employer does not have to pay super guarantee." },
    { termino: "Payday Super", definicion: "The rule from 1 July 2026 that employers pay super for each payday." },
  ],
});
