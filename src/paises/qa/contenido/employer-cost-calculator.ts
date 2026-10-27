import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.employer-cost-calculator",
  h1: "Employer cost calculator for Qatar",
  title: "Employee cost in Qatar: salary, GRSIA and gratuity",
  description:
    "Work out what an employee costs each month in Qatar, with the {{qa.social-insurance[employer]}} GRSIA share for Qataris or the gratuity provision for expatriates.",
  intro: [
    "The cost of an employee in Qatar depends mostly on nationality.",
    "For a Qatari, the employer pays a monthly GRSIA contribution. For an expatriate, the employer owes an end-of-service gratuity, so it's worth setting money aside each month.",
  ],
  comoSeCalcula: [
    "Gross salary is the basic salary plus all allowances.",
    "For a Qatari, the employer adds {{qa.social-insurance[employer]}} of the contribution salary (basic, social allowance and housing up to {{qa.social-insurance-caps[housing-cap]}}).",
    "For an expatriate, the provision is {{qa.gratuity-weeks}} of basic salary per year, spread over 12 months, using basic × 12 ÷ 52 as the weekly salary.",
  ],
  ejemplo: [
    "An expatriate with a basic salary of QAR 10,000 and QAR 4,000 of allowances costs about QAR 14,577 a month, including QAR 576.92 for the gratuity.",
  ],
  faq: [
    {
      pregunta: "Does an employer pay social insurance for expatriates?",
      respuesta: "No. The Social Insurance Law applies to Qataris. The main extra cost for an expatriate is the end-of-service gratuity.",
    },
    {
      pregunta: "How much is the gratuity the employer owes?",
      respuesta: "At least {{qa.gratuity-weeks}} of the last basic salary for each year of service, once the worker completes a full year.",
    },
    {
      pregunta: "Are there payroll taxes for employers in Qatar?",
      respuesta: "Not on salaries. The law that issued the Income Tax Law says its rules don't apply to salaries, wages and allowances.",
    },
  ],
  glosario: [
    { termino: "Gratuity provision", definicion: "Money set aside each month to pay the end-of-service gratuity when the contract ends." },
  ],
});
