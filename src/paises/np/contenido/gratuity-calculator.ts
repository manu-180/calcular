import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.gratuity-calculator",
  h1: "Gratuity calculator Nepal {{anio}}",
  title: "Gratuity calculator Nepal {{anio}}: {{np.gratuity-rate}} of basic pay",
  description: "Estimate the gratuity and provident fund built up for you under the Labour Act, 2074: {{np.gratuity-rate}} and {{np.ssf-provident-rate}} of basic pay a month.",
  intro: [
    "In Nepal, gratuity is not a lump sum worked out when you leave. The employer sets aside a share of your basic pay every month and the balance belongs to you.",
    "Enter your basic pay and your months of service to see how much has built up for gratuity ({{np.gratuity-rate}} of basic pay) and for the provident fund ({{np.ssf-provident-rate}} from each side).",
  ],
  comoSeCalcula: [
    "Section 53 of the Labour Act, 2074 requires the employer to deposit {{np.gratuity-rate}} of each worker's basic pay every month as gratuity, counted from the day the worker starts.",
    "Section 52 sets the provident fund: {{np.ssf-provident-rate}} is deducted from basic pay and the employer adds the same amount. For workers in the Social Security Fund, both deposits go to the Fund.",
    "The calculator multiplies the monthly figures by your months of service and assumes your basic pay did not change. Interest the Fund earns is not included.",
  ],
  ejemplo: ["On basic pay of NPR 40,000, gratuity is NPR 3,332 a month. After 60 months it comes to NPR 199,920. The provident fund adds NPR 240,000 from you and NPR 240,000 from your employer."],
  faq: [
    {
      pregunta: "How is gratuity calculated in Nepal?",
      respuesta: "At 8.33% of basic pay each month, as section 53 of the Labour Act, 2074 requires from the employer.",
    },
    {
      pregunta: "What if my employer cannot deposit it in the Fund?",
      respuesta: "Section 53 says the employer must then pay the worker the same 8.33% of basic pay directly.",
    },
    {
      pregunta: "Is the provident fund the same as gratuity?",
      respuesta: "No. The provident fund is 10% of basic pay from the worker, matched by the employer, under section 52. Gratuity is a separate 8.33% paid only by the employer.",
    },
  ],
  glosario: [
    { termino: "Gratuity", definicion: "A share of basic pay the employer sets aside each month for the worker." },
    { termino: "Provident fund", definicion: "Retirement savings built from equal deductions from the worker and the employer." },
  ],
});
