import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.severance-tax-calculator",
  h1: "Tax on severance and gratuity",
  title: "Tax on severance pay and contract gratuity in Trinidad",
  description: "Severance up to {{tt.severance-exemption}} is tax-free. See the tax on a larger severance payment or on a contract gratuity, using IRD rules.",
  intro: [
    "Severance pay and a contract gratuity are taxed in very different ways. Severance has a large exemption; a contract gratuity has none.",
    "Pick the kind of payment and enter the amount to see what you keep.",
  ],
  comoSeCalcula: [
    "Severance: the first {{tt.severance-exemption}} is exempt from tax.",
    "Any severance above that is taxed at your average rate of tax for the previous income year. That is why only last year's return has to be filed.",
    "Contract gratuity: {{tt.income-tax-rate}} on the first {{tt.income-tax-higher-band}} and {{tt.income-tax-higher-rate}} on the rest, with no exemption.",
  ],
  ejemplo: [
    "A severance payment of TT$650,000 with an average rate of 18% last year: TT$500,000 is exempt and TT$150,000 pays TT$27,000. You keep TT$623,000.",
  ],
  faq: [
    {
      pregunta: "Is severance pay taxable in Trinidad and Tobago?",
      respuesta: "Only above {{tt.severance-exemption}}. Up to that amount it is exempt and no tax return is needed to process it.",
    },
    {
      pregunta: "Who does not get the severance exemption?",
      respuesta: "Workers with less than one year of completed service, casual, temporary, contract and seasonal workers.",
    },
    {
      pregunta: "How is a contract gratuity taxed?",
      respuesta: "At {{tt.income-tax-rate}} up to {{tt.income-tax-higher-band}} and {{tt.income-tax-higher-rate}} above, with no exemptions. No tax return is needed to process it.",
    },
    {
      pregunta: "What if I owe tax already?",
      respuesta: "If you have an outstanding tax liability, the Board of Inland Revenue issues a garnishee order against the payment.",
    },
  ],
  glosario: [
    { termino: "Severance pay", definicion: "A payment on the end of employment through retrenchment, under the Retrenchment and Severance Benefits Act." },
    { termino: "Contract gratuity", definicion: "A lump sum paid at the end of a fixed-term contract." },
    { termino: "Average rate of tax", definicion: "Your total income tax for a year divided by your total income for that year." },
  ],
});
