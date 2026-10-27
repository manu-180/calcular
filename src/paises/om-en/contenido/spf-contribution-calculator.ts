import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.spf-contribution-calculator",
  h1: "Social Protection Fund contribution calculator",
  title: "Oman Social Protection Fund contributions by wage",
  description:
    "Work out monthly Social Protection Fund contributions in Oman: the employee and employer share for each branch, with the contribution wage cap.",
  intro: [
    "The Social Protection Law brings social insurance together in one fund with several branches, each with its own contribution rate.",
    "Enter the total monthly wage and choose the nationality to see what comes off the employee's pay and what the employer pays.",
  ],
  comoSeCalcula: [
    "Old age, disability and death: {{om.spf-old-age[employee]}} from the employee and {{om.spf-old-age[employer]}} from the employer, on a wage of up to {{om.spf-cap}} a month.",
    "Work injuries and occupational diseases: {{om.spf-injury}} from the employer, with the same cap.",
    "Job security: {{om.spf-job-security[employee]}} from the employee and {{om.spf-job-security[employer]}} from the employer, on the whole wage.",
    "Maternity leave {{om.spf-maternity}} and sick and non-ordinary leave {{om.spf-sick}}, both paid by the employer.",
  ],
  ejemplo: [
    "For an Omani earning OMR 800 in total, OMR 64 comes off the wage and the employer pays OMR 116, so contributions add up to OMR 180 a month.",
  ],
  faq: [
    {
      pregunta: "What is the contribution wage cap?",
      respuesta: "{{om.spf-cap}} a month for the old age, disability and death branch and the work injury branch. Pay above the cap carries no contribution to those two branches.",
    },
    {
      pregunta: "When did the sick leave contribution start?",
      respuesta: "The sick and non-ordinary leave chapter came into force three years after the law was issued on 19 July 2023, that is, from {{om.spf-sick#desde}}.",
    },
    {
      pregunta: "Do expat workers pay into the Fund?",
      respuesta: "The contribution branches do not apply to them today. The work injury branch covers non-Omanis five years after the law was issued, and the maternity and sick leave branches cover the groups the Fund's board decides.",
    },
  ],
  glosario: [
    { termino: "Insured person", definicion: "Anyone covered by the social insurance branches, by law or by choice." },
    { termino: "Employer", definicion: "The party that pays its own share of contributions and takes the insured person's share from the wage." },
  ],
});
