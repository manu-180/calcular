import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.vacaciones",
  h1: "Calculadora de vacaciones",
  title: "Vacaciones en Colombia: calcula días y valor en 2026",
  description:
    "Calcula cuántos días de vacaciones llevas y cuánto valen. Por ley son {{co.vacaciones-dias}} hábiles por año trabajado, en proporción si es menos tiempo.",
  intro: [
    "Por cada año trabajado tienes derecho a {{co.vacaciones-dias}} hábiles de vacaciones pagadas.",
    "Si te retiras sin haberlas tomado, te las pagan en dinero, en proporción al tiempo trabajado (Ley 995 de 2005).",
  ],
  comoSeCalcula: [
    "Días de vacaciones: días trabajados por {{co.vacaciones-dias}}, dividido por 360.",
    "Valor: tu salario mensual dividido por 30, por los días de vacaciones.",
    "El auxilio de transporte no entra en el cálculo de las vacaciones.",
  ],
  ejemplo: ["Con un salario de $2.400.000 y 180 días trabajados, llevas 7,5 días de vacaciones que valen $600.000."],
  faq: [
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
