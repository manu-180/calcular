import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.fringe-benefits-tax-calculator",
  h1: "Fringe benefits tax calculator Fiji {{anio}}",
  title: "Fringe benefits tax Fiji {{anio}}: FBT at {{fj.fbt-rate}}",
  description: "Employers pay FBT at {{fj.fbt-rate}} on a grossed up value of non-cash benefits each quarter. Enter the value to get the tax payable.",
  intro: [
    "Fringe benefits tax (FBT) is charged to the employer at {{fj.fbt-rate}} for each quarter on non-cash benefits such as housing, a company car or a loan. The tax is not worked out on the face value of the benefits, but on a grossed up amount.",
    "Enter the total value of the benefits you provided in a quarter to see the taxable amount, the FBT and the total cost.",
  ],
  comoSeCalcula: [
    "FRCS gives a three step method. First add up the value of every fringe benefit given to employees in the quarter.",
    "Second, divide that total by 1 minus the FBT rate. With a rate of {{fj.fbt-rate}} this means dividing by 0.80. The result is the fringe benefits taxable amount.",
    "Third, multiply the taxable amount by the FBT rate. That is the tax to pay for the quarter.",
    "A benefit that is taxed under FBT is not taxed again as PAYE. FBT paid is not a deductible expense for the employer. Late payment attracts a penalty of {{fj.paye-late-payment-penalty}} on the unpaid amount, which the last line of the result shows.",
  ],
  ejemplo: [
    "FRCS uses this example in its Employer Guide 2026. An employer provides benefits worth FJ$80,000 in a quarter. The taxable amount is FJ$80,000 divided by 0.80, or FJ$100,000. FBT is 20% of FJ$100,000, or FJ$20,000. The benefits and the tax together cost the employer FJ$100,000.",
  ],
  faq: [
    {
      pregunta: "What is the FBT rate in Fiji?",
      respuesta: "FRCS lists fringe benefits tax at {{fj.fbt-rate}}, charged on the fringe benefit taxable amount of the employer each quarter, from 1 January 2012.",
    },
    {
      pregunta: "Which benefits are covered?",
      respuesta: "The Employer Guide lists debt waiver, household personnel, housing, loan, meal or refreshment, motor vehicle, private expenditure, property and residual fringe benefits.",
    },
    {
      pregunta: "Is FBT deductible for the employer?",
      respuesta: "No. The guide says FBT paid is not an allowable expense for the employer. Once a benefit is subject to FBT it is not subject to PAYE.",
    },
  ],
  glosario: [
    { termino: "Fringe benefit", definicion: "A non-cash benefit an employer provides because of the job, such as housing or a vehicle." },
    { termino: "Taxable amount", definicion: "The grossed up value of the benefits on which FBT is charged." },
    { termino: "Quarter", definicion: "A period of three months, the filing period for FBT." },
  ],
});
