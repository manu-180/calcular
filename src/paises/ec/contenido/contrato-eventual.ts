import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.contrato-eventual",
  h1: "Calculadora de contrato eventual y ocasional en Ecuador",
  title: "Contrato eventual Ecuador: el {{ec.recargo-eventual}} extra por hora",
  description: "En un contrato eventual u ocasional la hora se paga con un {{ec.recargo-eventual}} más sobre el básico de tu sector. Calcula tu hora y lo que te toca cobrar.",
  intro: [
    "Los contratos eventuales y ocasionales pagan un incremento del {{ec.recargo-eventual}} sobre el valor de la hora del salario básico de tu sector.",
    "Pon el básico de tu sector (o déjalo vacío para usar el salario básico unificado) y las horas trabajadas.",
  ],
  comoSeCalcula: [
    "La hora del básico es el básico dividido para 30 días y para {{ec.jornada-diaria}}.",
    "A esa hora se le suma el {{ec.recargo-eventual}}.",
    "Lo que cobras es la hora con el incremento multiplicada por las horas trabajadas.",
  ],
  ejemplo: ["Con el salario básico de {{ec.sbu}}, tu hora sube de $2,01 a $2,71. Un mes completo da $650,70."],
  faq: [
    {
      pregunta: "¿Qué es un contrato eventual?",
      respuesta: "El que se firma para cubrir una necesidad puntual del empleador: reemplazar a alguien de vacaciones o con licencia, o atender más demanda. En este último caso dura hasta 180 días en un año.",
    },
    {
      pregunta: "¿Y un contrato ocasional?",
      respuesta: "Es para una necesidad que no tiene que ver con la actividad habitual del empleador. Dura hasta 30 días en un año y paga el mismo incremento.",
    },
    {
      pregunta: "¿Tengo derecho a IESS y décimos?",
      respuesta: "Sí. Te tienen que afiliar desde el primer día y pagarte los décimos y las vacaciones de forma proporcional.",
    },
  ],
  glosario: [
    { termino: "Salario básico sectorial", definicion: "El mínimo de una rama de actividad. Nunca es menor al salario básico unificado." },
    { termino: "Contrato de temporada", definicion: "Un contrato eventual que se repite por más de dos temporadas. Tiene estabilidad." },
  ],
});
