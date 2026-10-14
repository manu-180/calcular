import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.capital-gains-tax",
  h1: "Capital Gains Tax calculator 2026/27",
  title: "Capital Gains Tax calculator 2026/27: shares and property",
  description:
    "Work out Capital Gains Tax for 2026/27: {{gb.cgt-annual-exempt-amount}} tax free, then {{gb.cgt-rates[basic]}} within your basic rate band and {{gb.cgt-rates[higher]}} above it.",
  intro: [
    "Capital Gains Tax is paid on the profit when you sell or give away something that has gone up in value, such as shares, a second home or a buy-to-let.",
    "Enter your total gains for the tax year and your income, and see how much tax you owe and at which rate.",
  ],
  comoSeCalcula: [
    "Start with your gains for the year, after taking off any allowable losses.",
    "The first {{gb.cgt-annual-exempt-amount}} is tax free. This is the annual exempt amount.",
    "Gains that fit into what is left of your basic rate band of {{gb.basic-rate-band}} are taxed at {{gb.cgt-rates[basic]}}. Gains above it are taxed at {{gb.cgt-rates[higher]}}.",
    "Your taxable income uses the band first, so the more you earn, the less room is left for gains at the lower rate.",
  ],
  ejemplo: [
    "HMRC's example: with taxable income of £20,000 and gains of £52,600, £17,700 is taxed at {{gb.cgt-rates[basic]}} and £31,900 at {{gb.cgt-rates[higher]}}. The tax is £10,842.",
  ],
  faq: [
    {
      pregunta: "Do I pay Capital Gains Tax when I sell my home?",
      respuesta: "Usually not, if it has been your main home. You may pay on part of the gain if you let it out, used it for business or it is very large. A second home or a buy-to-let is taxed.",
    },
    {
      pregunta: "Which gains are tax free?",
      respuesta: "Gains on ISAs, UK government gilts and Premium Bonds, and betting or lottery winnings are free of Capital Gains Tax. Your car is not taxed either.",
    },
    {
      pregunta: "Can I use losses to reduce the tax?",
      respuesta: "Yes. Losses in the same tax year are taken off your gains first. Unused losses can be carried forward, and you can claim them up to 4 years after the end of the tax year you made them.",
    },
    {
      pregunta: "When do I pay Capital Gains Tax on a UK home?",
      respuesta: "If you sell a UK residential property, you report it and pay the tax within 60 days of completing the sale.",
    },
  ],
  glosario: [
    { termino: "Gain", definicion: "The difference between what you paid for an asset and what you sold it for, less allowable costs." },
    { termino: "Annual exempt amount", definicion: "The gains you can make each tax year before paying Capital Gains Tax." },
  ],
});
