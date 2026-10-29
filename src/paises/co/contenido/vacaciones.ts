import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.vacaciones",
  h1: "Calculadora de vacaciones en Colombia {{anio}}",
  title: "Calculadora de vacaciones {{anio}} en Colombia: días y valor",
  description:
    "Calcula cuántos días de vacaciones llevas y cuánto te pagan por ellas: {{co.vacaciones-dias}} hábiles por año trabajado, en proporción si es menos. Ideal para liquidarlas.",
  intro: [
    "Por cada año trabajado tienes {{co.vacaciones-dias}} hábiles de vacaciones pagadas, y en proporción si llevas menos tiempo. Cada día vale tu salario mensual dividido por 30.",
    "Si te retiras sin haberlas tomado, te las pagan en dinero en la liquidación (Ley 995 de 2005).",
  ],
  comoSeCalcula: [
    "Días de vacaciones: días trabajados por {{co.vacaciones-dias}}, dividido por 360.",
    "Valor: tu salario mensual dividido por 30, por los días de vacaciones.",
    "El auxilio de transporte no entra en el cálculo de las vacaciones.",
  ],
  ejemplo: [
    "Con un salario de $2.400.000 y 180 días trabajados, llevas 7,5 días de vacaciones que valen $600.000.",
    "Con el salario mínimo de 2026 y un año completo, son {{co.vacaciones-dias}} que valen $875.453.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan por año?",
      respuesta: "{{co.vacaciones-dias}} hábiles por cada año trabajado. Si llevas menos de un año, te toca la parte proporcional a los días trabajados.",
    },
    {
      pregunta: "¿Puedo pedir que me paguen las vacaciones en dinero?",
      respuesta: "Puedes acordar por escrito con la empresa que te pague en dinero hasta la mitad. La otra mitad la tienes que disfrutar (artículo 189 del Código Sustantivo del Trabajo).",
    },
    {
      pregunta: "¿Con qué salario se pagan las vacaciones en dinero?",
      respuesta: "Con el último salario que recibiste.",
    },
    {
      pregunta: "¿Los domingos y festivos cuentan como días de vacaciones?",
      respuesta: "No. Las vacaciones son días hábiles, así que los domingos y festivos no se descuentan de tus días.",
    },
  ],
  glosario: [
    { termino: "Días hábiles", definicion: "Los días que se trabajan normalmente. No incluyen domingos ni festivos." },
    { termino: "Compensación en dinero", definicion: "Pago de las vacaciones que no tomaste, cuando se termina el contrato o por acuerdo escrito." },
  ],
});
