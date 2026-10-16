import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.sss-contribution",
  h1: "SSS contribution calculator",
  title: "SSS contribution calculator 2026: employee and employer share",
  description:
    "Find your SSS monthly salary credit and contribution with the schedule in force since January 2025: your share, the employer share, EC and MPF.",
  intro: [
    "Enter your monthly compensation and see the SSS contribution for you and your employer, using the schedule of SSS Circular No. 2024-006.",
    "Since January 2025 the total rate is 15% of your monthly salary credit: {{ph.sss-employee-rate}} from you and {{ph.sss-employer-rate}} from your employer.",
  ],
  comoSeCalcula: [
    "Your compensation is matched to a monthly salary credit (MSC). Credits go up in steps of ₱500, from {{ph.sss-msc-minimum}} to {{ph.sss-msc-maximum}}.",
    "You pay {{ph.sss-employee-rate}} of the credit and your employer pays {{ph.sss-employer-rate}}.",
    "Your employer also pays the Employees' Compensation (EC) contribution: {{ph.sss-ec[below-15000]}} below a credit of ₱15,000 and {{ph.sss-ec[from-15000]}} from there up.",
    "The part of the credit above {{ph.sss-regular-msc-maximum}} goes to the Mandatory Provident Fund (MPF), your own savings account inside SSS.",
  ],
  ejemplo: ["On ₱25,000 a month the salary credit is ₱25,000. You pay ₱1,250 and your employer pays ₱2,530, including ₱30 of EC."],
  faq: [
    {
      pregunta: "How much is the SSS contribution in 2026?",
      respuesta: "15% of your monthly salary credit, the rate in force since January 2025. You pay {{ph.sss-employee-rate}} and your employer pays {{ph.sss-employer-rate}}, plus EC.",
    },
    {
      pregunta: "What is the maximum SSS contribution?",
      respuesta: "With compensation of ₱34,750 or more the salary credit is {{ph.sss-msc-maximum}}. You pay ₱1,750 and your employer ₱3,530, for a total of ₱5,280 a month.",
    },
    {
      pregunta: "Are benefits based on my full salary credit?",
      respuesta:
        "Regular SS and EC benefits use a salary credit of up to {{ph.sss-regular-msc-maximum}}. Contributions above it build your MPF account, which pays the accumulated value plus investment income.",
    },
  ],
  glosario: [
    { termino: "Monthly salary credit (MSC)", definicion: "The compensation base SSS uses for contributions and benefits, set by the bracket your pay falls in." },
    { termino: "EC", definicion: "Employees' Compensation, a contribution to the Employees' Compensation Program that only the employer pays." },
    { termino: "MPF", definicion: "Mandatory Provident Fund, also called MySSS Pension Booster." },
  ],
});
