import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.quinquenio",
  h1: "Calculadora de quinquenio en Bolivia",
  title: "Quinquenio Bolivia {{anio}}: calcule cuánto puede cobrar",
  description: "Calcule su quinquenio: un sueldo por año, consolidado cada {{bo.quinquenio-anios}} de trabajo continuo, con el promedio de los 3 meses anteriores a la solicitud.",
  intro: [
    "El quinquenio en Bolivia es la indemnización de cada {{bo.quinquenio-anios}} de trabajo continuo, cobrada por adelantado: un sueldo promedio por cada año. Se paga a pedido suyo, por escrito.",
    "Escriba su sueldo promedio, su fecha de ingreso y la fecha en que pide el pago.",
  ],
  comoSeCalcula: [
    "Por cada {{bo.quinquenio-anios}} cumplidos se consolida un quinquenio.",
    "Cada quinquenio vale un sueldo por año: el promedio del total ganado de los 3 meses anteriores a la solicitud, por la cantidad de años del quinquenio.",
    "A los quinquenios consolidados se les restan los que ya cobró.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el quinquenio?",
      respuesta: "Se toma el promedio del total ganado de los 3 meses anteriores a su pedido y se multiplica por los años del quinquenio. A eso se le restan los quinquenios que ya cobró.",
    },
    {
      pregunta: "¿Cuándo me tienen que pagar el quinquenio?",
      respuesta: "En 30 días calendario desde su pedido por escrito, en un solo pago. Si el empleador no cumple, paga el monto actualizado por UFV y una multa del 30 % a su favor.",
    },
    {
      pregunta: "¿Si cobro el quinquenio pierdo la indemnización?",
      respuesta: "No la pierde: el quinquenio es esa misma indemnización pagada por adelantado. Al terminar el trabajo, los años ya pagados no se vuelven a indemnizar.",
    },
    {
      pregunta: "¿Si me despiden con causa pierdo los quinquenios?",
      respuesta: "No. Los quinquenios ya consolidados son derechos adquiridos. Solo se afecta el quinquenio que está en curso.",
    },
  ],
  glosario: [
    { termino: "Quinquenio", definicion: "Período de {{bo.quinquenio-anios}} de trabajo continuo con el mismo empleador." },
    { termino: "Consolidar", definicion: "Completar el período: desde ese día el quinquenio es un derecho adquirido." },
  ],
});
