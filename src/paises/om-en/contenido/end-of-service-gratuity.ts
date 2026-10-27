import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.end-of-service-gratuity",
  h1: "Oman end-of-service gratuity calculator",
  title: "Oman gratuity calculator under the new Labour Law",
  description:
    "Work out your end-of-service gratuity in Oman under article 61 of the new Labour Law: one month of basic wage per year, with part years in proportion.",
  intro: [
    "The Labour Law requires employers to pay workers who are not covered by the Social Protection Law a gratuity for their years of service when the job ends.",
    "Enter your last basic wage and your start and end dates to see the gratuity and the service counted.",
  ],
  comoSeCalcula: [
    "The gratuity is at least {{om.gratuity}} of the last basic wage for each year of service.",
    "Part years count in proportion: the calculator divides the days of service by 365.",
    "Days of special unpaid leave do not count towards the gratuity.",
    "Dismissal without notice in one of the cases in article 40 cancels the gratuity.",
  ],
  ejemplo: [
    "A worker with a last basic wage of OMR 400 who served from 1 January 2021 to 1 January 2026 has 1,826 days, about 5 years, so the gratuity is about OMR 2,001.",
  ],
  faq: [
    {
      pregunta: "Is the gratuity based on basic or total wage?",
      respuesta: "On the last basic wage. The law defines it as the cash pay agreed in the contract plus the periodic increment, so allowances are not included.",
    },
    {
      pregunta: "Do I get the gratuity if I resign?",
      respuesta: "Article 61 ties the gratuity to the end of the working relationship without separating resignation from other cases. Dismissal without notice in the cases listed in article 40 cancels it.",
    },
    {
      pregunta: "Do Omanis get an end-of-service gratuity?",
      respuesta: "Article 61 is for workers not covered by the Social Protection Law. Omanis in the private sector are insured with the Fund and get its benefits.",
    },
    {
      pregunta: "What happens once the savings scheme starts?",
      respuesta: "The Social Protection Fund savings scheme replaces the gratuity for non-Omanis for the period after it starts. The employer still owes the gratuity for the period before.",
    },
  ],
  glosario: [
    { termino: "Basic wage", definicion: "The cash pay agreed in the employment contract plus the periodic increment." },
    { termino: "Savings scheme", definicion: "A Social Protection Fund scheme that replaces the end-of-service gratuity for non-Omanis." },
  ],
});
