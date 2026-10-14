import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.jobseekers-benefit",
  h1: "Jobseeker's Pay-Related Benefit calculator",
  title: "Jobseeker's Benefit calculator: pay-related rates",
  description:
    "Estimate your Jobseeker's Pay-Related Benefit: {{ie.jprb-rates[weeks-1-13]}} of your earnings up to {{ie.jprb-caps[weeks-1-13]}} a week at first, with a minimum of {{ie.jprb-minimum}}.",
  intro: [
    "If you lose your job, Jobseeker's Pay-Related Benefit pays you a share of your previous earnings for up to 39 weeks, depending on your PRSI record.",
    "Enter your average weekly earnings and your PRSI contributions to see your weekly rate in each period and the total.",
  ],
  comoSeCalcula: [
    "With 260 or more contributions you get {{ie.jprb-rates[weeks-1-13]}} of your gross average earnings for the first 13 weeks (up to {{ie.jprb-caps[weeks-1-13]}}), {{ie.jprb-rates[weeks-14-26]}} for the next 13 (up to {{ie.jprb-caps[weeks-14-26]}}) and {{ie.jprb-rates[weeks-27-39]}} for the last 13 (up to {{ie.jprb-caps[weeks-27-39]}}).",
    "With 104 to 259 contributions you get {{ie.jprb-rates[short]}} for 26 weeks, up to {{ie.jprb-caps[short]}} a week.",
    "Nobody who qualifies gets less than {{ie.jprb-minimum}} a week.",
  ],
  ejemplo: ["On average earnings of €800 a week and 5 years of PRSI, you get €450 a week for 13 weeks, €375 for the next 13 and €300 for the last 13. That is €14,625 in total."],
  faq: [
    {
      pregunta: "How are my average earnings worked out?",
      respuesta:
        "The Department looks at your gross earnings in the 12 months before the 8 weeks before you lost your job, using Revenue's records. If you lost your job on 7 April 2025, it would look at 10 February 2024 to 10 February 2025.",
    },
    {
      pregunta: "What PRSI do I need to qualify?",
      respuesta:
        "At least 26 PRSI employment contributions at Class A or H in the 52 weeks before you lost your job, and at least 4 in the 10 weeks before you apply.",
    },
    {
      pregunta: "How soon should I apply?",
      respuesta: "Within 6 weeks of losing your job. Applying later could affect your entitlement.",
    },
    {
      pregunta: "Is it taxable?",
      respuesta: "Yes. The Department tells Revenue the weekly taxable amount, so the right tax is taken without you doing anything.",
    },
  ],
  glosario: [
    { termino: "Jobseeker's Pay-Related Benefit", definicion: "The payment for people who became fully unemployed from 31 March 2025, linked to their previous earnings." },
    { termino: "Class A", definicion: "The PRSI class that most employees pay. Class H contributions also count for this payment." },
  ],
});
