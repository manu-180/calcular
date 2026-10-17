import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.retrenchment-benefit",
  h1: "Retrenchment benefit calculator for Singapore",
  title: "Retrenchment benefit Singapore: estimate your payout",
  description: "Estimate your retrenchment benefit in Singapore with the prevailing norm of 2 weeks to 1 month of salary per year of service. No law fixes the amount.",
  intro: [
    "Retrenchment benefit is paid to compensate employees who lose their job because of retrenchment. No law fixes the amount.",
    "It depends on your employment contract or collective agreement. If neither says anything, it is negotiated with your employer. This calculator shows the range of the prevailing norm.",
  ],
  comoSeCalcula: [
    "You need at least {{sg.retrenchment-norma[anios-minimos]}} years of service with the company to be eligible.",
    "The prevailing norm is between 2 weeks and 1 month of salary per year of service, depending on the company's finances and the industry.",
    "The lower end uses a weekly salary of 12 monthly salaries divided by 52 weeks, times 2, for each year of service.",
    "The upper end is 1 monthly salary for each year of service.",
  ],
  ejemplo: ["With $5,000 a month and 6 years of service, the norm gives between $13,846.20 and $30,000."],
  faq: [
    {
      pregunta: "Is retrenchment benefit compulsory?",
      respuesta: "There is no fixed amount in law. It comes from your contract or collective agreement, or from negotiation with your employer, following the prevailing norm.",
    },
    {
      pregunta: "I worked less than 2 years. Do I get anything?",
      respuesta: "You are not eligible for retrenchment benefit, but your employer may pay an ex-gratia amount out of goodwill.",
    },
    {
      pregunta: "Is CPF deducted from retrenchment benefit?",
      respuesta: "No. Neither the employee nor the employer pays CPF on retrenchment benefit.",
    },
  ],
  glosario: [
    { termino: "Retrenchment", definicion: "Ending employment because the job is no longer needed, not because of the employee's conduct." },
    { termino: "Ex-gratia payment", definicion: "A goodwill payment the employer chooses to make without being required to." },
  ],
});
