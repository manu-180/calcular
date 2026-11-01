import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.severance-pay-calculator",
  "h1": "Severance pay calculator Belize {{anio}}",
  "title": "Belize severance pay {{anio}}: weeks per year of service",
  "description": "Work out severance pay in Belize. It starts after {{bz.severance-min-years}} years of service: {{bz.severance-weeks-mid}} week per year, then {{bz.severance-weeks-long}} weeks per year after {{bz.severance-long-years}}.",
  "intro": [
    "Severance pay in Belize starts after {{bz.severance-min-years}} years of continuous service. From {{bz.severance-min-years}} to {{bz.severance-long-years}} years it is {{bz.severance-weeks-mid}} week of wages for each complete year, and above {{bz.severance-long-years}} years it is {{bz.severance-weeks-long}} weeks for each complete year.",
    "Enter your monthly pay, your start date, your last day and the reason the job ended. The calculator counts complete years and gives the amount."
  ],
  "comoSeCalcula": [
    "Section 183 of the Labour Act applies when the employer ends the job for reasons that do not amount to dismissal, when a worker retires at 60 or older or on medical grounds, and, after ten years, when a fixed-term contract ends.",
    "After at least ten years, a worker who resigns is eligible for a gratuity equal to the severance pay.",
    "For a worker with more than ten years, service before 1 May 2011 is paid at one week for each complete year and service after that date at two weeks.",
    "The weekly wage is basic wages for the 12 months before the end of the job, divided by 52."
  ],
  "ejemplo": [
    "An employee on BZ$2,000 a month started on 2 February 2015 and the employer ends the job on 29 October 2026. That is 11 complete years at 2 weeks each, or 22 weeks.",
    "One week is BZ$461.54, so the severance pay is BZ$10,153.85."
  ],
  "faq": [
    {
      "pregunta": "When is severance pay due in Belize?",
      "respuesta": "After {{bz.severance-min-years}} years of continuous service when the employer ends the job without a dismissal for cause, or on retirement at 60 or older or on medical grounds."
    },
    {
      "pregunta": "How much is it?",
      "respuesta": "{{bz.severance-weeks-mid}} week of wages per complete year up to {{bz.severance-long-years}} years, and {{bz.severance-weeks-long}} weeks per complete year above that."
    },
    {
      "pregunta": "Do I get severance if I resign?",
      "respuesta": "Only after at least ten years of continuous service, as a gratuity equal to severance pay."
    },
    {
      "pregunta": "Does accepting severance end my continuous service?",
      "respuesta": "Yes. Section 184 says accepting severance pay ends the continuous period of employment."
    }
  ],
  "glosario": [
    {
      "termino": "Continuous employment",
      "definicion": "Service with the same employer that has not been broken, counting leave, lay-offs of up to six months and strikes."
    },
    {
      "termino": "Gratuity",
      "definicion": "A payment on resigning after ten years, equal to severance pay."
    }
  ]
});
