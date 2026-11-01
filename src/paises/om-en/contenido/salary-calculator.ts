import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.salary-calculator",
  h1: "Oman salary calculator",
  title: "Oman take-home pay after Social Protection Fund",
  description:
    "Work out your monthly take-home pay in Oman from your basic wage and allowances after Social Protection Fund contributions, for Omanis and expats.",
  intro: [
    "Take-home pay is what reaches your bank account after your share of Social Protection Fund contributions comes off your total wage.",
    "Enter your basic wage and allowances and choose your nationality to see the deduction and your net pay per month and per year.",
  ],
  comoSeCalcula: [
    "The total wage is the basic wage plus all allowances, and contributions are worked out on it.",
    "Omani workers pay {{om.spf-old-age[employee]}} to the old age, disability and death branch, on a wage of up to {{om.spf-cap}} a month.",
    "They also pay {{om.spf-job-security[employee]}} to the job security branch on the whole wage, with no cap.",
    "Non-Omani workers have no contribution taken from their wage, so their take-home pay equals their total wage.",
  ],
  ejemplo: [
    "An Omani employee with a basic wage of OMR 600 and allowances of OMR 200 earns OMR 800. OMR 60 goes to the old age branch and OMR 4 to job security, so OMR 736 reaches the account.",
  ],
  faq: [
    {
      pregunta: "How much is deducted from an Omani salary in the private sector?",
      respuesta: "{{om.spf-old-age[employee]}} for old age, disability and death plus {{om.spf-job-security[employee]}} for job security, on the basic wage plus allowances. The old age branch has a wage cap of {{om.spf-cap}} a month.",
    },
    {
      pregunta: "Is anything deducted from an expat's salary?",
      respuesta: "No. The contribution branches paid by the insured person apply to Omanis today. Expats are owed an end-of-service gratuity by the employer under the Labour Law.",
    },
    {
      pregunta: "Do housing and transport allowances count?",
      respuesta: "Yes. The Social Protection Law defines the wage as the total salary or basic wage plus all allowances, so contributions are worked out on the full amount.",
    },
  ],
  glosario: [
    { termino: "Total wage", definicion: "The basic wage plus all allowances." },
    { termino: "Contribution wage", definicion: "The wage up to the cap set for each insurance branch." },
  ],
});
