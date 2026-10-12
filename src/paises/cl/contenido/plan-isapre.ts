import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.plan-isapre",
  h1: "Calculadora de plan de Isapre en pesos",
  title: "Plan de Isapre en pesos: cuánto te descuentan de salud",
  description: "Pasa tu plan de Isapre de UF a pesos y compáralo con la cotización legal de {{cl.salud}}. Te mostramos el descuento real y lo que pagas por sobre el mínimo.",
  intro: [
    "Los planes de Isapre se pactan en UF, así que su precio en pesos cambia cada mes. De tu sueldo se descuenta el mayor entre el precio del plan y la cotización legal de {{cl.salud}}.",
    "Escribe el precio de tu plan y tu sueldo imponible para ver cuánto te descuentan y cuánto pagas por sobre lo legal.",
  ],
  comoSeCalcula: [
    "El precio del plan en UF se multiplica por la UF del día.",
    "La cotización legal es el {{cl.salud}} de tu sueldo imponible, con tope de {{cl.tope-imponible}}.",
    "Se descuenta el mayor de los dos. Si el plan cuesta más, pagas la diferencia; si cuesta menos, la diferencia queda como excedente.",
  ],
  ejemplo: ["Un plan de 5 UF son $205.573 con la UF del 7 de octubre de 2026. Con un sueldo de $2.000.000 la cotización legal es $140.000, así que pagas $65.573 por sobre lo legal."],
  faq: [
    {
      pregunta: "¿Cuánto es el 7 % de salud?",
      respuesta: "Es el {{cl.salud}} de tu sueldo imponible, con tope de {{cl.tope-imponible}}. En Fonasa es lo único que pagas; en Isapre es el mínimo.",
    },
    {
      pregunta: "¿Lo que pago por sobre el 7 % rebaja impuesto?",
      respuesta: "No. Para el impuesto único solo se descuenta la cotización legal. La parte adicional del plan no rebaja tu impuesto.",
    },
    {
      pregunta: "¿Qué son los excedentes?",
      respuesta: "Si tu cotización legal es mayor que el precio de tu plan, la diferencia queda en una cuenta a tu nombre en la Isapre y la puedes usar en gastos de salud.",
    },
  ],
  glosario: [
    { termino: "Isapre", definicion: "Institución de salud previsional privada. Ofrece planes pactados en UF." },
    { termino: "Cotización legal de salud", definicion: "El porcentaje mínimo de tu sueldo que va a salud, en Fonasa o en Isapre." },
  ],
});
