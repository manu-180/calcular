import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.capital-allowance-calculator",
  h1: "Capital allowance calculator Brunei {{anio}}",
  title: "Brunei capital allowance {{anio}}: initial and annual",
  description:
    "Work out capital allowances for a Brunei company: {{bn.capital-industrial-initial}} initial allowance, {{bn.capital-industrial-annual}} a year on industrial buildings and 3% to 25% on plant.",
  intro: [
    "Depreciation is not a tax deduction in Brunei Darussalam. The Revenue Division replaces it with capital allowances on qualifying capital expenditure. An initial allowance of {{bn.capital-industrial-initial}} is given in the year of expenditure, and annual allowances follow.",
    "Pick the asset, enter its cost and tell us how many years of annual allowance you have claimed. The calculator returns the initial allowance, what you have claimed so far, the tax written-down value and the next annual allowance.",
  ],
  comoSeCalcula: [
    "Industrial buildings and structures, hotels included: an initial allowance of {{bn.capital-industrial-initial}} of the cost and an annual allowance of {{bn.capital-industrial-annual}} of the cost on a straight line, until the cost is written off. These rates apply from 1 January 2008.",
    "Plant and machinery: an initial allowance of {{bn.capital-plant-initial}} of the cost, then annual allowances on the reducing value. The Collector of Income Tax sets rates from {{bn.capital-plant-annual-low}} to {{bn.capital-plant-annual-high}} depending on the asset.",
    "Since 1 January 2009 a company can instead claim {{bn.capital-plant-accelerated}} a year for 3 years on plant and machinery. That option is not in this calculator.",
  ],
  ejemplo: [
    "A machine costs BND 200,000 and the annual rate set for it is 10 percent. The initial allowance is BND 40,000.00. After two years of annual allowance you have claimed BND 30,400.00 more, the written-down value is BND 129,600.00 and the next annual allowance is BND 12,960.00.",
  ],
  faq: [
    {
      pregunta: "What happens when I sell the asset?",
      respuesta: "The Revenue Division says balancing allowances or charges are made on disposal of an industrial building, plant or machinery. They cover the gap between the tax written-down value and the sale proceeds.",
    },
    {
      pregunta: "Can unused allowances be carried forward?",
      respuesta: "Yes. Unabsorbed capital allowances can be carried forward indefinitely, but they must be set off against income from the same trade.",
    },
    {
      pregunta: "Is there a limit on cars?",
      respuesta: "Yes. Qualifying expenditure on a car carrying up to 7 passengers and weighing no more than 3,000 kilograms is capped at BND 50,000. Our company car deduction calculator shows the effect on running costs.",
    },
  ],
  glosario: [
    { termino: "Initial allowance", definicion: "The first deduction, given in the year the money is spent." },
    { termino: "Annual allowance", definicion: "The yearly deduction that follows the initial allowance." },
    { termino: "Written-down value", definicion: "The cost not yet deducted for tax." },
  ],
});
