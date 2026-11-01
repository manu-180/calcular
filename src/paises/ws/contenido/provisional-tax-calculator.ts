import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.provisional-tax-calculator",
  h1: "Provisional tax calculator Samoa {{anio}}",
  title: "Provisional tax calculator Samoa {{anio}}: 3 instalments",
  description: "Split last year's income tax into the {{ws.provisional-tax-instalments}} provisional tax payments due on 31 March, 31 July and 31 October. Under {{ws.provisional-tax-minimum}} is paid in March.",
  intro: [
    "Provisional tax is income tax paid in advance. In Samoa a person liable for income tax pays it in {{ws.provisional-tax-instalments}} instalments during the tax year, on 31 March, 31 July and 31 October.",
    "The amount is based on last year's income tax liability. Enter that figure to get the three payments and their dates.",
  ],
  comoSeCalcula: [
    "Last year's income tax liability is divided by {{ws.provisional-tax-instalments}}. The first two instalments are equal and the third takes any cent left over, so the three add up exactly to the liability.",
    "If last year's liability is under {{ws.provisional-tax-minimum}}, the whole amount is paid as the first payment in March and nothing falls due in July and October.",
    "When you file your return by 31 March of the next year, the provisional payments are set against the tax for that year. The balance is paid the same day, and the first instalment for the new year is due then too.",
  ],
  ejemplo: [
    "The Ministry for Revenue's own example has a liability of WS$10,000. The instalments are WS$3,333.33 on 31 March, WS$3,333.33 on 31 July and WS$3,333.34 on 31 October.",
  ],
  faq: [
    {
      pregunta: "Who pays provisional tax?",
      respuesta: "Section 85 of the Income Tax Act 2012, as quoted in Information Sheet IS01, says a person liable for income tax must pay provisional tax instalments by 31 March, 31 July and 31 October of the tax year.",
    },
    {
      pregunta: "What if my liability last year was very small?",
      respuesta: "IS01 says that under {{ws.provisional-tax-minimum}} you pay the full amount in the first payment in March rather than in {{ws.provisional-tax-instalments}} instalments.",
    },
    {
      pregunta: "What if I pay more provisional tax than I owe?",
      respuesta: "IS01 explains that excess payments stay as a credit towards the next income tax year's liability.",
    },
  ],
  glosario: [
    { termino: "Provisional tax", definicion: "Income tax paid in advance, based on last year's liability." },
    { termino: "Instalment", definicion: "One of the scheduled payments." },
    { termino: "Tax year", definicion: "The calendar year, ending 31 December, unless the Commissioner approves a substitute date." },
  ],
});
