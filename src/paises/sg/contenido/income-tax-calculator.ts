import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.income-tax-calculator",
  h1: "Singapore income tax calculator for residents",
  title: "Income tax calculator Singapore: resident tax rates",
  description: "Estimate your Singapore income tax as a tax resident, with the progressive rates from 0% to 24%, Earned Income Relief, CPF relief and the {{sg.tope-alivios}} relief cap.",
  intro: [
    "Singapore taxes residents at progressive rates: the first part of your chargeable income is tax-free and each band above it pays a higher rate.",
    "Enter your yearly income, your age and the reliefs you can claim to see your tax, your effective rate and your marginal rate.",
  ],
  comoSeCalcula: [
    "Start from your yearly employment income and take off your reliefs. Earned Income Relief is automatic: {{sg.alivio-ingreso-ganado[menos-55]}} below 55, {{sg.alivio-ingreso-ganado[55-59]}} from 55 to 59 and {{sg.alivio-ingreso-ganado[60-y-mas]}} from 60.",
    "Citizens and PRs also get relief for their own compulsory CPF contributions.",
    "All reliefs together are capped at {{sg.tope-alivios}} a year. What is left is your chargeable income.",
    "The first $20,000 of chargeable income is taxed at 0%, the next $10,000 at 2%, then 3.5%, 7%, 11.5%, 15%, 18%, 19%, 19.5%, 20%, 22%, 23% and 24% above $1 million.",
  ],
  ejemplo: [
    "With $72,000 of income and only Earned Income Relief, chargeable income is $71,000. Tax is $550 on the first $40,000 plus 7% of $31,000, which is $2,720 in total.",
  ],
  faq: [
    {
      pregunta: "Who counts as a tax resident?",
      respuesta:
        "Singapore Citizens and PRs who live in Singapore, and foreigners who stayed or worked in Singapore for at least 183 days in the calendar year. Foreigners who worked here for 3 consecutive years also count, even if the first or third year was shorter.",
    },
    {
      pregunta: "What is the highest income tax rate in Singapore?",
      respuesta: "From the Year of Assessment 2024, chargeable income above $1 million is taxed at 24%. Below that, the top rates are 22% and 23%.",
    },
    {
      pregunta: "Is there a limit on tax reliefs?",
      respuesta: "Yes. The total of all personal reliefs you claim in a Year of Assessment is capped at {{sg.tope-alivios}}, including SRS relief.",
    },
    {
      pregunta: "Which year's income is taxed?",
      respuesta: "Tax for a Year of Assessment is charged on the income of the year before. For example, income earned in 2025 is taxed in the Year of Assessment 2026.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Your income after deductions and personal reliefs. The tax rates apply to this amount." },
    { termino: "Year of Assessment (YA)", definicion: "The year in which your income from the previous year is assessed for tax." },
    { termino: "Earned Income Relief", definicion: "A relief for anyone with earned income, which grows with age." },
  ],
});
