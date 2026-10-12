import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.gastos-de-representacion",
  h1: "Calculadora de impuesto sobre gastos de representación en Panamá",
  title: "Gastos de representación en Panamá: calcula la retención",
  description:
    "Los gastos de representación en Panamá pagan su propio impuesto sobre la renta: 10% hasta B/. 25,000 al año y 15% sobre el resto. Calcula la retención.",
  intro: [
    "Los gastos de representación son un pago aparte del salario que reciben gerentes y otros cargos. Pagan impuesto sobre la renta con su propia tarifa y no se suman al salario.",
    "Escribe el monto mensual o anual y te mostramos el impuesto del año, la retención de cada mes y lo que recibes.",
  ],
  comoSeCalcula: [
    "Se pasa el monto a anual.",
    "Hasta B/. 25,000 al año se paga el 10%.",
    "Por encima de B/. 25,000 se pagan B/. 2,500 más el 15% del excedente.",
    "La retención mensual es el impuesto anual dividido entre 12.",
  ],
  ejemplo: ["Con B/. 2,000 al mes (B/. 24,000 al año), el impuesto es B/. 2,400 al año: B/. 200 de retención por mes."],
  faq: [
    {
      pregunta: "¿Cuánto impuesto pagan los gastos de representación en Panamá?",
      respuesta: "10% hasta B/. 25,000 al año. Por encima, B/. 2,500 más el 15% de lo que pase de B/. 25,000.",
    },
    {
      pregunta: "¿Se suman a mi salario para el impuesto sobre la renta?",
      respuesta: "No. Tienen su propia tarifa y no se acumulan con el salario.",
    },
    {
      pregunta: "¿Puedo hacer la declaración de renta?",
      respuesta: "Sí. Si además tienes salario, puedes declarar para aplicar tus deducciones y los aportes a fondos de pensiones.",
    },
  ],
  glosario: [
    { termino: "Gastos de representación", definicion: "Pago adicional al salario para cubrir la representación de la empresa." },
    { termino: "Retención", definicion: "El impuesto que el empleador descuenta y paga por ti cada mes." },
  ],
});
