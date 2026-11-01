import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.auxilio-de-transporte",
  h1: "Auxilio de transporte {{anio}} en Colombia",
  title: "Auxilio de transporte {{anio}} en Colombia: {{co.auxilio-transporte}}",
  description:
    "El auxilio de transporte {{anio}} es {{co.auxilio-transporte}} al mes si ganas hasta {{co.auxilio-tope}}. Mira si te toca y calcula cuánto te pagan por los días trabajados.",
  intro: [
    "El auxilio de transporte es de {{co.auxilio-transporte}} al mes y lo recibe quien gana hasta {{co.auxilio-tope}}. Lo fija el Decreto 1470 de 2025 y se paga en proporción a los días trabajados.",
    "Escribe tu salario y los días del mes. Te decimos si te corresponde y cuánto es.",
  ],
  comoSeCalcula: [
    "Si tu salario es de {{co.auxilio-tope}} o menos, te corresponde. El salario mínimo hoy es {{co.smmlv}}.",
    "Se paga en proporción a los días trabajados: {{co.auxilio-transporte}} dividido por 30, por los días del mes.",
  ],
  ejemplo: ["Si ganas el mínimo y trabajaste 20 días del mes, te pagan dos tercios del auxilio de transporte."],
  faq: [
    {
      pregunta: "¿Hasta qué salario se paga el auxilio de transporte?",
      respuesta: "Hasta {{co.auxilio-tope}}. En 2026 son $3.501.810 al mes.",
    },
    {
      pregunta: "¿El auxilio de transporte es salario?",
      respuesta: "No es salario, pero se suma al salario para calcular las cesantías, sus intereses y la prima (Ley 1 de 1963, artículo 7).",
    },
    {
      pregunta: "¿Le descuentan salud y pensión al auxilio?",
      respuesta: "No. Los aportes a salud y pensión se calculan solo sobre el salario.",
    },
    {
      pregunta: "¿Qué pasa si gano un poco más del tope?",
      respuesta: "Ya no te corresponde. El tope es {{co.auxilio-tope}} y se mira tu salario del mes.",
    },
  ],
  glosario: [
    { termino: "Auxilio de transporte", definicion: "Pago mensual para ayudar con el costo de ir al trabajo, a cargo de la empresa." },
    { termino: "SMMLV", definicion: "Salario mínimo mensual legal vigente: hoy {{co.smmlv}}." },
  ],
});
