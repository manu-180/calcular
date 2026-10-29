import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.spf-contribution-calculator",
  h1: "Seychelles Pension Fund contribution calculator {{anio}}",
  title: "SPF contributions {{anio}}: employee, employer, self-employed",
  description: "Find the monthly Seychelles Pension Fund contribution: employee {{sc.spf-employee-rate}}, employer {{sc.spf-employer-rate}} and self-employed {{sc.spf-self-employed-rate}}.",
  intro: [
    "The Seychelles Pension Fund (SPF) collects a mandatory pension contribution every month. Choose whether you are an employee or self-employed and enter the gross pay to see who pays what.",
    "The rates below have applied since {{sc.spf-employee-rate#desde}}, when the SPF raised the employee and self-employed shares.",
  ],
  comoSeCalcula: [
    "An employee pays {{sc.spf-employee-rate}} of gross pay, deducted by the employer from the salary.",
    "The employer pays a further {{sc.spf-employer-rate}} of the same pay out of its own pocket.",
    "A self-employed worker pays {{sc.spf-self-employed-rate}} of the gross income declared to the SPF.",
  ],
  ejemplo: [
    "An employee earning SCR 25,000 a month has SCR 1,250 deducted. The employer adds SCR 1,250, so SCR 2,500 reaches the fund. A self-employed person who declares SCR 20,000 pays SCR 2,000.",
  ],
  faq: [
    {
      pregunta: "When did the employee rate go up?",
      respuesta: "The SPF notice of 8 December 2022 raised the employee rate from 4 % to 5 % from 1 January 2023. The employer rate stayed at 5 % and the self-employed rate rose from 9 % to 10 %.",
    },
    {
      pregunta: "What if I keep contributing from abroad?",
      respuesta: "The SPF FAQ says that a member who continues from abroad pays both the employee and the employer share, which is 10 % a month at the current rates.",
    },
    {
      pregunta: "Is there a minimum for the self-employed?",
      respuesta: "The SPF page on self-employed workers states a mandatory contribution of 10 % of declared gross pay or a minimum monthly amount. Check that page for the minimum in force before you pay.",
    },
  ],
  glosario: [
    { termino: "SPF", definicion: "The Seychelles Pension Fund, the body that runs the mandatory contributory pension." },
    { termino: "Declared gross pay", definicion: "The income a self-employed person reports to the SPF as the base for the contribution." },
    { termino: "Employer share", definicion: "The part of the contribution the employer pays on top of the salary." },
  ],
});
