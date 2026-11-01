import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.employer-cost-calculator",
  h1: "Employer cost calculator Nepal {{anio}}",
  title: "Employer cost calculator Nepal {{anio}}: true cost of a salary",
  description: "See what an employee really costs in Nepal: pay plus the {{np.ssf-employer-rate}} Social Security Fund contribution and the festival allowance the Labour Act requires.",
  intro: [
    "Enter the basic pay and allowances you agree with a worker, and the calculator adds the contributions the law puts on the employer.",
    "That gives the monthly and yearly cost of the post, which is higher than the salary on the offer letter. With the Fund, the employer adds {{np.ssf-employer-rate}} of basic pay.",
  ],
  comoSeCalcula: [
    "For workers in the Social Security Fund, the employer pays {{np.ssf-employer-rate}} of basic pay on top of the pay. This covers the provident fund match, gratuity and part of the social security schemes.",
    "Outside the Fund, the Labour Act, 2074 still requires the provident fund match of {{np.ssf-provident-rate}} and gratuity of {{np.gratuity-rate}} of basic pay, so the employer sets aside both directly.",
    "The employer also owes a festival allowance equal to {{np.festival-allowance-months}} of basic pay each year. The calculator spreads it over twelve months.",
  ],
  ejemplo: ["Basic pay of NPR 40,000 and allowances of NPR 10,000 cost NPR 61,333.33 a month with the Fund: NPR 8,000 of contributions plus NPR 3,333.33 of festival allowance."],
  faq: [
    {
      pregunta: "How much does an employer pay to the Social Security Fund?",
      respuesta: "Twenty percent of the worker's basic pay, added to the 11% deducted from the worker, according to the Fund's operation procedure.",
    },
    {
      pregunta: "Are allowances included in the contribution?",
      respuesta: "No. The Fund and the Labour Act work on basic pay, so allowances raise the cost only by the amount paid.",
    },
    {
      pregunta: "Does the calculator include health and accident insurance?",
      respuesta: "No. Section 54 and 55 of the Labour Act also require medical and accident insurance for each worker, and the premium is not counted here.",
    },
  ],
  glosario: [
    { termino: "Employer contribution", definicion: "What the employer pays on top of pay for the worker's retirement and social security." },
    { termino: "Festival allowance", definicion: "One month of basic pay paid once a year." },
  ],
});
