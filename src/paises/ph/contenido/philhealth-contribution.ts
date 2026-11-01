import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.philhealth-contribution",
  h1: "PhilHealth contribution calculator",
  title: "PhilHealth contribution calculator {{anio}} ({{ph.philhealth-rate}} premium)",
  description:
    "Work out your PhilHealth premium at {{ph.philhealth-rate}} of your monthly income, with the {{ph.philhealth-floor}} floor and {{ph.philhealth-ceiling}} ceiling, for employees and self-paying members.",
  intro: [
    "Enter your monthly basic salary or income to see your PhilHealth premium and who pays it.",
    "Direct contributors pay {{ph.philhealth-rate}} of their monthly income. Employees split it with their employer; self-paying members cover all of it.",
  ],
  comoSeCalcula: [
    "Your income is counted from {{ph.philhealth-floor}} up to {{ph.philhealth-ceiling}}. Below the floor the floor is used, above the ceiling the ceiling is used.",
    "The premium is {{ph.philhealth-rate}} of that amount.",
    "If you are employed, you pay {{ph.philhealth-employee-share}} of the premium and your employer pays the rest.",
  ],
  ejemplo: ["On ₱30,000 a month the premium is ₱1,500. As an employee you pay ₱750 and your employer pays ₱750."],
  faq: [
    {
      pregunta: "What is the minimum PhilHealth contribution?",
      respuesta: "₱500 a month, which is {{ph.philhealth-rate}} of the {{ph.philhealth-floor}} income floor. An employee pays half of it.",
    },
    {
      pregunta: "What is the maximum PhilHealth contribution?",
      respuesta: "₱5,000 a month, reached at an income of {{ph.philhealth-ceiling}}. Earning more does not raise the premium.",
    },
    {
      pregunta: "Can I pay quarterly or yearly?",
      respuesta: "Yes. Self-paying members can pay monthly, quarterly, semi-annually or annually through accredited collecting agents, in the Philippines and abroad.",
    },
    {
      pregunta: "Who pays for a kasambahay?",
      respuesta: "The household employer pays the whole premium. If the kasambahay earns ₱5,000 a month or more, they pay their share.",
    },
  ],
  glosario: [
    { termino: "Direct contributor", definicion: "A member who pays premiums, such as employees, self-earning individuals, professionals, kasambahays and OFWs." },
    { termino: "Income floor and ceiling", definicion: "The lowest and highest monthly income PhilHealth uses to compute the premium." },
  ],
});
