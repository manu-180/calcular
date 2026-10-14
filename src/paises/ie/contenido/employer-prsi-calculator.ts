import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.employer-prsi-calculator",
  h1: "Employer PRSI calculator",
  title: "Employer PRSI calculator 2026: cost of an employee",
  description: "See the employer PRSI on a salary and the total cost of an employee in Ireland, with the Class A rates of {{ie.prsi-employer-rates[lower]}} and {{ie.prsi-employer-rates[higher]}}.",
  intro: [
    "On top of the salary, an employer pays its own share of PRSI for each employee. Enter the gross pay to see that cost per week, month and year.",
    "The rate depends on weekly pay: {{ie.prsi-employer-rates[lower]}} up to {{ie.prsi-weekly-thresholds[employer-higher]}} a week and {{ie.prsi-employer-rates[higher]}} above that.",
  ],
  comoSeCalcula: [
    "Monthly or yearly pay is turned into a weekly figure, because PRSI is set by weekly pay.",
    "If weekly pay is {{ie.prsi-weekly-thresholds[employer-higher]}} or less, the employer pays {{ie.prsi-employer-rates[lower]}} on all of it. Above that, {{ie.prsi-employer-rates[higher]}} on all of it.",
    "The weekly PRSI times 52 gives the yearly cost, which is added to the salary.",
  ],
  ejemplo: ["For a salary of €50,000 in June 2026 the employer paid 11.25%, or €108.17 a week. That is €5,624.84 a year, for a total cost of €55,624.84."],
  faq: [
    {
      pregunta: "Did employer PRSI change in 2026?",
      respuesta: "Yes. From 1 October 2026 the rates are 9.15% and 11.4%, up from 9% and 11.25%. The weekly threshold of €552 stayed the same.",
    },
    {
      pregunta: "Is this the full cost of an employee?",
      respuesta: "It covers pay and employer PRSI. Pension contributions, benefits in kind, insurance and other costs come on top.",
    },
    {
      pregunta: "Does the employer pay PRSI on low weekly pay?",
      respuesta: "Yes. Even when the employee pays no PRSI (weekly pay up to €352), the employer pays the lower rate.",
    },
  ],
  glosario: [
    { termino: "Class A", definicion: "The PRSI class for most employees in the private sector and for public servants recruited from 6 April 1995." },
    { termino: "Employer PRSI", definicion: "The employer's own social insurance contribution, paid on top of the employee's pay." },
  ],
});
