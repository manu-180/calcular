import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.social-security-calculator",
  "h1": "Belize Social Security contribution {{anio}}",
  "title": "Belize Social Security contributions {{anio}}: weekly bands",
  "description": "Find the weekly and monthly Social Security Board contribution for your pay. The total rate is {{bz.ssb-total-rate}} and the weekly ceiling is {{bz.ssb-wage-ceiling}}.",
  "intro": [
    "The Social Security Board in Belize charges a total contribution of {{bz.ssb-total-rate}} on insurable earnings, shared between the employee and the employer. Insurable earnings stop at a weekly ceiling of {{bz.ssb-wage-ceiling}}.",
    "Contributions are fixed by band of weekly earnings, not as a flat percentage of each payslip. Enter your pay and the calculator finds your band and shows what you and your employer pay."
  ],
  "comoSeCalcula": [
    "Your weekly earnings fall into one of 13 bands. Each band has a weekly insurable amount and a set contribution for the employee and for the employer.",
    "The top band starts at BZ$500 a week. There the employee pays {{bz.ssb-employee-weekly[-1].cuotaFija}} and the employer pays {{bz.ssb-employer-weekly[-1].cuotaFija}} a week.",
    "The lowest band covers weekly earnings under BZ$70. The employee pays {{bz.ssb-employee-weekly[0].cuotaFija}} and the employer {{bz.ssb-employer-weekly[0].cuotaFija}}.",
    "People aged 65 or older, and people aged 60 to 64 who receive a Social Security benefit, pay no employee share. The employer pays {{bz.ssb-injury-only-weekly}} a week for employment injury cover only.",
    "A month is counted as 52 weeks divided by 12, so the monthly figures are an estimate of what is taken over a month."
  ],
  "ejemplo": [
    "An employee earns BZ$2,000 a month, which is BZ$461.54 a week. That falls in the band from BZ$460.00 to BZ$499.99, with insurable earnings of BZ$480.",
    "The employee contribution is BZ$20.86 a week, or about BZ$90.39 a month. The employer adds BZ$27.14 a week, about BZ$117.61 a month, so BZ$208.00 a month goes to the Board."
  ],
  "faq": [
    {
      "pregunta": "How much is Social Security in Belize?",
      "respuesta": "The total rate is {{bz.ssb-total-rate}} of insurable earnings, with a weekly ceiling of {{bz.ssb-wage-ceiling}}, under the Board's schedule in force since {{bz.ssb-total-rate#desde}}."
    },
    {
      "pregunta": "Who pays the contribution?",
      "respuesta": "The employer pays the whole amount to the Board and deducts the employee share from pay. Both shares are set by the weekly band."
    },
    {
      "pregunta": "When is the payment due?",
      "respuesta": "The Board states that contributions and the monthly Contribution Statement are due by the 14th day of each month for the previous month worked."
    },
    {
      "pregunta": "Who is covered?",
      "respuesta": "The Board lists employees aged 14 to 65 in insurable employment. A contribution is due for any week with eight hours or more of work."
    }
  ],
  "glosario": [
    {
      "termino": "Insurable earnings",
      "definicion": "The weekly amount on which a band is based, which is the top of the band's range up to the ceiling."
    },
    {
      "termino": "Contribution week",
      "definicion": "A week from Monday to Sunday in which a person works eight hours or more."
    }
  ]
});
