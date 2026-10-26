import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.csg-calculator",
  h1: "CSG and NSF calculator Mauritius",
  title: "CSG calculator Mauritius 2026: employee and employer",
  description:
    "See the CSG and NSF on a monthly basic wage, for you and for your employer. CSG is {{mu.csg-employee-low}} and {{mu.csg-employer-low}} up to {{mu.csg-threshold}}, then {{mu.csg-employee-high}} and {{mu.csg-employer-high}}.",
  intro: [
    "The Contribution Sociale Généralisée and the National Savings Fund are taken from every basic wage and paid to MRA with the monthly return.",
    "Enter the basic wage to see each share and the total.",
  ],
  comoSeCalcula: [
    "If the basic wage is {{mu.csg-threshold}} or less, the employee pays {{mu.csg-employee-low}} and the employer {{mu.csg-employer-low}}.",
    "Above {{mu.csg-threshold}}, the employee pays {{mu.csg-employee-high}} and the employer {{mu.csg-employer-high}}, on the whole wage.",
    "NSF is {{mu.nsf-employee}} for the employee and {{mu.nsf-employer}} for the employer. It is worked out on the basic wage, but on no less than {{mu.nsf-minimum-wage}} and no more than {{mu.nsf-maximum-wage}}.",
  ],
  ejemplo: ["On a basic wage of Rs 25,000 the employee pays Rs 625 and the employer Rs 1,375."],
  faq: [
    {
      pregunta: "What counts as the basic wage?",
      respuesta: "The wage set in your contract or in the Remuneration Regulations, salary compensation included. Overtime and allowances are not part of it.",
    },
    {
      pregunta: "Why does NSF stop growing with my wage?",
      respuesta: "MRA sets a maximum wage for NSF each year. From July 2026 it is {{mu.nsf-maximum-wage}}, so the employee share never goes above {{mu.nsf-employee}} of that amount.",
    },
    {
      pregunta: "Is CSG paid on the end of year bonus?",
      respuesta: "Yes. The law treats the bonus as pay for an extra month, and both shares are worked out on it.",
    },
  ],
  glosario: [
    { termino: "CSG", definicion: "Contribution Sociale Généralisée, which funds pensions and social benefits." },
    { termino: "NSF", definicion: "National Savings Fund, which pays a lump sum on retirement." },
  ],
});
