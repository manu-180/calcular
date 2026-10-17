import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.bonus-tax",
  h1: "Bonus tax calculator",
  title: "Bonus Tax Calculator 2026: what you keep after withholding",
  description:
    "See how much of your bonus you take home after the {{us.supplemental-rate}} federal withholding, Social Security and Medicare. Uses the IRS supplemental wage rules for 2026.",
  intro: [
    "Bonuses feel taxed harder because employers usually withhold a flat {{us.supplemental-rate}} of federal income tax, plus Social Security and Medicare.",
    "Enter your bonus to see each piece and what reaches your account.",
  ],
  comoSeCalcula: [
    "Federal income tax: {{us.supplemental-rate}} of the bonus. Once your supplemental pay for the year passes {{us.supplemental-threshold}}, the part above it is withheld at {{us.supplemental-rate-over-1m}}.",
    "Social Security: {{us.social-security-rate}} of the bonus, but only until your wages for the year reach {{us.social-security-wage-base}}.",
    "Medicare: {{us.medicare-rate}} of the bonus, plus {{us.additional-medicare-rate}} on the part of your yearly wages above {{us.additional-medicare-withholding}}.",
  ],
  ejemplo: ["On a $5,000 bonus, $1,100 goes to federal income tax, $310 to Social Security and $72.50 to Medicare. You keep $3,517.50 before state tax."],
  faq: [
    {
      pregunta: "Are bonuses taxed more than regular pay?",
      respuesta:
        "No. The withholding method is different, but at tax time a bonus is just more wages. If {{us.supplemental-rate}} is more than your real rate, the extra comes back in your refund.",
    },
    {
      pregunta: "Can my employer use a different method?",
      respuesta: "Yes. If the bonus is paid together with regular wages, the employer can add both and withhold as if it were one larger paycheck. That often withholds more.",
    },
    {
      pregunta: "Can I put my bonus in my 401(k) to save tax?",
      respuesta: "Often yes, if your plan allows deferrals from bonuses. Money sent to a traditional 401(k) skips federal income tax withholding but still pays Social Security and Medicare.",
    },
  ],
  glosario: [
    { termino: "Supplemental wages", definicion: "Pay outside your regular salary, such as bonuses, commissions and severance." },
    { termino: "Flat rate method", definicion: "Withholding a fixed percentage of supplemental wages instead of using the tax tables." },
  ],
});
