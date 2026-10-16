import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.bright-line-test",
  h1: "Bright-line test calculator",
  title: "Bright-line test NZ: is your property sale taxable?",
  description:
    "Check whether your property sale falls inside the {{nz.bright-line-years}}-year bright-line period in New Zealand and estimate the income tax on the profit.",
  intro: [
    "For residential property sold on or after 1 July 2024, the bright-line test asks one thing: did you agree to sell within {{nz.bright-line-years}} years of getting the title?",
    "If you did, any profit is taxable. Enter your dates and prices to see where your sale lands and roughly how much tax the profit adds.",
  ],
  comoSeCalcula: [
    "The period starts on the date the title was transferred to you, usually your settlement date.",
    "It ends when you enter into a binding sale and purchase agreement. If that's within {{nz.bright-line-years}} years of the start, the sale is inside the bright-line period.",
    "The profit is the sale price less what you paid and the costs you can deduct. We add it to your other income and show the extra income tax at the current rates.",
  ],
  ejemplo: [
    "You got the title on 14 March 2025 and sign an agreement to sell on 14 October 2026. That's inside the period. A $40,000 profit on top of $70,000 of other income adds about $12,957 of income tax.",
  ],
  faq: [
    {
      pregunta: "Does the bright-line test apply to my home?",
      respuesta: "Usually not. It doesn't apply to a sale of property that has been your main home, as long as your use meets Inland Revenue's criteria.",
    },
    {
      pregunta: "What if I sell after the bright-line period?",
      respuesta: "The bright-line test no longer applies, but other property rules can, for example if you bought the property with the intention of selling it.",
    },
    {
      pregunta: "What about sales before 1 July 2024?",
      respuesta: "A 5 or 10 year bright-line period applies, depending on when you got the property.",
    },
    {
      pregunta: "How do I declare a bright-line sale?",
      respuesta: "Show the net profit in your income tax return and complete the IR833 form.",
    },
  ],
  glosario: [
    { termino: "Bright-line start date", definicion: "Usually the date the property's title is transferred to you." },
    { termino: "Bright-line end date", definicion: "Usually the date you enter into a binding agreement to sell." },
  ],
});
