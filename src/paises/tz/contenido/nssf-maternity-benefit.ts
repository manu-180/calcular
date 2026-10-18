import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.nssf-maternity-benefit",
  "h1": "NSSF maternity benefit calculator",
  "title": "NSSF maternity benefit calculator Tanzania",
  "description": "Work out the NSSF maternity cash benefit: {{tz.nssf-maternity-days}} at 100% of your average insurable daily earnings, paid in two instalments.",
  "intro": [
    "NSSF pays a maternity cash benefit to insured women who meet the contribution conditions. Enter your earnings for the six months before the 20th week of pregnancy.",
    "This is separate from the paid maternity leave your employer gives."
  ],
  "comoSeCalcula": [
    "Average insurable daily earnings (AIDE) = earnings in the six months before the 20th week of pregnancy / 180.",
    "First instalment, in the 39th week of pregnancy: AIDE × 28 days. Second instalment, after the birth: AIDE × 56 days.",
    "In total you receive {{tz.nssf-maternity-days}} of earnings."
  ],
  "ejemplo": [
    "With TSh 6 million of earnings in those six months, the benefit is TSh 2,800,000: TSh 933,333.33 first and TSh 1,866,666.67 after the birth."
  ],
  "faq": [
    {
      "pregunta": "Who qualifies?",
      "respuesta": "An insured woman with at least 36 monthly contributions, 12 of them in the 36 months before the expected week of confinement."
    },
    {
      "pregunta": "When must I claim?",
      "respuesta": "Within 84 days from the date of confinement."
    },
    {
      "pregunta": "Does NSSF also cover medical care?",
      "respuesta": "Yes. It covers treatment related to the pregnancy from the 24th week until shortly after the birth."
    }
  ],
  "glosario": [
    {
      "termino": "AIDE",
      "definicion": "Average insurable daily earnings."
    }
  ]
});
