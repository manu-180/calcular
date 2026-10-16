import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.retirement-pay",
  h1: "Retirement pay calculator (RA 7641)",
  title: "Retirement pay calculator Philippines (RA 7641)",
  description:
    "Work out the minimum retirement pay under RA 7641 for private employees with no company plan: 15 days, 1/12 of the 13th month and 5 leave days a year.",
  intro: [
    "If your company has no retirement plan, the Labor Code as amended by Republic Act No. 7641 sets a minimum retirement pay.",
    "You qualify from {{ph.retirement-minimum-age}} of age with at least {{ph.retirement-minimum-service}} in the company. Retirement is compulsory at {{ph.retirement-compulsory-age}} of age.",
  ],
  comoSeCalcula: [
    "For every year of service you get one-half month salary. A fraction of 6 months or more counts as a full year.",
    "The law defines one-half month salary as {{ph.retirement-days}} of pay, plus one-twelfth of your 13th month pay, plus the cash value of {{ph.retirement-sil-days}} of service incentive leave.",
    "The total is that amount times your years of service.",
  ],
  ejemplo: [
    "With a daily rate of ₱1,000, a 13th month pay of ₱26,000 and 20 years of service, one-half month salary is ₱22,166.67 and the retirement pay is ₱443,333.40.",
  ],
  faq: [
    {
      pregunta: "Is one-half month salary just 15 days?",
      respuesta:
        "No. The law adds one-twelfth of your 13th month pay and the cash value of up to {{ph.retirement-sil-days}} of service incentive leave to the {{ph.retirement-days}}, unless your employer gives broader inclusions.",
    },
    {
      pregunta: "Who is not covered?",
      respuesta:
        "Retail, service and agricultural establishments or operations employing not more than {{ph.retirement-exempt-employees}} workers. If your company has a retirement plan or agreement, it applies instead, as long as it is not lower.",
    },
    {
      pregunta: "Can a company plan pay less?",
      respuesta: "No. Retirement benefits under a collective bargaining agreement or other agreement cannot be lower than the ones set by this law.",
    },
  ],
  glosario: [
    { termino: "RA 7641", definicion: "Republic Act No. 7641, approved in 1992, which amended Article 287 of the Labor Code on retirement." },
    { termino: "Service incentive leave", definicion: "A leave benefit under the Labor Code. The retirement formula adds the cash value of up to 5 days of it." },
  ],
});
