import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.descuento-de-pensionados",
  h1: "Calculadora del descuento de Seguro Social a pensionados en Panamá",
  title: "Descuento a jubilados en Panamá: tu pensión neta",
  description:
    "A los jubilados y pensionados en Panamá se les descuenta el {{pa.css-pensionados}} de la pensión para la Caja de Seguro Social. Calcula tu pensión neta.",
  intro: [
    "Los pensionados por invalidez, vejez y muerte y los de riesgos profesionales pagan una cuota del {{pa.css-pensionados}} de su pensión a la Caja de Seguro Social.",
    "Escribe tu pensión mensual y te mostramos el descuento y lo que recibes.",
  ],
  comoSeCalcula: ["Cuota: {{pa.css-pensionados}} de la pensión mensual.", "Pensión neta: la pensión menos la cuota."],
  ejemplo: ["Con una pensión de B/. 800, el descuento es B/. 54 y recibes B/. 746."],
  faq: [
    {
      pregunta: "¿Cuánto le descuentan a un jubilado en Panamá?",
      respuesta: "El {{pa.css-pensionados}} de su pensión, para la Caja de Seguro Social.",
    },
    {
      pregunta: "¿Para qué es ese descuento?",
      respuesta: "Es uno de los ingresos con los que la Caja de Seguro Social financia sus prestaciones. Lo fija la Ley 51 de 2005, reformada en 2025.",
    },
    {
      pregunta: "¿Hay otros descuentos?",
      respuesta: "Pueden existir descuentos voluntarios o judiciales, como préstamos o pensión alimenticia. Revisa tu talonario de la Caja.",
    },
  ],
  glosario: [
    { termino: "Pensionado", definicion: "Quien recibe una pensión de la Caja de Seguro Social." },
    { termino: "Pensión neta", definicion: "Lo que recibes después de los descuentos." },
  ],
});
