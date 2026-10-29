import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.take-home-pay-calculator",
  h1: "Take-home pay calculator Antigua and Barbuda {{anio}}",
  title: "Take-home pay calculator {{anio}}: gross to net",
  description: "Work out your net monthly pay in Antigua and Barbuda after Social Security, Medical Benefits and the Education Levy.",
  intro: [
    "Enter your gross monthly pay to see what reaches your bank account. The calculator takes off Social Security, Medical Benefits and the Education Levy.",
    "There is no income tax to deduct from wages, so the deductions are contributions.",
  ],
  comoSeCalcula: [
    "Social Security is worked out on pay up to {{ag.ss-ceiling-monthly}} a month.",
    "Medical Benefits is {{ag.mbs-employee-rate}} of pay for employees under 60.",
    "The Education Levy is applied to annual income in bands, then divided by 12.",
  ],
  ejemplo: ["On EC$4,000 a month in the private sector, Social Security is EC$280 and Medical Benefits is EC$140."],
  faq: [
    { pregunta: "Is there income tax on wages?", respuesta: "The Personal Income Tax (Amendment) Act, 2016 sets allowances only up to income year 2016." },
    { pregunta: "What is the Social Security rate?", respuesta: "{{ag.ss-employee-rate[private]}} for private sector employees." },
    { pregunta: "What is the Medical Benefits rate?", respuesta: "{{ag.mbs-employee-rate}} for employees aged 16 to 59." },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "Pay before deductions." },
    { termino: "Take-home pay", definicion: "Pay after deductions." },
  ],
});
