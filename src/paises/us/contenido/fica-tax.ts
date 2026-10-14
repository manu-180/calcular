import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.fica-tax",
  h1: "FICA tax calculator",
  title: "FICA Tax Calculator 2026: Social Security and Medicare",
  description:
    "Figure the Social Security and Medicare tax on your wages for 2026, the Additional Medicare Tax and what your employer pays on top. Wage base of {{us.social-security-wage-base}}.",
  intro: [
    "FICA is the payroll tax that funds Social Security and Medicare. You pay half and your employer pays the other half.",
    "Enter your wages for the year to see each piece and the total cost on your pay.",
  ],
  comoSeCalcula: [
    "Social Security is {{us.social-security-rate}} of wages up to {{us.social-security-wage-base}} for you and the same for your employer.",
    "Medicare is {{us.medicare-rate}} of all wages for you and the same for your employer.",
    "You also pay the Additional Medicare Tax of {{us.additional-medicare-rate}} on wages above {{us.additional-medicare-threshold[single]}} if you are single, {{us.additional-medicare-threshold[mfj]}} on a joint return or {{us.additional-medicare-threshold[mfs]}} if you file separately. Employers don't match it.",
  ],
  ejemplo: ["On $75,000 of wages you pay $4,650 of Social Security and $1,087.50 of Medicare, or $5,737.50. Your employer pays the same amount again."],
  faq: [
    {
      pregunta: "What is the FICA rate for 2026?",
      respuesta: "7.65% for you and 7.65% for your employer: {{us.social-security-rate}} for Social Security and {{us.medicare-rate}} for Medicare.",
    },
    {
      pregunta: "Do 401(k) contributions lower FICA?",
      respuesta: "No. Traditional 401(k) contributions lower income tax but still pay FICA. Health premiums paid through a cafeteria plan do lower FICA.",
    },
    {
      pregunta: "I had two jobs and paid too much Social Security. Can I get it back?",
      respuesta:
        "Yes. If two or more employers together withheld Social Security on more than {{us.social-security-wage-base}}, you claim the excess as a credit on your federal return.",
    },
  ],
  glosario: [
    { termino: "Wage base", definicion: "The most wages that pay Social Security tax in a year. Medicare has no limit." },
    { termino: "Additional Medicare Tax", definicion: "An extra employee tax on high wages that funds Medicare." },
  ],
});
