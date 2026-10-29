import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.dashain-bonus-calculator",
  h1: "Dashain allowance calculator Nepal {{anio}}",
  title: "Dashain allowance calculator Nepal {{anio}}: festival pay",
  description: "Work out the festival allowance the Labour Act, 2074 gives every worker each year: {{np.festival-allowance-months}} of basic pay, shared by months of service for new joiners.",
  intro: [
    "Every worker covered by the Labour Act receives a festival allowance once a year, usually paid around Dashain. Enter your basic pay and the months you served in the year to see the amount, which is {{np.festival-allowance-months}} of basic pay for a full year.",
    "The allowance is a legal right, separate from any profit bonus an employer may pay.",
  ],
  comoSeCalcula: [
    "Section 37 of the Act gives each worker an amount equal to {{np.festival-allowance-months}} of the basic pay they were getting. It is paid once in each financial year.",
    "A worker can ask for it in writing at the time of their main festival. Without a request, the employer pays it at Dashain.",
    "If you have not completed a year of service by the payment date, you receive the allowance in proportion to the months you served. The calculator divides your months by twelve.",
  ],
  ejemplo: ["A worker on basic pay of NPR 30,000 who served all year receives NPR 30,000. A worker who joined five months ago receives NPR 30,000 times 5 over 12, which is NPR 12,500."],
  faq: [
    {
      pregunta: "Is the Dashain bonus a legal right in Nepal?",
      respuesta: "Yes. Section 37 of the Labour Act, 2074, entitles every worker to a festival allowance equal to one month of basic pay each year.",
    },
    {
      pregunta: "Can I take it for a festival other than Dashain?",
      respuesta: "Yes. The Act lets you ask in writing for it at the time of the main festival of your own religion, culture and tradition. If you do not ask, it is paid at Dashain.",
    },
    {
      pregunta: "Do I get the full amount if I joined during the year?",
      respuesta: "No. A worker who has not served a full year by the payment date receives the allowance in proportion to the service completed.",
    },
  ],
  glosario: [
    { termino: "Festival allowance", definicion: "One month of basic pay, paid once a year around the main festival." },
    { termino: "Basic pay", definicion: "The fixed pay a worker receives before allowances." },
  ],
});
