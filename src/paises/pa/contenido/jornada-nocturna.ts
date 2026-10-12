import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.jornada-nocturna",
  h1: "Calculadora de jornada nocturna y mixta en Panamá",
  title: "Jornada nocturna en Panamá: cuánto se paga cada hora",
  description:
    "En Panamá, {{pa.jornada-diaria[nocturna]}} de noche y {{pa.jornada-diaria[mixta]}} de jornada mixta se pagan como {{pa.jornada-diaria[diurna]}} de día. Calcula tu pago por jornada y por semana.",
  intro: [
    "Si trabajas de noche, tu jornada es más corta pero se paga igual que una de día. La ley dice que {{pa.jornada-diaria[nocturna]}} nocturnas y {{pa.jornada-diaria[mixta]}} de jornada mixta valen como {{pa.jornada-diaria[diurna]}} diurnas.",
    "Escribe tu tarifa por hora de día y te mostramos cuánto cobras por jornada, cuánto vale cada hora que trabajas y el total de la semana.",
  ],
  comoSeCalcula: [
    "Pago por jornada: tarifa por hora de día por {{pa.jornada-diaria[diurna]}}.",
    "Valor de cada hora trabajada: el pago de la jornada dividido entre las horas de tu jornada.",
    "Pago semanal: el pago de la jornada por las jornadas de la semana (seis como máximo).",
  ],
  ejemplo: [
    "Con una tarifa de B/. 3.02 por hora en jornada nocturna: la jornada vale 3.02 × 8 = B/. 24.16. Cada una de tus 7 horas vale B/. 3.45. Seis noches: B/. 144.96.",
  ],
  faq: [
    {
      pregunta: "¿Qué es la jornada nocturna en Panamá?",
      respuesta: "La que tiene más de tres horas entre las 6 p. m. y las 6 a. m. Dura como máximo {{pa.jornada-diaria[nocturna]}} por día y {{pa.jornada-semanal[nocturna]}} por semana.",
    },
    {
      pregunta: "¿Qué es la jornada mixta?",
      respuesta: "La que combina horas de día y de noche, con tres horas de noche como máximo. Dura hasta {{pa.jornada-diaria[mixta]}} por día y {{pa.jornada-semanal[mixta]}} por semana.",
    },
    {
      pregunta: "¿La jornada nocturna tiene recargo?",
      respuesta: "No como recargo aparte. La ventaja es que trabajas menos horas por el mismo pago. Si te quedas más tiempo, esas horas son extra y llevan su recargo.",
    },
    {
      pregunta: "¿Esto vale para el salario mínimo?",
      respuesta: "Sí. La ley lo dice para calcular el salario mínimo y los salarios de empresas con turnos en varios horarios.",
    },
  ],
  glosario: [
    { termino: "Período nocturno", definicion: "De 6 p. m. a 6 a. m." },
    { termino: "Turnos rotativos", definicion: "Cuando cambias de horario entre semanas. Te deben pagar un salario uniforme." },
  ],
});
