import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.company-car-deduction-calculator",
  h1: "Company car tax deduction calculator Brunei {{anio}}",
  title: "Brunei company car deduction {{anio}}: {{bn.vehicle-cap}} cap",
  description:
    "See how much of a company car's running costs a Brunei company can deduct. Cars costing more than {{bn.vehicle-cap}} lose part of the deduction.",
  intro: [
    "A Brunei company that buys a car above {{bn.vehicle-cap}} cannot deduct all of its costs. The Income Tax Act limits both the capital allowance and the running costs to the share that {{bn.vehicle-cap}} bears to the real price of the car.",
    "The limit applies to a car built or adapted to carry up to {{bn.vehicle-passengers}} passengers besides the driver, with a weight of no more than 3,000 kilograms, bought on or after 1 January 2008. Enter the price, the running costs for the year and the calculator shows the deductible part.",
  ],
  comoSeCalcula: [
    "Allowed share: {{bn.vehicle-cap}} divided by the cost of the car, never above 100 percent.",
    "Deductible running costs: fuel, repair, insurance and similar costs multiplied by the allowed share.",
    "For capital allowances the cost counted is the car's price up to {{bn.vehicle-cap}}.",
  ],
  ejemplo: [
    "A car costs BND 60,000 and its running costs for the year are BND 10,000. The allowed share is 83.33 percent. The company deducts BND 8,333.33 and cannot deduct BND 1,666.67. The capital allowance is worked out on BND 50,000.00.",
  ],
  faq: [
    {
      pregunta: "Which law sets the cap?",
      respuesta: "Sections 16(4) and 16(5) of the Income Tax Act limit qualifying expenditure on a car, and section 11(1A) limits deductions on its expenses. The Revenue Division explains both on its income tax page.",
    },
    {
      pregunta: "Does the cap apply to vans and lorries?",
      respuesta: "The limit is written for cars that carry up to 7 passengers and weigh up to 3,000 kilograms. Heavier or larger vehicles fall outside it. Choose No in the calculator for those.",
    },
    {
      pregunta: "Is a car bought before 2008 capped?",
      respuesta: "No. The rule covers cars bought on or after 1 January 2008.",
    },
  ],
  glosario: [
    { termino: "Qualifying expenditure", definicion: "The cost that counts for capital allowances." },
    { termino: "Running costs", definicion: "Fuel, repairs, insurance and other costs of using the car." },
    { termino: "Capital allowance", definicion: "The tax deduction that replaces depreciation." },
  ],
});
