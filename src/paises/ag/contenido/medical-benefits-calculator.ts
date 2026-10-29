import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.medical-benefits-calculator",
  h1: "Medical Benefits Scheme calculator {{anio}}",
  title: "Medical Benefits calculator {{anio}}: 3.5% each side",
  description: "See the Medical Benefits Scheme deduction from your pay and what your employer adds, using the rates in the Medical Benefits Regulations.",
  intro: [
    "The Medical Benefits Scheme is a separate contribution from Social Security. Enter your monthly pay and your age band to see your deduction and your employer's share.",
    "Employees aged 16 to 59 pay {{ag.mbs-employee-rate}} of their pay and the employer pays {{ag.mbs-employer-rate}}. From age 60 to 69 the employee rate is {{ag.mbs-employee-rate-60}}.",
  ],
  comoSeCalcula: [
    "Multiply your gross pay for the month by the rate for your age band. Regulation 17 of the Medical Benefits Regulations, 2011 sets the rates on salary or wages without a ceiling.",
    "The employer pays {{ag.mbs-employer-rate}} of the wages of employees under 60. The regulation does not set an employer share for older employees, so this calculator shows none.",
    "Employers pay the contributions on or before the 14th day of each month, and a late payment carries a charge of 10% under regulation 7.",
  ],
  ejemplo: [
    "An employee aged 40 earns EC$4,000 a month. The deduction is EC$140 and the employer adds EC$140, so EC$280 goes to the scheme. An employee aged 62 on the same pay pays EC$100.",
  ],
  faq: [
    {
      pregunta: "What is the employee rate?",
      respuesta: "Regulation 17(2) sets {{ag.mbs-employee-rate}} of salary or wages for employees from 16 to under 60. Regulation 17(3) sets {{ag.mbs-employee-rate-60}} from 60 to under 70.",
    },
    {
      pregunta: "Is there an earnings ceiling?",
      respuesta: "Regulation 17 states the rates on salary or wages and mentions no ceiling, unlike Social Security, which stops at the insurable earnings limit.",
    },
    {
      pregunta: "What if the contribution is paid late?",
      respuesta: "Regulation 7 adds an amount of 10% of the contribution due to a person who does not pay by the due date.",
    },
  ],
  glosario: [
    { termino: "Medical Benefits Scheme", definicion: "The national scheme that pays medical benefits to contributors, run under the Medical Benefits Act." },
    { termino: "Employee share", definicion: "The part of the contribution that comes off your pay." },
    { termino: "Employer share", definicion: "The matching contribution your employer pays on top of your pay." },
  ],
});
